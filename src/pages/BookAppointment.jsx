import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LoadingGif, SuccessGif } from '../components/ui/GifPlayer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const BookAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    { id: 'checkup', name: 'Dental Checkup', duration: '45 min', price: '$80' },
    { id: 'cleaning', name: 'Teeth Cleaning', duration: '30 min', price: '$60' },
    { id: 'filling', name: 'Dental Filling', duration: '60 min', price: '$120' },
    { id: 'extraction', name: 'Tooth Extraction', duration: '30 min', price: '$150' },
    { id: 'whitening', name: 'Teeth Whitening', duration: '90 min', price: '$200' },
    { id: 'implant', name: 'Dental Implant', duration: '120 min', price: '$800' },
  ];

  const doctors = [
    {
      id: 'dr-smith',
      name: 'Dr. Sarah Smith',
      specialty: 'General Dentistry',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      alt: 'Dr. Sarah Smith - General Dentistry specialist at Subha Dental Care'
    },
    {
      id: 'dr-johnson',
      name: 'Dr. Michael Johnson',
      specialty: 'Orthodontics',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      alt: 'Dr. Michael Johnson - Orthodontics specialist for braces and teeth alignment'
    },
    {
      id: 'dr-williams',
      name: 'Dr. Emily Williams',
      specialty: 'Cosmetic Dentistry',
      image: 'https://images.unsplash.com/photo-1594824475317-d3e2b7b3e5e5?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      alt: 'Dr. Emily Williams - Cosmetic Dentistry specialist for smile enhancement'
    },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const schema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    reason: yup.string().required('Reason for visit is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const appointmentData = {
      ...data,
      service: selectedService,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Appointment booked successfully!');
      setCurrentStep(5); // Success step
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const steps = [
    { number: 1, title: 'Service', icon: FileText },
    { number: 2, title: 'Doctor', icon: User },
    { number: 3, title: 'Date & Time', icon: Calendar },
    { number: 4, title: 'Details', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Schedule your visit in just a few simple steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Select a Service
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">{service.duration}</span>
                      <span className="font-bold text-primary-600">{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Doctor Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Choose Your Doctor
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor.id)}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      selectedDoctor === doctor.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.alt}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{doctor.specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time Selection */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Select Date & Time
              </h2>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Choose Date
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {generateDates().map((date, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                      className={`p-3 text-center border rounded-lg cursor-pointer transition-all ${
                        selectedDate === date.toISOString().split('T')[0]
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="text-xs font-medium">{formatDate(date)}</div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Choose Time
                  </h3>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                          selectedTime === time
                            ? 'border-primary-500 bg-primary-500 text-white'
                            : 'border-gray-200 text-gray-700 dark:text-gray-300 hover:border-primary-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Personal Details */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Details
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    {...register('reason')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Please describe your symptoms or reason for the visit"
                  />
                  {errors.reason && (
                    <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                  )}
                </div>

                {/* Appointment Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Appointment Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Service:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {services.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Doctor:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {doctors.find(d => d.id === selectedDoctor)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedDate && new Date(selectedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Time:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                      <span className="font-bold text-primary-600">
                        {services.find(s => s.id === selectedService)?.price}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Booking...' : 'Book Appointment'}
                </Button>
              </form>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="mb-8">
                <LoadingGif size="large" className="mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Booking Your Appointment...
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we process your request. This may take a few moments.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {currentStep === 5 && !isLoading && (
            <div className="text-center py-12">
              <div className="mb-8">
                <SuccessGif size="large" className="mx-auto" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Appointment Booked Successfully! 🎉
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We've sent a confirmation email with all the details.
                We look forward to seeing you and helping you achieve your best smile!
              </p>

              {/* Appointment Details Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">
                  Your Appointment Details
                </h3>
                <div className="space-y-2 text-sm text-green-700 dark:text-green-400">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{services.find(s => s.id === selectedService)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Doctor:</span>
                    <span className="font-medium">{doctors.find(d => d.id === selectedDoctor)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate && new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = '/dashboard'}>
                  <Calendar className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Only show for steps 1-3 and not loading */}
          {currentStep < 4 && !isLoading && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !selectedService) ||
                  (currentStep === 2 && !selectedDoctor) ||
                  (currentStep === 3 && (!selectedDate || !selectedTime))
                }
                className="flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookAppointment;
