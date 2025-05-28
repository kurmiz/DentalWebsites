const express = require('express');
const { body, param, query } = require('express-validator');
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  getAvailableSlots,
  getMyAppointments
} = require('../controllers/appointmentController');
const { 
  protect, 
  authorize, 
  canBookAppointments,
  ownerOrAdmin,
  sensitiveOperationLimit 
} = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createAppointmentValidation = [
  body('service')
    .isIn([
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
    ])
    .withMessage('Please select a valid service'),
  
  body('appointmentDate')
    .isISO8601()
    .withMessage('Please provide a valid appointment date')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (appointmentDate < today) {
        throw new Error('Appointment date cannot be in the past');
      }
      
      // Check if appointment is within next 6 months
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      
      if (appointmentDate > sixMonthsFromNow) {
        throw new Error('Appointment date cannot be more than 6 months in advance');
      }
      
      return true;
    }),
  
  body('timeSlot')
    .isIn([
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ])
    .withMessage('Please select a valid time slot'),
  
  body('reason')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Reason must be between 10 and 500 characters'),
  
  body('symptoms')
    .optional()
    .isArray()
    .withMessage('Symptoms must be an array'),
  
  body('symptoms.*')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Each symptom cannot exceed 100 characters'),
  
  body('priority')
    .optional()
    .isIn(['low', 'normal', 'high', 'emergency'])
    .withMessage('Priority must be low, normal, high, or emergency'),
  
  body('notes.patient')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Patient notes cannot exceed 1000 characters'),
  
  body('contactInfo.preferredContact')
    .optional()
    .isIn(['email', 'phone', 'sms'])
    .withMessage('Preferred contact must be email, phone, or sms'),
  
  body('contactInfo.alternatePhone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid alternate phone number')
];

const updateAppointmentValidation = [
  body('appointmentDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid appointment date')
    .custom((value) => {
      if (value) {
        const appointmentDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (appointmentDate < today) {
          throw new Error('Appointment date cannot be in the past');
        }
      }
      return true;
    }),
  
  body('timeSlot')
    .optional()
    .isIn([
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ])
    .withMessage('Please select a valid time slot'),
  
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status'),
  
  body('notes.staff')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Staff notes cannot exceed 1000 characters'),
  
  body('notes.doctor')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Doctor notes cannot exceed 1000 characters')
];

const getAppointmentsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'])
    .withMessage('Invalid status filter'),
  
  query('service')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Service filter cannot be empty'),
  
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
];

// Public routes (require authentication but not email verification)
router.get('/available-slots', 
  protect,
  query('date').isISO8601().withMessage('Please provide a valid date'),
  query('duration').optional().isInt({ min: 15, max: 180 }).withMessage('Duration must be between 15 and 180 minutes'),
  getAvailableSlots
);

// Protected routes (require email verification for booking)
router.post('/', 
  protect,
  canBookAppointments,
  sensitiveOperationLimit(5, 60 * 60 * 1000), // 5 bookings per hour
  createAppointmentValidation,
  createAppointment
);

router.get('/my-appointments',
  protect,
  getAppointmentsValidation,
  getMyAppointments
);

router.get('/:id',
  protect,
  param('id').isMongoId().withMessage('Invalid appointment ID'),
  getAppointment
);

router.put('/:id',
  protect,
  param('id').isMongoId().withMessage('Invalid appointment ID'),
  updateAppointmentValidation,
  updateAppointment
);

router.delete('/:id',
  protect,
  param('id').isMongoId().withMessage('Invalid appointment ID'),
  sensitiveOperationLimit(3, 60 * 60 * 1000), // 3 cancellations per hour
  cancelAppointment
);

// Admin/Staff routes
router.get('/',
  protect,
  authorize('admin', 'dentist', 'staff'),
  getAppointmentsValidation,
  getAppointments
);

module.exports = router;
