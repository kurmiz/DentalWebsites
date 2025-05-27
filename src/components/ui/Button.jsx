import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  loading = false,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? motion.div : motion.button;

  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl border-0 focus:ring-primary-500",
    secondary: "bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 hover:border-primary-700 shadow-md hover:shadow-lg focus:ring-primary-500",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 focus:ring-primary-500 bg-transparent",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:ring-gray-500",
    destructive: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    success: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl focus:ring-yellow-500",
  };

  const sizes = {
    sm: "h-9 px-4 py-2 text-sm rounded-lg font-medium",
    default: "h-11 px-6 py-3 text-base rounded-xl font-medium",
    lg: "h-13 px-8 py-4 text-lg rounded-xl font-semibold",
    xl: "h-16 px-10 py-5 text-xl rounded-2xl font-bold",
    icon: "h-10 w-10 rounded-lg",
    "icon-sm": "h-8 w-8 rounded-md",
    "icon-lg": "h-12 w-12 rounded-xl",
  };

  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden";

  const hoverEffects = {
    primary: "hover:-translate-y-0.5 active:translate-y-0",
    secondary: "hover:-translate-y-0.5 active:translate-y-0",
    outline: "hover:-translate-y-0.5 active:translate-y-0",
    ghost: "hover:scale-105 active:scale-95",
    destructive: "hover:-translate-y-0.5 active:translate-y-0",
    success: "hover:-translate-y-0.5 active:translate-y-0",
    warning: "hover:-translate-y-0.5 active:translate-y-0",
  };

  return (
    <Comp
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        hoverEffects[variant],
        loading && "cursor-wait",
        className
      )}
      ref={ref}
      disabled={loading || props.disabled}
      whileHover={{ scale: variant === 'ghost' ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      {...props}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 bg-white/20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {children}
      </span>
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };
