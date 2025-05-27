import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Shield,
  Award,
  Users,
  Star,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  FileText,
  CheckCircle,
  Heart
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import ServiceCard from '../components/home/ServiceCard';
import TestimonialCard from '../components/home/TestimonialCard';
import StatsSection from '../components/home/StatsSection';
import CredentialsSection from '../components/home/CredentialsSection';
import { DentalCareVideo } from '../components/ui/VideoPlayer';
import { SmileTransformations } from '../components/ui/GifPlayer';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import local images
import certificateImage from '../images/certificate.jpg';
import patientImage from '../images/patientimage.jpg';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const services = [
    {
      icon: '🦷',
      title: 'Dental Checkup',
      description: 'Comprehensive oral health examination and professional cleaning to maintain optimal dental health',
      price: 'From $80',
      image: certificateImage,
      alt: 'Professional dental checkup examination with dentist using modern dental tools and equipment',
      featured: true
    },
    {
      icon: '📷',
      title: 'Dental X-ray (RVG)',
      description: 'Advanced digital radiography for accurate diagnosis and treatment planning',
      price: 'From $50',
      image: patientImage,
      alt: 'Digital dental X-ray machine and radiography equipment for accurate dental diagnosis'
    },
    {
      icon: '✨',
      title: 'Scaling & Polishing',
      description: 'Professional teeth cleaning and plaque removal for healthier gums and brighter smile',
      price: 'From $120',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
      alt: 'Professional dental scaling and polishing procedure for teeth cleaning and plaque removal',
      featured: true
    },
    {
      icon: '🔧',
      title: 'Dental Restoration',
      description: 'Expert fillings, crowns, and restorative treatments to repair damaged teeth',
      price: 'From $200',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
      alt: 'Dental restoration procedure showing cavity filling and tooth repair treatment'
    },
    {
      icon: '🦷',
      title: 'Dental Extraction',
      description: 'Safe and painless tooth removal procedures with advanced pain management',
      price: 'From $150',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
      alt: 'Safe and painless dental extraction procedure with modern dental instruments'
    },
    {
      icon: '👑',
      title: 'Crown & Bridge',
      description: 'Custom-made crowns and bridges for natural-looking tooth restoration',
      price: 'From $800',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
      alt: 'Custom dental crown and bridge work showing natural-looking tooth restoration'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! Dr. Subha and the team made me feel comfortable throughout my treatment. The modern facility and professional approach exceeded my expectations.',
      avatar: patientImage,
      alt: 'Sarah Johnson - Happy patient testimonial photo',
      verified: true,
      location: 'Kathmandu, Nepal'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Professional, clean, and modern facility. Highly recommend for all dental needs. The staff is incredibly knowledgeable and caring.',
      avatar: patientImage,
      alt: 'Michael Chen - Satisfied patient testimonial photo',
      verified: true,
      location: 'Lalitpur, Nepal'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'The best dental experience I\'ve ever had. Pain-free procedures and caring staff. They truly care about patient comfort and satisfaction.',
      avatar: patientImage,
      alt: 'Emily Davis - Delighted patient testimonial photo',
      verified: true,
      location: 'Bhaktapur, Nepal'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden min-h-screen flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium"
              >
                <Star className="w-4 h-4 mr-2 fill-current" />
                Trusted by 5000+ Happy Patients
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Your Smile,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                  Our Priority
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Experience world-class dental care with cutting-edge technology and compassionate service at
                <span className="font-semibold text-primary-600"> Subha Dental Care</span>.
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span className="font-medium">100% Safe</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Award className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-medium">Expert Care</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link to="/book-appointment">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    <Calendar className="mr-3 h-6 w-6" />
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300">
                    <FileText className="mr-3 h-6 w-6" />
                    Our Services
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative">
                <img
                  src={certificateImage}
                  alt="Professional dental certificate and credentials showcasing the expertise and qualifications of Subha Dental Care"
                  className="rounded-3xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <Shield className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-lg">100% Safe</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Hygiene Standards</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="absolute -top-8 -right-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <Award className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-lg">15+ Years</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-gradient-to-r from-primary-200 to-blue-200 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -z-10 bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full opacity-20 blur-xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
              Our Services
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Dental{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Care Solutions
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              From routine checkups to advanced treatments, we provide comprehensive dental care
              with the latest technology and expert precision.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  image={service.image}
                  alt={service.alt}
                  featured={service.featured}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Need a Custom Treatment Plan?
              </h3>
              <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Every smile is unique. Let our experts create a personalized treatment plan just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/services">
                  <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                    View All Services
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link to="/book-appointment">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold">
                    <Calendar className="mr-3 h-6 w-6" />
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credentials Section */}
      <CredentialsSection />

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Excellence in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-primary-600">
                Every Detail
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We combine cutting-edge technology with compassionate care to deliver
              exceptional dental experiences that exceed your expectations.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Expert Care',
                description: 'Board-certified dental professionals with 15+ years of experience',
                color: 'from-yellow-400 to-orange-500',
                bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
              },
              {
                icon: Shield,
                title: 'Safe & Sterile',
                description: 'Hospital-grade sterilization and the highest safety protocols',
                color: 'from-green-400 to-emerald-500',
                bgColor: 'bg-green-50 dark:bg-green-900/20'
              },
              {
                icon: Users,
                title: 'Patient-Centered',
                description: 'Personalized treatment plans tailored to your unique needs',
                color: 'from-blue-400 to-cyan-500',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20'
              },
              {
                icon: Clock,
                title: 'Convenient Hours',
                description: 'Flexible scheduling including evenings and weekends',
                color: 'from-purple-400 to-pink-500',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${feature.bgColor} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700`}
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Patient Reviews
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Stories of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Happy Smiles
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our patients say about their
              transformative dental experiences with us.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  rating={testimonial.rating}
                  comment={testimonial.comment}
                  avatar={testimonial.avatar}
                  alt={testimonial.alt}
                  verified={testimonial.verified}
                  location={testimonial.location}
                  delay={index * 0.2}
                />
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">5000+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Happy Patients</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">4.9★</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smile Transformations Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900/30 dark:to-blue-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Amazing Transformations
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Smile{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600">
                Transformations
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              See the incredible before and after results of our dental treatments.
              These transformations showcase the life-changing impact of professional dental care.
            </p>
          </motion.div>

          {/* Transformation GIFs */}
          <SmileTransformations />

          {/* Transformation Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Patient Satisfaction</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">With transformation results</div>
            </div>

            <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2000+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Smile Makeovers</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">Successfully completed</div>
            </div>

            <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">In cosmetic dentistry</div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready for Your Transformation?
              </h3>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of patients who have transformed their smiles and boosted their confidence with our expert dental care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book-appointment">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-primary-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <Calendar className="mr-3 h-6 w-6" />
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300"
                  >
                    <ArrowRight className="mr-3 h-6 w-6" />
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase Section */}
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
              <FileText className="w-4 h-4 mr-2" />
              See Our Work in Action
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Experience{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Modern Dentistry
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Watch how we combine advanced technology with compassionate care to deliver
              exceptional dental treatments in a comfortable environment.
            </p>
          </motion.div>

          {/* Video Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <DentalCareVideo />
            </motion.div>

            {/* Video Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  State-of-the-Art Dental Care
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Our modern facility features the latest dental technology and equipment,
                  ensuring precise diagnoses and comfortable treatments. From digital X-rays
                  to advanced sterilization systems, we maintain the highest standards of care.
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Advanced Sterilization
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Hospital-grade sterilization protocols ensure the highest level of safety and hygiene.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Expert Team
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Highly trained dental professionals with years of experience and continuous education.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Patient Comfort
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Comfortable environment designed to reduce anxiety and ensure a pleasant experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link to="/services">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full lg:w-auto px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <ArrowRight className="mr-3 h-6 w-6" />
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-blue-600 to-primary-700 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              Book Your Appointment
            </div>

            <h2 className="text-4xl lg:text-7xl font-bold text-white leading-tight">
              Ready to Transform{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Your Smile?
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Take the first step towards optimal oral health and a confident smile.
              Schedule your consultation today and discover the difference expert care makes.
            </p>

            {/* Contact Options */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center pt-8">
              <Link to="/book-appointment">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full lg:w-auto px-10 py-5 text-xl font-bold bg-white text-primary-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Calendar className="mr-3 h-7 w-7" />
                  Book Appointment
                </Button>
              </Link>

              <div className="flex items-center text-white">
                <span className="text-lg font-medium">or</span>
              </div>

              <a href="tel:+977-1-4567890" className="inline-block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full lg:w-auto px-10 py-5 text-xl font-bold border-2 border-white text-white hover:bg-white hover:text-primary-600 backdrop-blur-sm transition-all duration-300"
                >
                  <Phone className="mr-3 h-7 w-7" />
                  Call Now: +977-1-4567890
                </Button>
              </a>
            </div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-white/20"
            >
              <p className="text-blue-100 text-lg">
                <span className="font-semibold text-white">Emergency?</span> We're available 24/7 for urgent dental care
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
