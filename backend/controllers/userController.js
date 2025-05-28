const User = require('../models/User');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs').promises;

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
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
          medicalHistory: user.medicalHistory,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
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
      phone,
      dateOfBirth,
      gender,
      address,
      preferences,
      medicalHistory
    } = req.body;

    // Check if phone is being changed and if it's already taken
    if (phone && phone !== req.user.phone) {
      const existingUser = await User.findOne({ phone, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Phone number is already registered with another account'
        });
      }
    }

    // Prepare update object
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender) updateData.gender = gender;
    if (address) updateData.address = { ...req.user.address, ...address };
    if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };
    if (medicalHistory) updateData.medicalHistory = { ...req.user.medicalHistory, ...medicalHistory };

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          dateOfBirth: updatedUser.dateOfBirth,
          age: updatedUser.age,
          gender: updatedUser.gender,
          address: updatedUser.address,
          preferences: updatedUser.preferences,
          medicalHistory: updatedUser.medicalHistory,
          updatedAt: updatedUser.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Check if new password is different from current
    const isSamePassword = await user.matchPassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/users/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // Delete old avatar if exists
    if (req.user.avatar) {
      try {
        const oldAvatarPath = path.join(__dirname, '..', req.user.avatar);
        await fs.unlink(oldAvatarPath);
      } catch (error) {
        console.log('Could not delete old avatar:', error.message);
      }
    }

    // Update user with new avatar path
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarPath },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: updatedUser.avatar
      }
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading avatar'
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const { password, reason } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Verify password
    if (password) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Password is incorrect'
        });
      }
    }

    // Check for pending appointments
    const Appointment = require('../models/Appointment');
    const pendingAppointments = await Appointment.countDocuments({
      patient: req.user.id,
      status: { $in: ['pending', 'confirmed'] },
      appointmentDate: { $gte: new Date() }
    });

    if (pendingAppointments > 0) {
      return res.status(400).json({
        success: false,
        message: `You have ${pendingAppointments} pending appointment(s). Please cancel them before deleting your account.`
      });
    }

    // Soft delete - deactivate account instead of hard delete
    user.isActive = false;
    user.email = `deleted_${Date.now()}_${user.email}`;
    user.phone = `deleted_${Date.now()}_${user.phone}`;
    await user.save();

    // Delete avatar if exists
    if (user.avatar) {
      try {
        const avatarPath = path.join(__dirname, '..', user.avatar);
        await fs.unlink(avatarPath);
      } catch (error) {
        console.log('Could not delete avatar:', error.message);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting account'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount
};
