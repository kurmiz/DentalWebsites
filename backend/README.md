# Subha Dental Care Backend API

A comprehensive backend API for the Subha Dental Care website with authentication, appointment booking, and user management functionality.

## 🚀 Features

### Authentication & Security
- ✅ User registration with email verification
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Account lockout after failed attempts
- ✅ Rate limiting for sensitive operations
- ✅ Role-based access control (Admin, Dentist, Staff, Patient)

### Appointment Management
- ✅ Book appointments (email verified users only)
- ✅ View available time slots
- ✅ Appointment status management
- ✅ Email notifications and reminders
- ✅ Cancellation and rescheduling

### User Management
- ✅ Profile management
- ✅ Avatar upload
- ✅ Password change
- ✅ Account deletion (soft delete)
- ✅ Medical history tracking

### Additional Features
- ✅ Contact form with email notifications
- ✅ Service information API
- ✅ File upload handling
- ✅ Comprehensive error handling
- ✅ API documentation

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **File Upload**: Multer
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Email service (Gmail, SendGrid, etc.)

## ⚡ Quick Start

### 1. Clone and Install

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

### 3. Configure Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/subha_dental_care

# JWT Secrets
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Admin Credentials
ADMIN_EMAIL=admin@subhadentalcare.com
ADMIN_PASSWORD=SecureAdminPassword123!
```

### 4. Database Setup

```bash
# Seed the database with sample data
npm run seed
```

### 5. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/logout` | User logout | Private |
| GET | `/api/auth/me` | Get current user | Private |
| GET | `/api/auth/verify-email/:token` | Verify email | Public |
| POST | `/api/auth/resend-verification` | Resend verification email | Public |
| POST | `/api/auth/refresh-token` | Refresh JWT token | Public |

### User Management Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update user profile | Private |
| POST | `/api/users/avatar` | Upload avatar | Private |
| PUT | `/api/users/change-password` | Change password | Private |
| DELETE | `/api/users/account` | Delete account | Private |

### Appointment Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/appointments/available-slots` | Get available time slots | Private |
| POST | `/api/appointments` | Book appointment | Private (Verified) |
| GET | `/api/appointments/my-appointments` | Get user's appointments | Private |
| GET | `/api/appointments/:id` | Get single appointment | Private |
| PUT | `/api/appointments/:id` | Update appointment | Private |
| DELETE | `/api/appointments/:id` | Cancel appointment | Private |
| GET | `/api/appointments` | Get all appointments | Admin/Staff |

### Service Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/services` | Get all services | Public |
| GET | `/api/services/:id` | Get single service | Public |

### Contact Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/contact` | Submit contact form | Public |

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/health` | API health status | Public |

## 🔐 Authentication Flow

### Registration Process
1. User submits registration form
2. Server validates input data
3. Password is hashed using bcrypt
4. Email verification token is generated
5. User account is created (unverified)
6. Verification email is sent
7. User clicks verification link
8. Account is activated

### Login Process
1. User submits email and password
2. Server validates credentials
3. Account status is checked (active, not locked)
4. JWT tokens are generated
5. Login attempts are reset on success
6. Tokens are returned to client

### Booking Restrictions
- ✅ User must be authenticated
- ✅ Email must be verified
- ✅ Account must be active
- ✅ Account must not be locked

## 🛡️ Security Features

### Rate Limiting
- Registration: 3 attempts per 15 minutes
- Login: 5 attempts per 15 minutes
- Password change: 3 attempts per hour
- Appointment booking: 5 bookings per hour
- Contact form: 3 submissions per hour

### Account Security
- Password requirements: 8+ chars, uppercase, lowercase, number, special char
- Account lockout: 5 failed login attempts = 2 hour lock
- JWT expiration: 7 days (configurable)
- Refresh token: 30 days (configurable)

### Data Protection
- Password hashing with bcrypt (12 rounds)
- JWT secret rotation support
- Input validation and sanitization
- SQL injection prevention
- XSS protection with Helmet

## 📧 Email Templates

The system includes professional email templates for:
- ✅ Email verification
- ✅ Appointment confirmation
- ✅ Appointment reminders
- ✅ Contact form auto-replies

## 🗂️ File Structure

```
backend/
├── controllers/          # Request handlers
├── middleware/          # Custom middleware
├── models/             # Database models
├── routes/             # API routes
├── scripts/            # Database seeding
├── utils/              # Utility functions
├── uploads/            # File uploads
├── server.js           # Main server file
├── package.json        # Dependencies
└── README.md          # Documentation
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=very_long_random_string_for_production
FRONTEND_URL=https://yourdomain.com
```

### PM2 Deployment
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "dental-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email info@subhadentalcare.com or create an issue in the repository.

---

**Subha Dental Care Backend API** - Providing secure and reliable backend services for modern dental practice management.
