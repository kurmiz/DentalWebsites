import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Heart,
  Shield,
  Target,
  Eye,
  CheckCircle
} from 'lucide-react';
import AOS from 'aos';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, understanding, and genuine care for their well-being.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Maintaining the highest standards of hygiene and safety protocols for patient protection.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering exceptional dental care through continuous learning and innovation.'
    },
    {
      icon: Users,
      title: 'Patient-Centered',
      description: 'Every treatment plan is personalized to meet individual patient needs and preferences.'
    }
  ];

  const team = [
    {
      name: 'Dr. Subha Sharma',
      role: 'Chief Dental Officer',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
      qualifications: 'BDS, MDS (Oral Surgery)',
      experience: '15+ years',
      alt: 'Dr. Subha Sharma - Chief Dental Officer and lead dentist at Subha Dental Care'
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Orthodontist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
      qualifications: 'BDS, MDS (Orthodontics)',
      experience: '12+ years',
      alt: 'Dr. Rajesh Kumar - Specialist orthodontist for braces and teeth alignment treatments'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Pediatric Dentist',
      image: 'https://images.unsplash.com/photo-1594824475317-d3e2b7b3e5e5?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
      qualifications: 'BDS, MDS (Pediatric Dentistry)',
      experience: '10+ years',
      alt: 'Dr. Priya Patel - Pediatric dentist specializing in children\'s dental care'
    }
  ];

  const achievements = [
    'ISO 9001:2015 Certified Clinic',
    '5000+ Successful Treatments',
    '99% Patient Satisfaction Rate',
    'Award for Best Dental Care 2023',
    'Member of Nepal Dental Association',
    'Advanced Sterilization Protocols'
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
              About Subha Dental Care
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Dedicated to providing exceptional dental care with a personal touch.
              Our mission is to help you achieve optimal oral health in a comfortable,
              modern environment.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
                alt="Modern dental clinic interior at Subha Dental Care featuring advanced equipment and comfortable patient treatment areas"
                className="rounded-2xl shadow-lg w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div data-aos="fade-left">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-primary-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To provide comprehensive, high-quality dental care that promotes oral health
                    and enhances the overall well-being of our patients. We strive to create a
                    comfortable, welcoming environment where every patient feels valued and cared for.
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Eye className="h-8 w-8 text-primary-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    To be the leading dental healthcare provider in Nepal, recognized for our
                    commitment to excellence, innovation, and patient-centered care. We envision
                    a community where everyone has access to quality dental care and education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These values guide everything we do and shape the way we care for our patients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-max">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our experienced dental professionals are committed to providing you with the best care possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
              >
                <img
                  src={member.image}
                  alt={member.alt}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {member.qualifications}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {member.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-max">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Recognition and milestones that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md"
              >
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {achievement}
                </span>
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
              Experience the Difference
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their dental care.
              Schedule your appointment today and discover what sets us apart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Schedule Consultation
              </a>
              <a
                href="tel:+977-1-4567890"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Call Us Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
