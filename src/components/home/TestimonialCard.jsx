import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ name, rating, comment, avatar, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 relative"
    >
      <div className="absolute top-4 right-4 text-primary-200">
        <Quote className="h-8 w-8" />
      </div>
      
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 text-yellow-400 fill-current"
              />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
        "{comment}"
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
