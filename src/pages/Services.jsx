import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Services = () => {
  const services = [
    {
      icon: '🦷',
      title: 'Dental Checkup',
      description: 'Comprehensive oral health examination and cleaning to maintain optimal dental health.',
      price: 'From $80',
      duration: '45 minutes',
      features: ['Oral examination', 'Professional cleaning', 'X-rays if needed', 'Treatment planning']
    },
    {
      icon: '📷',
      title: 'Dental X-ray (RVG)',
      description: 'Digital radiography for accurate diagnosis and treatment planning.',
      price: 'From $50',
      duration: '15 minutes',
      features: ['Digital imaging', 'Instant results', 'Low radiation', 'Detailed analysis']
    },
    {
      icon: '✨',
      title: 'Scaling & Polishing',
      description: 'Professional teeth cleaning and plaque removal for healthier gums.',
      price: 'From $120',
      duration: '60 minutes',
      features: ['Plaque removal', 'Tartar cleaning', 'Teeth polishing', 'Gum care']
    },
    {
      icon: '🔧',
      title: 'Dental Restoration',
      description: 'Fillings, crowns, and restorative treatments to repair damaged teeth.',
      price: 'From $200',
      duration: '90 minutes',
      features: ['Cavity filling', 'Crown placement', 'Tooth repair', 'Color matching']
    },
    {
      icon: '🦷',
      title: 'Dental Extraction',
      description: 'Safe and painless tooth removal procedures when necessary.',
      price: 'From $150',
      duration: '30 minutes',
      features: ['Pain-free procedure', 'Local anesthesia', 'Post-care guidance', 'Follow-up care']
    },
    {
      icon: '👑',
      title: 'Crown & Bridge',
      description: 'Custom-made crowns and bridges for restoration and replacement.',
      price: 'From $800',
      duration: '2-3 visits',
      features: ['Custom design', 'Natural appearance', 'Durable materials', 'Perfect fit']
    },
    {
      icon: '🦷',
      title: 'Removable Denture',
      description: 'Comfortable and natural-looking dentures for missing teeth.',
      price: 'From $600',
      duration: '3-4 visits',
      features: ['Custom fit', 'Natural look', 'Comfortable wear', 'Easy maintenance']
    },
    {
      icon: '📐',
      title: 'Orthodontic Treatment',
      description: 'Braces and aligners to straighten teeth and improve bite.',
      price: 'From $1500',
      duration: '12-24 months',
      features: ['Teeth alignment', 'Bite correction', 'Regular monitoring', 'Various options']
    },
    {
      icon: '⚡',
      title: 'Dental Implant',
      description: 'Permanent tooth replacement solution with titanium implants.',
      price: 'From $2000',
      duration: '3-6 months',
      features: ['Permanent solution', 'Natural feel', 'Bone preservation', 'Long-lasting']
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
              Our Dental Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Comprehensive dental care services designed to keep your smile healthy, 
              beautiful, and confident. From routine checkups to advanced treatments.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
                    <span className="text-primary-600 font-semibold">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{service.duration}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full group">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Need a Custom Treatment Plan?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Every patient is unique. Let us create a personalized treatment plan 
              that fits your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                Call for Emergency
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
