import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, DollarSign, CheckCircle, Shield, BookOpen, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { DentalAnimations } from '../components/ui/GifPlayer';

const Services = () => {
  const services = [
    {
      icon: '🦷',
      title: 'Dental Checkup',
      description: 'Comprehensive oral health examination and cleaning to maintain optimal dental health.',
      price: 'From $80',
      duration: '45 minutes',
      features: ['Oral examination', 'Professional cleaning', 'X-rays if needed', 'Treatment planning'],
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Professional dental checkup examination with dentist using modern dental tools and equipment'
    },
    {
      icon: '📷',
      title: 'Dental X-ray (RVG)',
      description: 'Digital radiography for accurate diagnosis and treatment planning.',
      price: 'From $50',
      duration: '15 minutes',
      features: ['Digital imaging', 'Instant results', 'Low radiation', 'Detailed analysis'],
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Digital dental X-ray machine and radiography equipment for accurate dental diagnosis'
    },
    {
      icon: '✨',
      title: 'Scaling & Polishing',
      description: 'Professional teeth cleaning and plaque removal for healthier gums.',
      price: 'From $120',
      duration: '60 minutes',
      features: ['Plaque removal', 'Tartar cleaning', 'Teeth polishing', 'Gum care'],
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Professional dental scaling and polishing procedure for teeth cleaning and plaque removal'
    },
    {
      icon: '🔧',
      title: 'Dental Restoration',
      description: 'Fillings, crowns, and restorative treatments to repair damaged teeth.',
      price: 'From $200',
      duration: '90 minutes',
      features: ['Cavity filling', 'Crown placement', 'Tooth repair', 'Color matching'],
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Dental restoration procedure showing cavity filling and tooth repair treatment'
    },
    {
      icon: '🦷',
      title: 'Dental Extraction',
      description: 'Safe and painless tooth removal procedures when necessary.',
      price: 'From $150',
      duration: '30 minutes',
      features: ['Pain-free procedure', 'Local anesthesia', 'Post-care guidance', 'Follow-up care'],
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Safe and painless dental extraction procedure with modern dental instruments'
    },
    {
      icon: '👑',
      title: 'Crown & Bridge',
      description: 'Custom-made crowns and bridges for restoration and replacement.',
      price: 'From $800',
      duration: '2-3 visits',
      features: ['Custom design', 'Natural appearance', 'Durable materials', 'Perfect fit'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Custom dental crown and bridge work showing natural-looking tooth restoration'
    },
    {
      icon: '🦷',
      title: 'Removable Denture',
      description: 'Comfortable and natural-looking dentures for missing teeth.',
      price: 'From $600',
      duration: '3-4 visits',
      features: ['Custom fit', 'Natural look', 'Comfortable wear', 'Easy maintenance'],
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Comfortable and natural-looking removable dentures for missing teeth replacement'
    },
    {
      icon: '📐',
      title: 'Orthodontic Treatment',
      description: 'Braces and aligners to straighten teeth and improve bite.',
      price: 'From $1500',
      duration: '12-24 months',
      features: ['Teeth alignment', 'Bite correction', 'Regular monitoring', 'Various options'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Orthodontic treatment with braces and aligners for teeth straightening and bite correction'
    },
    {
      icon: '⚡',
      title: 'Dental Implant',
      description: 'Permanent tooth replacement solution with titanium implants.',
      price: 'From $2000',
      duration: '3-6 months',
      features: ['Permanent solution', 'Natural feel', 'Bone preservation', 'Long-lasting'],
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      iconImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center&auto=format&q=80',
      alt: 'Dental implant procedure showing permanent tooth replacement with titanium implants'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Our Dental Services
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Comprehensive dental care services designed to keep your smile healthy,
                beautiful, and confident. From routine checkups to advanced treatments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/book-appointment">
                  <Button size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
                alt="Professional dental services at Subha Dental Care featuring comprehensive treatments and modern dental equipment"
                className="rounded-2xl shadow-2xl w-full h-auto"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">9+ Services</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Complete Care</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 right-4 w-24 h-24 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                      src={service.iconImage || service.image}
                      alt={`${service.title} icon`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="text-center mb-4">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dental Care Education Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn Proper Dental Care
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Dental Care{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Education
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Learn the proper techniques for maintaining excellent oral health at home.
              These animated guides show you the correct way to care for your teeth and gums.
            </p>
          </motion.div>

          {/* Dental Care Animations */}
          <DentalAnimations />

          {/* Additional Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Daily Oral Care Tips
                </h3>
                <ul className="space-y-3 text-primary-100">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span>Brush your teeth twice daily for at least 2 minutes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span>Floss daily to remove plaque between teeth</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span>Use fluoride toothpaste for cavity prevention</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span>Visit your dentist every 6 months for checkups</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                    <span>Limit sugary and acidic foods and drinks</span>
                  </li>
                </ul>
              </div>

              <div className="text-center lg:text-right">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=300&h=200&fit=crop&crop=center&auto=format&q=80"
                    alt="Professional dental care demonstration showing proper oral hygiene techniques"
                    className="rounded-2xl shadow-lg mb-4"
                  />
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl lg:text-5xl font-bold mb-2">2x</div>
                    <div className="text-primary-100 font-medium">Daily Brushing</div>
                    <div className="text-sm text-primary-200 mt-2">Recommended by dentists worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dental Technology & Equipment Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Advanced Technology
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              State-of-the-Art{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Dental Equipment
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We use the latest dental technology and equipment to ensure precise diagnoses,
              comfortable treatments, and exceptional results for all our patients.
            </p>
          </motion.div>

          {/* Equipment Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Digital X-Ray Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop&crop=center&auto=format&q=80"
                alt="Digital dental X-ray equipment for accurate diagnosis"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Digital X-Ray System
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advanced digital radiography with 90% less radiation exposure and instant results.
              </p>
            </motion.div>

            {/* Dental Chair & Unit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop&crop=center&auto=format&q=80"
                alt="Modern dental chair and treatment unit"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Modern Dental Units
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Ergonomic dental chairs with integrated tools for maximum patient comfort.
              </p>
            </motion.div>

            {/* Sterilization Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=250&fit=crop&crop=center&auto=format&q=80"
                alt="Advanced sterilization equipment for dental instruments"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Sterilization Systems
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Hospital-grade sterilization ensuring the highest safety standards.
              </p>
            </motion.div>
          </div>

          {/* Technology Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Choose Our Advanced Technology?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Precise Diagnosis
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Digital imaging provides crystal-clear images for accurate treatment planning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Comfortable Treatment
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Modern equipment ensures minimal discomfort during procedures.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Faster Results
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Advanced technology reduces treatment time and improves outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=350&fit=crop&crop=center&auto=format&q=80"
                  alt="Modern dental clinic with advanced equipment and technology"
                  className="rounded-2xl shadow-xl w-full h-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Latest Tech</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">2024 Equipment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-blue-600 relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=600&fit=crop&crop=center&auto=format&q=80"
            alt="Professional dental consultation background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Need a Custom Treatment Plan?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Every patient is unique. Let us create a personalized treatment plan
                that fits your specific needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Call for Emergency
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=400&fit=crop&crop=center&auto=format&q=80"
                  alt="Professional dental consultation with patient"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Free Consultation</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">No hidden fees</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">Same Day</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Emergency Care</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
