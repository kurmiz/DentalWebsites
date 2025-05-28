const express = require('express');
const { getServices, getService } = require('../controllers/serviceController');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes (with optional authentication for personalized content)
router.get('/', optionalAuth, getServices);
router.get('/:id', optionalAuth, getService);

module.exports = router;
