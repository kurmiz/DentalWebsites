import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';

const GifPlayer = ({ 
  src, 
  alt, 
  title, 
  description,
  autoplay = true,
  controls = true,
  className = "",
  overlayInfo = null,
  size = "default" // small, default, large
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [showControls, setShowControls] = useState(false);
  const imgRef = useRef(null);

  const sizeClasses = {
    small: "w-32 h-32",
    default: "w-full h-auto",
    large: "w-full h-96 object-cover"
  };

  const togglePlay = () => {
    if (imgRef.current) {
      if (isPlaying) {
        // Pause by setting a static frame (this is a workaround since GIFs can't be truly paused)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imgRef.current.naturalWidth;
        canvas.height = imgRef.current.naturalHeight;
        ctx.drawImage(imgRef.current, 0, 0);
        imgRef.current.src = canvas.toDataURL();
      } else {
        // Resume by resetting the original src
        imgRef.current.src = src;
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restart = () => {
    if (imgRef.current) {
      const currentSrc = imgRef.current.src;
      imgRef.current.src = '';
      imgRef.current.src = currentSrc;
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        title={title}
        className={`${sizeClasses[size]} transition-transform duration-300 group-hover:scale-105`}
        loading="lazy"
      />

      {/* Controls Overlay */}
      {controls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
        >
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
              aria-label={isPlaying ? 'Pause GIF' : 'Play GIF'}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white ml-0.5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={restart}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
              aria-label="Restart GIF"
            >
              <RotateCcw className="h-5 w-5 text-white" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Info Overlay */}
      {overlayInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-white">
            <h3 className="text-sm font-semibold mb-1">{overlayInfo.title}</h3>
            {overlayInfo.description && (
              <p className="text-xs text-gray-200">{overlayInfo.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

// Dental Animation GIFs Component
export const DentalAnimations = () => {
  const dentalGifs = [
    {
      src: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
      alt: "Dental cleaning animation showing proper tooth brushing technique",
      title: "Proper Brushing Technique",
      description: "Learn the correct way to brush your teeth"
    },
    {
      src: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif", 
      alt: "Dental flossing animation demonstrating correct flossing method",
      title: "Flossing Technique",
      description: "Proper flossing for healthy gums"
    },
    {
      src: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif",
      alt: "Dental checkup animation showing examination process",
      title: "Dental Examination",
      description: "What to expect during your checkup"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {dentalGifs.map((gif, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <GifPlayer
            src={gif.src}
            alt={gif.alt}
            title={gif.title}
            overlayInfo={{
              title: gif.title,
              description: gif.description
            }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          />
        </motion.div>
      ))}
    </div>
  );
};

// Smile Transformation GIFs
export const SmileTransformations = () => {
  const transformationGifs = [
    {
      src: "https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif",
      alt: "Before and after dental transformation showing improved smile",
      title: "Smile Makeover",
      description: "Amazing transformation results"
    },
    {
      src: "https://media.giphy.com/media/3o7TKF1fSIs1R19B8Y/giphy.gif",
      alt: "Teeth whitening process animation",
      title: "Teeth Whitening",
      description: "Professional whitening process"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {transformationGifs.map((gif, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <GifPlayer
            src={gif.src}
            alt={gif.alt}
            title={gif.title}
            size="large"
            overlayInfo={{
              title: gif.title,
              description: gif.description
            }}
            className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700"
          />
        </motion.div>
      ))}
    </div>
  );
};

// Loading Animation GIF
export const LoadingGif = ({ size = "default", className = "" }) => {
  return (
    <GifPlayer
      src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
      alt="Loading animation"
      title="Loading..."
      size={size}
      controls={false}
      className={className}
    />
  );
};

// Success Animation GIF
export const SuccessGif = ({ size = "default", className = "" }) => {
  return (
    <GifPlayer
      src="https://media.giphy.com/media/4T7e4DmcrP9du/giphy.gif"
      alt="Success celebration animation"
      title="Success!"
      size={size}
      controls={false}
      className={className}
    />
  );
};

export default GifPlayer;
