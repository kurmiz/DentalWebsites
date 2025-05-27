import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

const VideoPlayer = ({ 
  src, 
  title, 
  description, 
  thumbnail, 
  autoplay = false,
  muted = true,
  controls = true,
  className = "",
  overlayInfo = null,
  features = null
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // YouTube embed component
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    const getYouTubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(src);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&showinfo=0&rel=0&modestbranding=1`;

    return (
      <div className={`relative rounded-2xl shadow-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}>
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        
        {overlayInfo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="text-white">
              <h3 className="text-lg font-semibold mb-2">{overlayInfo.title}</h3>
              <p className="text-sm text-gray-200">{overlayInfo.description}</p>
            </div>
          </div>
        )}
        
        {features && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} p-4 rounded-xl`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${feature.iconBg} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{feature.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Custom video player for direct video files
  return (
    <div 
      ref={containerRef}
      className={`relative rounded-2xl shadow-2xl overflow-hidden bg-gray-900 group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnail}
        muted={isMuted}
        autoPlay={autoplay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/20 flex items-center justify-center"
      >
        {/* Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white ml-1" />
          )}
        </motion.button>

        {/* Bottom Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMute}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5 text-white" />
            ) : (
              <Maximize className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Video Info Overlay */}
      {overlayInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-2">{overlayInfo.title}</h3>
            <p className="text-sm text-gray-200">{overlayInfo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Dental Care Video Component
export const DentalCareVideo = ({ className = "" }) => {
  return (
    <VideoPlayer
      src="https://www.youtube.com/watch?v=mstDOr6NGXE"
      title="Professional Dental Care - Modern Dental Procedures and Patient Care"
      autoplay={false}
      muted={true}
      controls={true}
      className={className}
      overlayInfo={{
        title: "Modern Dental Care Excellence",
        description: "Discover our state-of-the-art facilities and advanced dental procedures"
      }}
      features={[
        {
          icon: ({ className }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ),
          title: "Safe Procedures",
          subtitle: "Advanced sterilization",
          bgColor: "bg-primary-50 dark:bg-primary-900/20",
          iconBg: "bg-primary-600"
        },
        {
          icon: ({ className }) => (
            <svg className={className} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ),
          title: "Expert Care",
          subtitle: "15+ years experience",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          iconBg: "bg-green-600"
        }
      ]}
    />
  );
};

export default VideoPlayer;
