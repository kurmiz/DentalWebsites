const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: {
      auth: [
        'POST /api/auth/register',
        'POST /api/auth/login',
        'POST /api/auth/logout',
        'GET /api/auth/me',
        'GET /api/auth/verify-email/:token',
        'POST /api/auth/resend-verification',
        'POST /api/auth/refresh-token'
      ],
      appointments: [
        'GET /api/appointments/available-slots',
        'POST /api/appointments',
        'GET /api/appointments/my-appointments',
        'GET /api/appointments/:id',
        'PUT /api/appointments/:id',
        'DELETE /api/appointments/:id'
      ],
      users: [
        'GET /api/users/profile',
        'PUT /api/users/profile',
        'PUT /api/users/change-password',
        'DELETE /api/users/account'
      ],
      services: [
        'GET /api/services'
      ],
      contact: [
        'POST /api/contact'
      ],
      health: [
        'GET /api/health'
      ]
    }
  });
  next(error);
};

module.exports = notFound;
