import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, DollarSign, CheckCircle, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

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
      alt: 'Professional dental checkup examination with dentist using modern dental tools and equipment'
    },
    {
      icon: '📷',
      title: 'Dental X-ray (RVG)',
      description: 'Digital radiography for accurate diagnosis and treatment planning.',
      price: 'From $50',
      duration: '15 minutes',
      features: ['Digital imaging', 'Instant results', 'Low radiation', 'Detailed analysis'],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      alt: 'Digital dental X-ray machine and radiography equipment for accurate dental diagnosis'
    },
    {
      icon: '✨',
      title: 'Scaling & Polishing',
      description: 'Professional teeth cleaning and plaque removal for healthier gums.',
      price: 'From $120',
      duration: '60 minutes',
      features: ['Plaque removal', 'Tartar cleaning', 'Teeth polishing', 'Gum care'],
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      alt: 'Professional dental scaling and polishing procedure for teeth cleaning and plaque removal'
    },
    {
      icon: '🔧',
      title: 'Dental Restoration',
      description: 'Fillings, crowns, and restorative treatments to repair damaged teeth.',
      price: 'From $200',
      duration: '90 minutes',
      features: ['Cavity filling', 'Crown placement', 'Tooth repair', 'Color matching'],
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      alt: 'Dental restoration procedure showing cavity filling and tooth repair treatment'
    },
    {
      icon: '🦷',
      title: 'Dental Extraction',
      description: 'Safe and painless tooth removal procedures when necessary.',
      price: 'From $150',
      duration: '30 minutes',
      features: ['Pain-free procedure', 'Local anesthesia', 'Post-care guidance', 'Follow-up care'],
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      alt: 'Safe and painless dental extraction procedure with modern dental instruments'
    },
    {
      icon: '👑',
      title: 'Crown & Bridge',
      description: 'Custom-made crowns and bridges for restoration and replacement.',
      price: 'From $800',
      duration: '2-3 visits',
      features: ['Custom design', 'Natural appearance', 'Durable materials', 'Perfect fit'],
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      alt: 'Custom dental crown and bridge work showing natural-looking tooth restoration'
    },
    {
      icon: '🦷',
      title: 'Removable Denture',
      description: 'Comfortable and natural-looking dentures for missing teeth.',
      price: 'From $600',
      duration: '3-4 visits',
      features: ['Custom fit', 'Natural look', 'Comfortable wear', 'Easy maintenance'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      alt: 'Comfortable and natural-looking removable dentures for missing teeth replacement'
    },
    {
      icon: '📐',
      title: 'Orthodontic Treatment',
      description: 'Braces and aligners to straighten teeth and improve bite.',
      price: 'From $1500',
      duration: '12-24 months',
      features: ['Teeth alignment', 'Bite correction', 'Regular monitoring', 'Various options'],
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
      alt: 'Orthodontic treatment with braces and aligners for teeth straightening and bite correction'
    },
    {
      icon: '⚡',
      title: 'Dental Implant',
      description: 'Permanent tooth replacement solution with titanium implants.',
      price: 'From $2000',
      duration: '3-6 months',
      features: ['Permanent solution', 'Natural feel', 'Bone preservation', 'Long-lasting'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
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
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
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
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">{service.icon}</span>
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
