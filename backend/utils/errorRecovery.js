const User = require('../models/User');
const sendEmail = require('./sendEmail');

class ErrorRecoveryService {
  // Database connection recovery
  static async handleDatabaseError(error, operation, retryCount = 0) {
    const maxRetries = 3;
    const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff

    console.error(`Database error during ${operation}:`, error);

    if (retryCount < maxRetries) {
      console.log(`Retrying ${operation} in ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`);
      
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      
      try {
        // Attempt to reconnect if connection is lost
        if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
          const mongoose = require('mongoose');
          if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI);
          }
        }
        
        return { success: true, retry: true };
      } catch (retryError) {
        return this.handleDatabaseError(retryError, operation, retryCount + 1);
      }
    }

    // If all retries failed, log critical error and notify administrators
    await this.notifyAdministrators('Database Error', {
      operation,
      error: error.message,
      stack: error.stack,
      retryCount,
      timestamp: new Date().toISOString()
    });

    return { 
      success: false, 
      error: 'Database operation failed after multiple retries',
      shouldFallback: true 
    };
  }

  // Authentication error recovery
  static async handleAuthError(error, userId, operation) {
    console.error(`Authentication error for user ${userId} during ${operation}:`, error);

    try {
      const user = await User.findById(userId);
      if (!user) return;

      // Log security event
      user.securityEvents.push({
        type: 'authentication_error',
        timestamp: new Date(),
        details: `${operation}: ${error.message}`
      });

      // Check if this is a pattern of errors
      const recentErrors = user.securityEvents
        .filter(event => 
          event.type === 'authentication_error' && 
          event.timestamp > new Date(Date.now() - 60 * 60 * 1000) // Last hour
        );

      if (recentErrors.length > 5) {
        // Temporarily lock account for security
        user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        
        // Send security alert
        await sendEmail({
          email: user.email,
          subject: 'Security Alert - Account Temporarily Locked',
          template: 'securityLock',
          data: {
            name: user.fullName,
            lockDuration: '30 minutes',
            reason: 'Multiple authentication errors detected'
          }
        });
      }

      await user.save();
    } catch (saveError) {
      console.error('Failed to log authentication error:', saveError);
    }
  }

  // Session recovery
  static async recoverUserSession(userId, sessionId) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      // Find and validate session
      const session = user.activeSessions.find(s => s.sessionId === sessionId);
      if (!session || !session.isActive) {
        return null;
      }

      // Check if session is expired
      const sessionAge = Date.now() - session.lastActivity;
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours

      if (sessionAge > maxSessionAge) {
        session.isActive = false;
        await user.save();
        return null;
      }

      // Update session activity
      session.lastActivity = new Date();
      await user.save();

      return {
        user: user.toObject(),
        session: session.toObject()
      };
    } catch (error) {
      console.error('Session recovery error:', error);
      return null;
    }
  }

  // Data migration and cleanup
  static async migrateUserData() {
    try {
      console.log('Starting user data migration...');

      // Find users without security fields
      const usersToMigrate = await User.find({
        $or: [
          { activeSessions: { $exists: false } },
          { securityEvents: { $exists: false } },
          { passwordHistory: { $exists: false } }
        ]
      });

      console.log(`Found ${usersToMigrate.length} users to migrate`);

      for (const user of usersToMigrate) {
        // Initialize missing security fields
        if (!user.activeSessions) user.activeSessions = [];
        if (!user.securityEvents) user.securityEvents = [];
        if (!user.passwordHistory) user.passwordHistory = [];
        if (!user.backupCodes) user.backupCodes = [];
        if (user.maxSessions === undefined) user.maxSessions = 5;
        if (user.twoFactorEnabled === undefined) user.twoFactorEnabled = false;

        await user.save();
      }

      console.log('User data migration completed successfully');
      return { success: true, migratedCount: usersToMigrate.length };
    } catch (error) {
      console.error('Migration error:', error);
      return { success: false, error: error.message };
    }
  }

  // Cleanup expired data
  static async cleanupExpiredData() {
    try {
      console.log('Starting expired data cleanup...');

      const users = await User.find({});
      let cleanedCount = 0;

      for (const user of users) {
        let hasChanges = false;

        // Clean expired sessions
        const activeSessions = user.activeSessions.filter(session => {
          const sessionAge = Date.now() - session.lastActivity;
          return sessionAge < 24 * 60 * 60 * 1000 && session.isActive; // 24 hours
        });

        if (activeSessions.length !== user.activeSessions.length) {
          user.activeSessions = activeSessions;
          hasChanges = true;
        }

        // Clean old security events (keep last 100)
        if (user.securityEvents.length > 100) {
          user.securityEvents = user.securityEvents.slice(-100);
          hasChanges = true;
        }

        // Clean old password history (keep last 5)
        if (user.passwordHistory.length > 5) {
          user.passwordHistory = user.passwordHistory.slice(-5);
          hasChanges = true;
        }

        // Remove expired account locks
        if (user.lockUntil && user.lockUntil < new Date()) {
          user.lockUntil = undefined;
          user.loginAttempts = 0;
          hasChanges = true;
        }

        if (hasChanges) {
          await user.save();
          cleanedCount++;
        }
      }

      console.log(`Cleanup completed. ${cleanedCount} users updated.`);
      return { success: true, cleanedCount };
    } catch (error) {
      console.error('Cleanup error:', error);
      return { success: false, error: error.message };
    }
  }

  // Backup critical user data
  static async backupUserData(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return null;

      const backup = {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        backupTimestamp: new Date(),
        securityEvents: user.securityEvents.slice(-10), // Last 10 events
        activeSessions: user.activeSessions.filter(s => s.isActive)
      };

      // Store backup (in production, this would go to a secure backup service)
      console.log('User backup created:', backup);
      
      return backup;
    } catch (error) {
      console.error('Backup error:', error);
      return null;
    }
  }

  // Notify administrators of critical errors
  static async notifyAdministrators(subject, errorDetails) {
    try {
      const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [process.env.ADMIN_EMAIL];
      
      const emailContent = `
        <h2>Critical System Error</h2>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Timestamp:</strong> ${errorDetails.timestamp}</p>
        <p><strong>Details:</strong></p>
        <pre>${JSON.stringify(errorDetails, null, 2)}</pre>
      `;

      for (const email of adminEmails) {
        if (email) {
          await sendEmail({
            email: email.trim(),
            subject: `[CRITICAL] ${subject} - Subha Dental Care`,
            html: emailContent
          });
        }
      }
    } catch (error) {
      console.error('Failed to notify administrators:', error);
    }
  }

  // Health check for authentication system
  static async performHealthCheck() {
    const results = {
      database: false,
      authentication: false,
      sessions: false,
      timestamp: new Date().toISOString()
    };

    try {
      // Test database connection
      const testUser = await User.findOne().limit(1);
      results.database = true;

      // Test authentication functions
      const SecurityUtils = require('./security');
      const testToken = SecurityUtils.generateSecureToken();
      results.authentication = testToken && testToken.length > 0;

      // Test session management
      if (testUser) {
        const sessionId = SecurityUtils.generateSessionId();
        results.sessions = sessionId && sessionId.length > 0;
      }

    } catch (error) {
      console.error('Health check error:', error);
      results.error = error.message;
    }

    return results;
  }
}

module.exports = ErrorRecoveryService;
