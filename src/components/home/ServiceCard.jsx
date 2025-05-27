import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Star } from 'lucide-react';
import { Button } from '../ui/Button';

const ServiceCard = ({ icon, title, description, price, image, alt, delay = 0, featured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`group relative card card-hover card-interactive overflow-hidden ${
        featured ? 'ring-2 ring-primary-500 dark:ring-primary-400 ring-opacity-50 dark:ring-opacity-60' : ''
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        </div>
      )}

      {/* Service Image */}
      <div className="relative h-56 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} />
        <img
          src={image}
          alt={alt || title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.log('Service image failed to load:', e.target.src);
            e.target.src = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(title)}`;
            setImageLoaded(true);
          }}
        />

        {/* Icon Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="w-14 h-14 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20 dark:border-gray-700/20 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Service Content */}
      <div className="p-6 space-y-4">
        {/* Title and Description */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-primary-600 dark:text-primary-400 font-bold text-lg">
            {price}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Starting from
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 group/btn interactive-glow-cool"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1 interactive-glow"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ServiceCard;
