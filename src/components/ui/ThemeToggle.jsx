import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';

const ThemeToggle = ({ 
  variant = "icon", 
  size = "default", 
  showLabel = false,
  className = "" 
}) => {
  const { theme, toggleTheme } = useTheme();

  const themeConfig = {
    light: {
      icon: Sun,
      label: 'Light Mode',
      color: 'text-yellow-500',
      hoverColor: 'group-hover:text-yellow-400',
      bgGradient: 'from-yellow-400/10 to-orange-400/10'
    },
    dark: {
      icon: Moon,
      label: 'Dark Mode', 
      color: 'text-blue-400',
      hoverColor: 'group-hover:text-blue-300',
      bgGradient: 'from-blue-400/10 to-purple-400/10'
    }
  };

  const currentTheme = themeConfig[theme] || themeConfig.light;
  const IconComponent = currentTheme.icon;

  if (variant === "button") {
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={toggleTheme}
        className={`group relative overflow-hidden interactive-glow ${className}`}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <div className="relative z-10 flex items-center space-x-2">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent 
              className={`h-5 w-5 ${currentTheme.color} ${currentTheme.hoverColor} transition-colors duration-300`} 
            />
          </motion.div>
          {showLabel && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
              {currentTheme.label}
            </span>
          )}
        </div>
        
        {/* Animated background */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r ${currentTheme.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
          initial={false}
          animate={{ scale: theme === 'dark' ? [1, 1.1, 1] : [1, 0.9, 1] }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    );
  }

  // Icon variant (default)
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 interactive-glow group relative overflow-hidden ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            <IconComponent 
              className={`h-5 w-5 ${currentTheme.color} ${currentTheme.hoverColor} transition-colors duration-300`} 
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Subtle background animation */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-r ${currentTheme.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
        initial={false}
        animate={{ 
          scale: theme === 'dark' ? [1, 1.05, 1] : [1, 0.95, 1],
          rotate: theme === 'dark' ? [0, 5, 0] : [0, -5, 0]
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        animate={{ 
          boxShadow: theme === 'dark' 
            ? "0 0 0 0 rgba(59, 130, 246, 0.4)" 
            : "0 0 0 0 rgba(251, 191, 36, 0.4)"
        }}
        whileTap={{ 
          boxShadow: theme === 'dark'
            ? "0 0 0 8px rgba(59, 130, 246, 0)"
            : "0 0 0 8px rgba(251, 191, 36, 0)"
        }}
        transition={{ duration: 0.3 }}
      />
    </Button>
  );
};

// Advanced theme toggle with system preference option
export const AdvancedThemeToggle = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes = [
    { key: 'light', icon: Sun, label: 'Light', color: 'text-yellow-500' },
    { key: 'dark', icon: Moon, label: 'Dark', color: 'text-blue-400' },
    { key: 'system', icon: Monitor, label: 'System', color: 'text-gray-500' }
  ];

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
        aria-label="Theme options"
      >
        {React.createElement(
          themes.find(t => t.key === theme)?.icon || Sun,
          { className: `h-5 w-5 ${themes.find(t => t.key === theme)?.color || 'text-gray-500'}` }
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 glass-strong rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50"
          >
            {themes.map((themeOption) => {
              const IconComponent = themeOption.icon;
              return (
                <button
                  key={themeOption.key}
                  onClick={() => {
                    setTheme(themeOption.key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                    theme === themeOption.key
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 mr-3 ${themeOption.color}`} />
                  {themeOption.label}
                  {theme === themeOption.key && (
                    <motion.div
                      layoutId="activeTheme"
                      className="ml-auto w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
