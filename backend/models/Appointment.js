const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // Patient Information
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient is required']
  },
  
  // Appointment Details
  service: {
    type: String,
    required: [true, 'Service is required'],
    enum: [
      'Dental Checkup',
      'Dental X-ray (RVG)',
      'Scaling & Polishing',
      'Dental Restoration',
      'Dental Extraction',
      'Crown & Bridge',
      'Removable Denture',
      'Orthodontic Treatment',
      'Dental Implant',
      'Emergency Care',
      'Consultation',
      'Other'
    ]
  },
  
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Appointment date must be in the future'
    }
  },
  
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required'],
    enum: [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]
  },
  
  duration: {
    type: Number,
    default: 30, // minutes
    min: [15, 'Minimum duration is 15 minutes'],
    max: [180, 'Maximum duration is 3 hours']
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'emergency'],
    default: 'normal'
  },
  
  // Additional Information
  reason: {
    type: String,
    required: [true, 'Reason for appointment is required'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  
  symptoms: [{
    type: String,
    maxlength: [100, 'Each symptom cannot exceed 100 characters']
  }],
  
  notes: {
    patient: {
      type: String,
      maxlength: [1000, 'Patient notes cannot exceed 1000 characters']
    },
    staff: {
      type: String,
      maxlength: [1000, 'Staff notes cannot exceed 1000 characters']
    },
    doctor: {
      type: String,
      maxlength: [1000, 'Doctor notes cannot exceed 1000 characters']
    }
  },
  
  // Staff Assignment
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  assignedStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Contact Information
  contactInfo: {
    preferredContact: {
      type: String,
      enum: ['email', 'phone', 'sms'],
      default: 'email'
    },
    alternatePhone: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  
  // Payment Information
  estimatedCost: {
    type: Number,
    min: [0, 'Cost cannot be negative']
  },
  
  actualCost: {
    type: Number,
    min: [0, 'Cost cannot be negative']
  },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded'],
    default: 'pending'
  },
  
  // Reminders and Notifications
  reminders: {
    sent: [{
      type: {
        type: String,
        enum: ['email', 'sms', 'call']
      },
      sentAt: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['sent', 'delivered', 'failed'],
        default: 'sent'
      }
    }],
    preferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      call: { type: Boolean, default: false }
    }
  },
  
  // Follow-up
  followUp: {
    required: {
      type: Boolean,
      default: false
    },
    scheduledDate: Date,
    notes: String,
    completed: {
      type: Boolean,
      default: false
    }
  },
  
  // Cancellation
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    refundAmount: {
      type: Number,
      min: [0, 'Refund amount cannot be negative']
    }
  },
  
  // Metadata
  source: {
    type: String,
    enum: ['website', 'phone', 'walk-in', 'referral', 'emergency'],
    default: 'website'
  },
  
  isFirstVisit: {
    type: Boolean,
    default: false
  },
  
  // Timestamps for different states
  timestamps: {
    scheduled: {
      type: Date,
      default: Date.now
    },
    confirmed: Date,
    started: Date,
    completed: Date,
    cancelled: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
appointmentSchema.index({ patient: 1, appointmentDate: 1 });
appointmentSchema.index({ appointmentDate: 1, timeSlot: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ assignedDoctor: 1, appointmentDate: 1 });
appointmentSchema.index({ createdAt: -1 });

// Virtual for appointment duration in hours
appointmentSchema.virtual('durationHours').get(function() {
  return this.duration / 60;
});

// Virtual for full appointment datetime
appointmentSchema.virtual('appointmentDateTime').get(function() {
  if (!this.appointmentDate || !this.timeSlot) return null;
  
  const [hours, minutes] = this.timeSlot.split(':').map(Number);
  const appointmentDateTime = new Date(this.appointmentDate);
  appointmentDateTime.setHours(hours, minutes, 0, 0);
  
  return appointmentDateTime;
});

// Virtual for appointment end time
appointmentSchema.virtual('appointmentEndTime').get(function() {
  const startTime = this.appointmentDateTime;
  if (!startTime) return null;
  
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + this.duration);
  
  return endTime;
});

// Pre-save middleware to set isFirstVisit
appointmentSchema.pre('save', async function(next) {
  if (this.isNew && this.patient) {
    const existingAppointments = await this.constructor.countDocuments({
      patient: this.patient,
      status: { $in: ['completed', 'confirmed', 'in-progress'] }
    });
    
    this.isFirstVisit = existingAppointments === 0;
  }
  next();
});

// Method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const appointmentTime = this.appointmentDateTime;
  
  if (!appointmentTime) return false;
  
  // Can't cancel if appointment is in the past
  if (appointmentTime <= now) return false;
  
  // Can't cancel if already cancelled or completed
  if (['cancelled', 'completed', 'no-show'].includes(this.status)) return false;
  
  // Can cancel if more than 24 hours before appointment
  const hoursUntilAppointment = (appointmentTime - now) / (1000 * 60 * 60);
  return hoursUntilAppointment >= 24;
};

// Method to check if appointment can be rescheduled
appointmentSchema.methods.canBeRescheduled = function() {
  return this.canBeCancelled() && this.status === 'confirmed';
};

// Static method to find available time slots
appointmentSchema.statics.findAvailableSlots = async function(date, duration = 30) {
  const startOfDay = new Date(date);
  startOfDay.setHours(9, 0, 0, 0); // 9 AM
  
  const endOfDay = new Date(date);
  endOfDay.setHours(18, 0, 0, 0); // 6 PM
  
  // Get all appointments for the date
  const appointments = await this.find({
    appointmentDate: {
      $gte: startOfDay,
      $lt: endOfDay
    },
    status: { $nin: ['cancelled', 'no-show'] }
  }).sort({ timeSlot: 1 });
  
  // Generate all possible time slots
  const allSlots = [];
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      allSlots.push(timeString);
    }
  }
  
  // Filter out booked slots
  const bookedSlots = appointments.map(apt => apt.timeSlot);
  const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
  
  return availableSlots;
};

module.exports = mongoose.model('Appointment', appointmentSchema);
