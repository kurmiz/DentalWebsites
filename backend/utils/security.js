const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const UAParser = require('ua-parser-js');

// Encryption utilities
class SecurityUtils {
  // Generate secure random tokens
  static generateSecureToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Generate session ID
  static generateSessionId() {
    return crypto.randomUUID();
  }

  // Encrypt sensitive data
  static encrypt(text) {
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipher(algorithm, key);
    cipher.setAAD(Buffer.from('additional-data'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  // Decrypt sensitive data
  static decrypt(encryptedData) {
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);
    
    const decipher = crypto.createDecipher(algorithm, key);
    decipher.setAAD(Buffer.from('additional-data'));
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  // Hash passwords with salt
  static async hashPassword(password) {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT tokens with enhanced security
  static generateTokens(payload) {
    const accessToken = jwt.sign(
      {
        ...payload,
        type: 'access',
        iat: Math.floor(Date.now() / 1000),
        jti: this.generateSecureToken(16) // JWT ID for token tracking
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.JWT_EXPIRE || '15m',
        issuer: 'subha-dental-care',
        audience: 'dental-app'
      }
    );

    const refreshToken = jwt.sign(
      {
        id: payload.id,
        type: 'refresh',
        iat: Math.floor(Date.now() / 1000),
        jti: this.generateSecureToken(16)
      },
      process.env.JWT_REFRESH_SECRET,
      { 
        expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
        issuer: 'subha-dental-care',
        audience: 'dental-app'
      }
    );

    return { accessToken, refreshToken };
  }

  // Verify JWT token with enhanced validation
  static verifyToken(token, secret) {
    try {
      return jwt.verify(token, secret, {
        issuer: 'subha-dental-care',
        audience: 'dental-app'
      });
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }

  // Generate 2FA secret
  static generate2FASecret(userEmail) {
    return speakeasy.generateSecret({
      name: `Subha Dental Care (${userEmail})`,
      issuer: 'Subha Dental Care',
      length: 32
    });
  }

  // Verify 2FA token
  static verify2FAToken(token, secret) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2 // Allow 2 time steps of variance
    });
  }

  // Generate backup codes
  static generateBackupCodes(count = 10) {
    const codes = [];
    for (let i = 0; i < count; i++) {
      codes.push({
        code: this.generateSecureToken(8).toUpperCase(),
        used: false,
        createdAt: new Date()
      });
    }
    return codes;
  }

  // Parse device information
  static parseDeviceInfo(userAgent, ip) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    
    return {
      userAgent,
      ip,
      browser: `${result.browser.name} ${result.browser.version}`,
      os: `${result.os.name} ${result.os.version}`,
      device: result.device.type || 'desktop',
      deviceModel: result.device.model || 'unknown'
    };
  }

  // Check for suspicious activity
  static detectSuspiciousActivity(user, currentIP, currentUserAgent) {
    const recentLogins = user.securityEvents
      .filter(event => event.type === 'login')
      .slice(-10); // Last 10 logins

    const suspiciousIndicators = [];

    // Check for multiple IPs
    const uniqueIPs = [...new Set(recentLogins.map(login => login.ip))];
    if (uniqueIPs.length > 3) {
      suspiciousIndicators.push('Multiple IP addresses detected');
    }

    // Check for unusual location (simplified)
    const lastKnownIP = recentLogins[recentLogins.length - 1]?.ip;
    if (lastKnownIP && lastKnownIP !== currentIP) {
      suspiciousIndicators.push('Login from new IP address');
    }

    // Check for rapid login attempts
    const recentAttempts = user.securityEvents
      .filter(event => 
        event.type === 'failed_login' && 
        event.timestamp > new Date(Date.now() - 60 * 60 * 1000) // Last hour
      );
    
    if (recentAttempts.length > 5) {
      suspiciousIndicators.push('Multiple failed login attempts');
    }

    return {
      isSuspicious: suspiciousIndicators.length > 0,
      indicators: suspiciousIndicators,
      riskLevel: suspiciousIndicators.length > 2 ? 'high' : 
                 suspiciousIndicators.length > 0 ? 'medium' : 'low'
    };
  }

  // Sanitize user input
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }

  // Generate CSRF token
  static generateCSRFToken() {
    return this.generateSecureToken(32);
  }

  // Validate password strength
  static validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoCommonPatterns = !/^(password|123456|qwerty|admin)/i.test(password);

    const score = [
      password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      hasNoCommonPatterns
    ].filter(Boolean).length;

    return {
      isValid: score >= 5,
      score,
      requirements: {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar,
        hasNoCommonPatterns
      },
      strength: score >= 5 ? 'strong' : score >= 3 ? 'medium' : 'weak'
    };
  }

  // Rate limiting key generator
  static generateRateLimitKey(ip, userId = null, action = 'general') {
    return `rate_limit:${action}:${ip}:${userId || 'anonymous'}`;
  }

  // Session cleanup
  static cleanupExpiredSessions(user) {
    const now = new Date();
    const sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
    
    user.activeSessions = user.activeSessions.filter(session => {
      const sessionAge = now - session.lastActivity;
      return sessionAge < sessionTimeout && session.isActive;
    });
    
    return user;
  }

  // Log security event
  static logSecurityEvent(user, type, ip, userAgent, details = '') {
    const event = {
      type,
      timestamp: new Date(),
      ip,
      userAgent,
      details
    };

    user.securityEvents.push(event);
    
    // Keep only last 100 events
    if (user.securityEvents.length > 100) {
      user.securityEvents = user.securityEvents.slice(-100);
    }

    return user;
  }
}

module.exports = SecurityUtils;
