const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Sample users data
const sampleUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: process.env.ADMIN_EMAIL || 'admin@subhadentalcare.com',
    phone: '+977-9800000001',
    password: process.env.ADMIN_PASSWORD || 'AdminPassword123!',
    dateOfBirth: new Date('1980-01-01'),
    gender: 'male',
    role: 'admin',
    isEmailVerified: true,
    address: {
      street: 'Buddha Chowk',
      city: 'Bhairahawa',
      state: 'Lumbini',
      zipCode: '32900',
      country: 'Nepal'
    }
  },
  {
    firstName: 'Dr. Subha',
    lastName: 'Dental',
    email: 'doctor@subhadentalcare.com',
    phone: '+977-9800000002',
    password: 'DoctorPassword123!',
    dateOfBirth: new Date('1975-05-15'),
    gender: 'female',
    role: 'dentist',
    isEmailVerified: true,
    address: {
      street: 'Buddha Chowk',
      city: 'Bhairahawa',
      state: 'Lumbini',
      zipCode: '32900',
      country: 'Nepal'
    }
  },
  {
    firstName: 'Staff',
    lastName: 'Member',
    email: 'staff@subhadentalcare.com',
    phone: '+977-9800000003',
    password: 'StaffPassword123!',
    dateOfBirth: new Date('1990-03-20'),
    gender: 'female',
    role: 'staff',
    isEmailVerified: true,
    address: {
      street: 'Buddha Chowk',
      city: 'Bhairahawa',
      state: 'Lumbini',
      zipCode: '32900',
      country: 'Nepal'
    }
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+977-9800000004',
    password: 'PatientPassword123!',
    dateOfBirth: new Date('1985-07-10'),
    gender: 'male',
    role: 'patient',
    isEmailVerified: true,
    address: {
      street: 'Main Street 123',
      city: 'Kathmandu',
      state: 'Bagmati',
      zipCode: '44600',
      country: 'Nepal'
    },
    medicalHistory: {
      allergies: ['Penicillin'],
      medications: ['Aspirin'],
      medicalConditions: ['Hypertension'],
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+977-9800000005',
        relationship: 'Spouse'
      }
    }
  },
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+977-9800000006',
    password: 'PatientPassword123!',
    dateOfBirth: new Date('1992-12-05'),
    gender: 'female',
    role: 'patient',
    isEmailVerified: true,
    address: {
      street: 'Park Avenue 456',
      city: 'Pokhara',
      state: 'Gandaki',
      zipCode: '33700',
      country: 'Nepal'
    },
    medicalHistory: {
      allergies: [],
      medications: [],
      medicalConditions: [],
      emergencyContact: {
        name: 'Mike Johnson',
        phone: '+977-9800000007',
        relationship: 'Brother'
      }
    }
  }
];

// Sample appointments data (will be created after users)
const createSampleAppointments = async (users) => {
  const patients = users.filter(user => user.role === 'patient');
  const doctor = users.find(user => user.role === 'dentist');
  
  const sampleAppointments = [
    {
      patient: patients[0]._id,
      service: 'Dental Checkup',
      appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      timeSlot: '10:00',
      reason: 'Regular checkup and cleaning',
      status: 'confirmed',
      assignedDoctor: doctor._id,
      priority: 'normal',
      isFirstVisit: false
    },
    {
      patient: patients[1]._id,
      service: 'Scaling & Polishing',
      appointmentDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      timeSlot: '14:30',
      reason: 'Teeth cleaning and polishing',
      status: 'pending',
      priority: 'normal',
      isFirstVisit: true
    },
    {
      patient: patients[0]._id,
      service: 'Dental X-ray (RVG)',
      appointmentDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      timeSlot: '11:30',
      reason: 'Follow-up X-ray for previous treatment',
      status: 'pending',
      assignedDoctor: doctor._id,
      priority: 'normal',
      isFirstVisit: false
    }
  ];
  
  return sampleAppointments;
};

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Appointment.deleteMany({});
    
    // Create users
    console.log('👥 Creating sample users...');
    const createdUsers = [];
    
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.fullName} (${user.role})`);
    }
    
    // Create appointments
    console.log('📅 Creating sample appointments...');
    const appointmentData = await createSampleAppointments(createdUsers);
    
    for (const appointmentInfo of appointmentData) {
      const appointment = new Appointment(appointmentInfo);
      await appointment.save();
      console.log(`✅ Created appointment: ${appointment.service} for ${appointment.appointmentDate.toDateString()}`);
    }
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   👥 Users created: ${createdUsers.length}`);
    console.log(`   📅 Appointments created: ${appointmentData.length}`);
    
    console.log('\n🔐 Default Login Credentials:');
    console.log('   Admin:');
    console.log(`     Email: ${process.env.ADMIN_EMAIL || 'admin@subhadentalcare.com'}`);
    console.log(`     Password: ${process.env.ADMIN_PASSWORD || 'AdminPassword123!'}`);
    console.log('   Doctor:');
    console.log('     Email: doctor@subhadentalcare.com');
    console.log('     Password: DoctorPassword123!');
    console.log('   Staff:');
    console.log('     Email: staff@subhadentalcare.com');
    console.log('     Password: StaffPassword123!');
    console.log('   Patient:');
    console.log('     Email: john.doe@example.com');
    console.log('     Password: PatientPassword123!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  connectDB().then(() => {
    seedDatabase();
  });
}

module.exports = { seedDatabase, connectDB };
