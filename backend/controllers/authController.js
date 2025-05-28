const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');
const SecurityUtils = require('../utils/security');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      address
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'phone';
      return res.status(400).json({
        success: false,
        message: `User with this ${field} already exists`
      });
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(20).toString('hex');
    const emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      address,
      emailVerificationToken,
      emailVerificationExpire
    });

    // Send verification email
    try {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`;

      await sendEmail({
        email: user.email,
        subject: 'Email Verification - Subha Dental Care',
        template: 'emailVerification',
        data: {
          name: user.fullName,
          verificationUrl,
          clinicName: process.env.CLINIC_NAME
        }
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully. Please check your email to verify your account.',
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isEmailVerified: user.isEmailVerified
          }
        }
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);

      // Delete user if email sending fails
      await User.findByIdAndDelete(user._id);

      return res.status(500).json({
        success: false,
        message: 'User registration failed. Please try again.'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `User with this ${field} already exists`
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, twoFactorToken } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Check for user (include password and security fields)
    const user = await User.findOne({ email }).select('+password +twoFactorSecret +backupCodes');

    if (!user) {
      // Log failed attempt even for non-existent users
      console.log(`Failed login attempt for non-existent email: ${email} from IP: ${clientIP}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Log security event
    SecurityUtils.logSecurityEvent(user, 'login_attempt', clientIP, userAgent);

    // Check if account is locked
    if (user.isLocked) {
      SecurityUtils.logSecurityEvent(user, 'failed_login', clientIP, userAgent, 'Account locked');
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts. Please try again later.',
        lockUntil: user.lockUntil
      });
    }

    // Check if account is active
    if (!user.isActive) {
      SecurityUtils.logSecurityEvent(user, 'failed_login', clientIP, userAgent, 'Account inactive');
      return res.status(403).json({
        success: false,
        message: 'Account has been deactivated. Please contact support.'
      });
    }

    // Check for suspicious activity
    const suspiciousActivity = SecurityUtils.detectSuspiciousActivity(user, clientIP, userAgent);
    if (suspiciousActivity.isSuspicious && suspiciousActivity.riskLevel === 'high') {
      SecurityUtils.logSecurityEvent(user, 'suspicious_activity', clientIP, userAgent,
        `High risk login: ${suspiciousActivity.indicators.join(', ')}`);

      // Send security alert email
      try {
        await sendEmail({
          email: user.email,
          subject: 'Security Alert - Suspicious Login Attempt',
          template: 'securityAlert',
          data: {
            name: user.fullName,
            ip: clientIP,
            userAgent,
            timestamp: new Date().toLocaleString(),
            indicators: suspiciousActivity.indicators
          }
        });
      } catch (emailError) {
        console.error('Failed to send security alert email:', emailError);
      }
    }

    // Check password
    const isMatch = await SecurityUtils.verifyPassword(password, user.password);

    if (!isMatch) {
      // Increment login attempts and log failed attempt
      await user.incLoginAttempts();
      SecurityUtils.logSecurityEvent(user, 'failed_login', clientIP, userAgent, 'Invalid password');
      await user.save();

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check 2FA if enabled
    if (user.twoFactorEnabled) {
      if (!twoFactorToken) {
        return res.status(200).json({
          success: false,
          message: 'Two-factor authentication required',
          requiresTwoFactor: true,
          userId: user._id // Temporary identifier for 2FA verification
        });
      }

      // Verify 2FA token
      const is2FAValid = SecurityUtils.verify2FAToken(twoFactorToken, user.twoFactorSecret);

      if (!is2FAValid) {
        // Check if it's a backup code
        const backupCode = user.backupCodes.find(code =>
          code.code === twoFactorToken.toUpperCase() && !code.used
        );

        if (!backupCode) {
          SecurityUtils.logSecurityEvent(user, 'failed_login', clientIP, userAgent, 'Invalid 2FA token');
          await user.save();

          return res.status(401).json({
            success: false,
            message: 'Invalid two-factor authentication code'
          });
        } else {
          // Mark backup code as used
          backupCode.used = true;
        }
      }
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Session management
    const sessionId = SecurityUtils.generateSessionId();
    const deviceInfo = SecurityUtils.parseDeviceInfo(userAgent, clientIP);

    // Clean up expired sessions
    SecurityUtils.cleanupExpiredSessions(user);

    // Check session limit
    if (user.activeSessions.length >= user.maxSessions) {
      // Remove oldest session
      user.activeSessions.sort((a, b) => a.lastActivity - b.lastActivity);
      user.activeSessions.shift();
    }

    // Add new session
    user.activeSessions.push({
      sessionId,
      deviceInfo,
      createdAt: new Date(),
      lastActivity: new Date(),
      isActive: true
    });

    // Update last login and log successful login
    user.lastLogin = new Date();
    SecurityUtils.logSecurityEvent(user, 'login', clientIP, userAgent, 'Successful login');
    await user.save();

    // Generate enhanced tokens
    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
      sessionId
    };

    const { accessToken, refreshToken } = SecurityUtils.generateTokens(tokenPayload);

    // Set secure cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    };

    res.status(200)
      .cookie('token', token, cookieOptions)
      .cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      })
      .json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          refreshToken,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            lastLogin: user.lastLogin
          }
        }
      });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie('token');
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          age: user.age,
          gender: user.gender,
          address: user.address,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          avatar: user.avatar,
          preferences: user.preferences,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user with this token and check if it's not expired
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired email verification token'
      });
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
};

// @desc    Resend email verification
// @route   POST /api/auth/resend-verification
// @access  Public
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(20).toString('hex');
    const emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpire = emailVerificationExpire;
    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`;

    await sendEmail({
      email: user.email,
      subject: 'Email Verification - Subha Dental Care',
      template: 'emailVerification',
      data: {
        name: user.fullName,
        verificationUrl,
        clinicName: process.env.CLINIC_NAME
      }
    });

    res.status(200).json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
// @access  Public
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body || req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const newToken = user.getSignedJwtToken();
    const newRefreshToken = user.getRefreshToken();

    res.status(200).json({
      success: true,
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  resendVerification,
  refreshToken
};
