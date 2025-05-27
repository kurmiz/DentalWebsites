import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Verified, Heart } from 'lucide-react';

const TestimonialCard = ({ name, rating, comment, avatar, alt, delay = 0, verified = false, location = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group relative card card-hover p-8 overflow-hidden interactive-glow-warm"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-primary-200 dark:text-primary-700 group-hover:text-primary-300 dark:group-hover:text-primary-600 transition-colors duration-300">
        <Quote className="h-10 w-10" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center mb-6 space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 transition-colors duration-300 ${
              i < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {rating}.0
        </span>
      </div>

      {/* Comment */}
      <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base italic relative z-10">
        "{comment}"
      </blockquote>

      {/* User Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={avatar}
              alt={alt || `${name} - Patient testimonial photo`}
              className={`w-14 h-14 rounded-full object-cover border-3 border-white dark:border-gray-700 shadow-lg transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.log('Avatar failed to load:', e.target.src);
                e.target.src = `https://via.placeholder.com/150x150/10B981/FFFFFF?text=${encodeURIComponent(name.charAt(0))}`;
                setImageLoaded(true);
              }}
            />
            {verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                <Verified className="w-3 h-3 text-white fill-current" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                {name}
              </h4>
              {verified && (
                <Verified className="w-4 h-4 text-blue-500 fill-current" />
              )}
            </div>
            {location && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {location}
              </p>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Verified Patient
            </p>
          </div>
        </div>

        {/* Love Icon */}
        <div className="text-red-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="w-6 h-6 fill-current" />
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-blue-50/50 dark:from-primary-900/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default TestimonialCard;
