const express = require('express');
const { body } = require('express-validator');
const { submitContactForm } = require('../controllers/contactController');
const { optionalAuth, sensitiveOperationLimit } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Message must be between 20 and 2000 characters'),
  
  body('type')
    .optional()
    .isIn(['general', 'appointment', 'complaint', 'feedback', 'emergency'])
    .withMessage('Invalid contact type')
];

// Contact form submission
router.post('/',
  optionalAuth, // Optional auth to identify returning users
  sensitiveOperationLimit(3, 60 * 60 * 1000), // 3 submissions per hour
  contactValidation,
  submitContactForm
);

module.exports = router;
