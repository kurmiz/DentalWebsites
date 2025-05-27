import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Appointments', href: '/contact' },
  ];

  const services = [
    'Dental Checkup',
    'Teeth Cleaning',
    'Dental Implants',
    'Orthodontics',
    'Root Canal',
    'Cosmetic Dentistry',
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61574498425766', label: 'Facebook', color: 'hover:bg-blue-600', bgColor: 'bg-blue-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500', bgColor: 'bg-sky-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600', bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700', bgColor: 'bg-blue-600' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Clinic Location Map */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">Visit Our Clinic</h3>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.4391301663168!2d83.45134937491628!3d27.517813333826602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996e5002cce503b%3A0x5e60a3ba84bc2b8a!2sSubha%20Dental%20Care!5e0!3m2!1sen!2sin!4v1748122038368!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{border: 0}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
                title="Subha Dental Care Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">Subha Dental Care</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for comprehensive dental healthcare.
              We provide modern dentistry with a gentle touch in our
              state-of-the-art facility.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-12 h-12 ${social.bgColor} rounded-full flex items-center justify-center ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-400 transition-colors duration-200">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Address</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Buddha chowk, Bhairahawa<br />
                    Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-400 transition-colors duration-200">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <a
                    href="tel:+977-9864467519"
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium block"
                  >
                    +977 9864467519
                  </a>
                  <a
                    href="tel:071-5745194"
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium block text-sm"
                  >
                    071-5745194 (Tel)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-400 transition-colors duration-200">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <a
                    href="mailto:info@subhadentalcare.com"
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 font-medium block"
                  >
                    info@subhadentalcare.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-400 transition-colors duration-200">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Hours</h4>
                  <div className="text-gray-300 space-y-1">
                    <p className="font-medium">Sunday - Saturday: <span className="text-green-400">9:00 AM - 6:00 PM</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Subha Dental Care. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made by</span>
              <span className="text-primary-400 font-semibold">Abhesh Kurmi</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
