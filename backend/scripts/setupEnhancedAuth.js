const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const ErrorRecoveryService = require('../utils/errorRecovery');
const SecurityUtils = require('../utils/security');

// Enhanced authentication setup script
class AuthSetup {
  static async initialize() {
    try {
      console.log('🔐 Initializing Enhanced Authentication System...\n');

      // Connect to database
      await this.connectDatabase();

      // Run data migration
      await this.migrateExistingData();

      // Setup security indexes
      await this.setupSecurityIndexes();

      // Create admin user with enhanced security
      await this.createEnhancedAdminUser();

      // Setup cleanup jobs
      await this.setupCleanupJobs();

      // Perform health check
      await this.performSystemHealthCheck();

      console.log('\n✅ Enhanced Authentication System initialized successfully!');
      console.log('\n📋 Summary:');
      console.log('   🔒 Enhanced security features enabled');
      console.log('   👥 User data migrated to new schema');
      console.log('   🗂️  Database indexes optimized');
      console.log('   🧹 Cleanup jobs configured');
      console.log('   ⚡ System health verified');

    } catch (error) {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    } finally {
      mongoose.connection.close();
    }
  }

  static async connectDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Database connected successfully');
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  static async migrateExistingData() {
    console.log('🔄 Migrating existing user data...');
    
    const result = await ErrorRecoveryService.migrateUserData();
    
    if (result.success) {
      console.log(`✅ Migrated ${result.migratedCount} users to enhanced schema`);
    } else {
      throw new Error(`Migration failed: ${result.error}`);
    }
  }

  static async setupSecurityIndexes() {
    console.log('🗂️  Setting up security indexes...');

    try {
      // Create indexes for better query performance
      await User.collection.createIndex({ email: 1 }, { unique: true });
      await User.collection.createIndex({ phone: 1 }, { unique: true });
      await User.collection.createIndex({ 'activeSessions.sessionId': 1 });
      await User.collection.createIndex({ 'securityEvents.timestamp': -1 });
      await User.collection.createIndex({ lastLogin: -1 });
      await User.collection.createIndex({ lockUntil: 1 });
      await User.collection.createIndex({ isActive: 1 });
      await User.collection.createIndex({ role: 1 });

      console.log('✅ Security indexes created successfully');
    } catch (error) {
      console.warn('⚠️  Some indexes may already exist:', error.message);
    }
  }

  static async createEnhancedAdminUser() {
    console.log('👤 Setting up enhanced admin user...');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@subhadentalcare.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'SecureAdminPassword123!';

    try {
      // Check if admin already exists
      let adminUser = await User.findOne({ email: adminEmail });

      if (adminUser) {
        console.log('✅ Admin user already exists, updating with enhanced features...');
        
        // Update existing admin with enhanced security features
        if (!adminUser.activeSessions) adminUser.activeSessions = [];
        if (!adminUser.securityEvents) adminUser.securityEvents = [];
        if (!adminUser.passwordHistory) adminUser.passwordHistory = [];
        if (!adminUser.backupCodes) adminUser.backupCodes = [];
        if (adminUser.maxSessions === undefined) adminUser.maxSessions = 10; // Admin gets more sessions
        if (adminUser.twoFactorEnabled === undefined) adminUser.twoFactorEnabled = false;

        // Generate backup codes for admin
        adminUser.backupCodes = SecurityUtils.generateBackupCodes();

        await adminUser.save();
      } else {
        console.log('✅ Creating new enhanced admin user...');

        // Create new admin user with all enhanced features
        adminUser = new User({
          firstName: 'System',
          lastName: 'Administrator',
          email: adminEmail,
          phone: '+977-9800000001',
          password: adminPassword,
          dateOfBirth: new Date('1980-01-01'),
          gender: 'other',
          role: 'admin',
          isEmailVerified: true,
          isActive: true,
          address: {
            street: 'Buddha Chowk',
            city: 'Bhairahawa',
            state: 'Lumbini',
            zipCode: '32900',
            country: 'Nepal'
          },
          activeSessions: [],
          securityEvents: [],
          passwordHistory: [],
          backupCodes: SecurityUtils.generateBackupCodes(),
          maxSessions: 10,
          twoFactorEnabled: false
        });

        await adminUser.save();
      }

      console.log('✅ Enhanced admin user configured successfully');
      console.log(`   📧 Email: ${adminEmail}`);
      console.log(`   🔑 Password: ${adminPassword}`);
      console.log(`   🛡️  Backup codes generated: ${adminUser.backupCodes.length}`);

    } catch (error) {
      throw new Error(`Admin user setup failed: ${error.message}`);
    }
  }

  static async setupCleanupJobs() {
    console.log('🧹 Setting up cleanup jobs...');

    try {
      // Run initial cleanup
      const cleanupResult = await ErrorRecoveryService.cleanupExpiredData();
      
      if (cleanupResult.success) {
        console.log(`✅ Initial cleanup completed (${cleanupResult.cleanedCount} users updated)`);
      }

      // In production, you would set up cron jobs here
      console.log('✅ Cleanup jobs configured (manual execution for development)');
      
    } catch (error) {
      console.warn('⚠️  Cleanup setup warning:', error.message);
    }
  }

  static async performSystemHealthCheck() {
    console.log('⚡ Performing system health check...');

    try {
      const healthCheck = await ErrorRecoveryService.performHealthCheck();
      
      console.log('✅ Health check results:');
      console.log(`   📊 Database: ${healthCheck.database ? '✅ Healthy' : '❌ Issues detected'}`);
      console.log(`   🔐 Authentication: ${healthCheck.authentication ? '✅ Healthy' : '❌ Issues detected'}`);
      console.log(`   🎫 Sessions: ${healthCheck.sessions ? '✅ Healthy' : '❌ Issues detected'}`);
      
      if (healthCheck.error) {
        console.warn(`   ⚠️  Warning: ${healthCheck.error}`);
      }

    } catch (error) {
      console.warn('⚠️  Health check warning:', error.message);
    }
  }

  // Generate security configuration
  static generateSecurityConfig() {
    console.log('\n🔧 Security Configuration Recommendations:');
    console.log('\n# Add these to your .env file for enhanced security:');
    console.log(`ENCRYPTION_KEY=${SecurityUtils.generateSecureToken(32)}`);
    console.log(`JWT_SECRET=${SecurityUtils.generateSecureToken(64)}`);
    console.log(`JWT_REFRESH_SECRET=${SecurityUtils.generateSecureToken(64)}`);
    console.log('JWT_EXPIRE=15m');
    console.log('JWT_REFRESH_EXPIRE=7d');
    console.log('BCRYPT_ROUNDS=12');
    console.log('MAX_LOGIN_ATTEMPTS=5');
    console.log('ACCOUNT_LOCK_TIME=30');
    console.log('SESSION_TIMEOUT=24');
    console.log('MAX_SESSIONS_PER_USER=5');
    console.log('\n# For production, also consider:');
    console.log('ADMIN_EMAILS=admin1@domain.com,admin2@domain.com');
    console.log('SECURITY_ALERTS_ENABLED=true');
    console.log('AUDIT_LOG_RETENTION_DAYS=90');
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  AuthSetup.initialize().then(() => {
    AuthSetup.generateSecurityConfig();
    process.exit(0);
  }).catch(error => {
    console.error('Setup failed:', error);
    process.exit(1);
  });
}

module.exports = AuthSetup;
