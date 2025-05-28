const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Email verified users only)
const createAppointment = async (req, res) => {
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
      service,
      appointmentDate,
      timeSlot,
      reason,
      symptoms,
      priority,
      notes,
      contactInfo
    } = req.body;

    // Check if time slot is available
    const existingAppointment = await Appointment.findOne({
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: { $nin: ['cancelled', 'no-show'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked. Please choose another time.'
      });
    }

    // Check if user has too many pending appointments
    const pendingAppointments = await Appointment.countDocuments({
      patient: req.user._id,
      status: 'pending'
    });

    if (pendingAppointments >= 3) {
      return res.status(400).json({
        success: false,
        message: 'You have too many pending appointments. Please wait for confirmation or cancel existing appointments.'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: req.user._id,
      service,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      reason,
      symptoms: symptoms || [],
      priority: priority || 'normal',
      notes: {
        patient: notes?.patient || ''
      },
      contactInfo: {
        preferredContact: contactInfo?.preferredContact || 'email',
        alternatePhone: contactInfo?.alternatePhone
      }
    });

    // Populate patient information
    await appointment.populate('patient', 'firstName lastName email phone');

    // Send confirmation email
    try {
      const appointmentDateTime = new Date(appointmentDate);
      const formattedDate = appointmentDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      await sendEmail({
        email: req.user.email,
        template: 'appointmentConfirmation',
        data: {
          patientName: req.user.fullName,
          service,
          appointmentDate: formattedDate,
          appointmentTime: timeSlot,
          duration: appointment.duration,
          appointmentId: appointment._id
        }
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the appointment creation if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        appointment: {
          id: appointment._id,
          service: appointment.service,
          appointmentDate: appointment.appointmentDate,
          timeSlot: appointment.timeSlot,
          status: appointment.status,
          reason: appointment.reason,
          priority: appointment.priority,
          patient: appointment.patient,
          createdAt: appointment.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating appointment'
    });
  }
};

// @desc    Get available time slots
// @route   GET /api/appointments/available-slots
// @access  Private
const getAvailableSlots = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { date, duration = 30 } = req.query;
    const requestedDate = new Date(date);

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (requestedDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot check availability for past dates'
      });
    }

    // Check if date is a weekend (assuming clinic is closed on weekends)
    const dayOfWeek = requestedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(200).json({
        success: true,
        message: 'Clinic is closed on weekends',
        data: {
          date: requestedDate,
          availableSlots: [],
          isWeekend: true
        }
      });
    }

    const availableSlots = await Appointment.findAvailableSlots(requestedDate, parseInt(duration));

    res.status(200).json({
      success: true,
      data: {
        date: requestedDate,
        availableSlots,
        totalSlots: availableSlots.length
      }
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching available slots'
    });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
const getMyAppointments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate
    } = req.query;

    const query = { patient: req.user._id };

    // Add filters
    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.appointmentDate = {};
      if (startDate) {
        query.appointmentDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.appointmentDate.$lte = new Date(endDate);
      }
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { appointmentDate: -1 },
      populate: {
        path: 'assignedDoctor',
        select: 'firstName lastName'
      }
    };

    const appointments = await Appointment.paginate(query, options);

    res.status(200).json({
      success: true,
      data: {
        appointments: appointments.docs,
        pagination: {
          currentPage: appointments.page,
          totalPages: appointments.totalPages,
          totalAppointments: appointments.totalDocs,
          hasNextPage: appointments.hasNextPage,
          hasPrevPage: appointments.hasPrevPage
        }
      }
    });
  } catch (error) {
    console.error('Get my appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointments'
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'firstName lastName email phone')
      .populate('assignedDoctor', 'firstName lastName')
      .populate('assignedStaff', 'firstName lastName');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user owns this appointment or is admin/staff
    if (
      appointment.patient._id.toString() !== req.user._id.toString() &&
      !['admin', 'dentist', 'staff'].includes(req.user.role)
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this appointment'
      });
    }

    res.status(200).json({
      success: true,
      data: { appointment }
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointment'
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check permissions
    const isOwner = appointment.patient.toString() === req.user._id.toString();
    const isStaff = ['admin', 'dentist', 'staff'].includes(req.user.role);

    if (!isOwner && !isStaff) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    // Patients can only update certain fields and only if appointment is pending
    if (isOwner && !isStaff) {
      if (appointment.status !== 'pending') {
        return res.status(400).json({
          success: false,
          message: 'Can only modify pending appointments'
        });
      }

      // Restrict fields patients can update
      const allowedFields = ['appointmentDate', 'timeSlot', 'reason', 'symptoms', 'notes.patient'];
      const updateFields = Object.keys(req.body);
      const isValidUpdate = updateFields.every(field => allowedFields.includes(field));

      if (!isValidUpdate) {
        return res.status(400).json({
          success: false,
          message: 'Invalid update fields'
        });
      }
    }

    // If updating date/time, check availability
    if (req.body.appointmentDate || req.body.timeSlot) {
      const newDate = req.body.appointmentDate ? new Date(req.body.appointmentDate) : appointment.appointmentDate;
      const newTimeSlot = req.body.timeSlot || appointment.timeSlot;

      const conflictingAppointment = await Appointment.findOne({
        _id: { $ne: appointment._id },
        appointmentDate: newDate,
        timeSlot: newTimeSlot,
        status: { $nin: ['cancelled', 'no-show'] }
      });

      if (conflictingAppointment) {
        return res.status(400).json({
          success: false,
          message: 'This time slot is already booked'
        });
      }
    }

    // Update appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('patient', 'firstName lastName email phone');

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: { appointment: updatedAppointment }
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating appointment'
    });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check permissions
    const isOwner = appointment.patient.toString() === req.user._id.toString();
    const isStaff = ['admin', 'dentist', 'staff'].includes(req.user.role);

    if (!isOwner && !isStaff) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment'
      });
    }

    // Check if appointment can be cancelled
    if (!appointment.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'This appointment cannot be cancelled. Please contact the clinic for assistance.'
      });
    }

    // Update appointment status
    appointment.status = 'cancelled';
    appointment.cancellation = {
      cancelledAt: new Date(),
      cancelledBy: req.user._id,
      reason: req.body.reason || 'Cancelled by patient'
    };

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling appointment'
    });
  }
};

// @desc    Get all appointments (Admin/Staff only)
// @route   GET /api/appointments
// @access  Private (Admin/Staff)
const getAppointments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      service,
      startDate,
      endDate,
      patient
    } = req.query;

    const query = {};

    // Add filters
    if (status) query.status = status;
    if (service) query.service = service;
    if (patient) query.patient = patient;

    if (startDate || endDate) {
      query.appointmentDate = {};
      if (startDate) query.appointmentDate.$gte = new Date(startDate);
      if (endDate) query.appointmentDate.$lte = new Date(endDate);
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { appointmentDate: 1 },
      populate: [
        { path: 'patient', select: 'firstName lastName email phone' },
        { path: 'assignedDoctor', select: 'firstName lastName' }
      ]
    };

    const appointments = await Appointment.paginate(query, options);

    res.status(200).json({
      success: true,
      data: {
        appointments: appointments.docs,
        pagination: {
          currentPage: appointments.page,
          totalPages: appointments.totalPages,
          totalAppointments: appointments.totalDocs,
          hasNextPage: appointments.hasNextPage,
          hasPrevPage: appointments.hasPrevPage
        }
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching appointments'
    });
  }
};

module.exports = {
  createAppointment,
  getAvailableSlots,
  getMyAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  getAppointments
};
