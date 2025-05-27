import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  const handleBookAppointment = () => {
    onClose();
    // Navigate to booking page with pre-selected service
    window.location.href = `/book-appointment?service=${encodeURIComponent(service.title)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Service Icon */}
                <div className="absolute bottom-4 left-6">
                  <div className="w-16 h-16 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                </div>

                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Popular Choice
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        About This Service
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {service.detailedDescription || service.description}
                      </p>
                    </div>

                    {/* What's Included */}
                    {service.features && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          What's Included
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Process Steps */}
                    {service.process && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Treatment Process
                        </h3>
                        <div className="space-y-3">
                          {service.process.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="text-gray-600 dark:text-gray-400">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Pricing Card */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Service Details
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Price</span>
                          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                            {service.price}
                          </span>
                        </div>
                        
                        {service.duration && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Duration</span>
                            <div className="flex items-center text-gray-900 dark:text-white">
                              <Clock className="h-4 w-4 mr-1" />
                              {service.duration}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 space-y-3">
                        <Button
                          onClick={handleBookAppointment}
                          className="w-full"
                          size="lg"
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          Book Appointment
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.location.href = '/contact'}
                        >
                          Ask Questions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Benefits */}
                    {service.benefits && (
                      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Benefits
                        </h3>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
