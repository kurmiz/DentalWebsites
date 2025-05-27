import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Shield, CheckCircle, Star, Heart } from 'lucide-react';
import certificateImage from '../../images/certificate.jpg';
import patientImage from '../../images/patientimage.jpg';

const CredentialsSection = () => {
  const credentials = [
    {
      icon: Award,
      title: 'Professional Certification',
      description: 'Board-certified dental professionals with advanced training and continuous education',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Safety Standards',
      description: 'Highest safety protocols and sterilization standards for patient protection',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Patient Care',
      description: 'Personalized treatment plans with compassionate care for every patient',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Community Trust',
      description: 'Trusted by thousands of families in the community for over 15 years',
      color: 'from-pink-400 to-rose-500'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
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
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Our Credentials & Commitment
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
              Excellence
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Our commitment to excellence is reflected in our professional credentials, 
            patient satisfaction, and the trust we've built in our community.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Certificate Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative">
              <img
                src={certificateImage}
                alt="Professional dental certificate and credentials showcasing the expertise and qualifications of Subha Dental Care"
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Certified</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Professional</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Professional Credentials
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our dental professionals hold advanced certifications and continuously update their skills 
                with the latest techniques and technologies in modern dentistry.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {credentials.slice(0, 2).map((credential, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${credential.color} rounded-lg flex items-center justify-center mb-3`}>
                      <credential.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                      {credential.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {credential.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Patient Care Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative">
              <img
                src={patientImage}
                alt="Happy patient at Subha Dental Care showing satisfaction with professional dental treatment and care"
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">5000+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Happy Patients</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Patient-Centered Care
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Every patient receives personalized attention and care. Our commitment to comfort, 
                safety, and satisfaction has earned us the trust of thousands of families.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {credentials.slice(2, 4).map((credential, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${credential.color} rounded-lg flex items-center justify-center mb-3`}>
                      <credential.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                      {credential.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {credential.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 lg:p-12 text-white"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-100 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary-100 font-medium">Happy Patients</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">4.9★</div>
              <div className="text-primary-100 font-medium">Patient Rating</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-100 font-medium">Safety Standards</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CredentialsSection;
