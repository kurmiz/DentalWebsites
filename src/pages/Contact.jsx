import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    service: yup.string().required('Please select a service'),
    message: yup.string().required('Message is required'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const services = [
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
    'Other'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form data:', data);
      toast.success('Your appointment request has been sent successfully! We will contact you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Buddha chowk, Bhairahawa', 'Nepal'],
      link: 'https://maps.google.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+977 9864467519', '071-5745194'],
      link: 'tel:+977-9864467519'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@subhadentalcare.com', 'appointments@subhadentalcare.com'],
      link: 'mailto:info@subhadentalcare.com'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Sunday - Saturday: 9:00 AM - 6:00 PM'],
      link: null
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Ready to schedule your appointment? Get in touch with us today.
              We're here to help you achieve your best smile.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Book an Appointment
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        {...register('name')}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Needed *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        {...register('service')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Tell us about your dental concerns or preferred appointment time..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We're here to help you with all your dental needs. Contact us through
                  any of the methods below or visit our clinic directly.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 dark:text-gray-400">
                            {info.link && idx === 0 ? (
                              <a
                                href={info.link}
                                className="hover:text-primary-600 transition-colors duration-200"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Clinic Image */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=300&fit=crop&crop=center&auto=format&q=80"
                  alt="Subha Dental Care clinic exterior and reception area welcoming patients in Buddhachowk, Kathmandu"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5" />
                    <span className="font-semibold">Our Clinic Location</span>
                  </div>
                  <p className="text-sm opacity-90">
                    Buddhachowk, Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
