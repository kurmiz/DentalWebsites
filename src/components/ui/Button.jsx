import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  asChild = false, 
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? motion.div : motion.button;
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "hover:bg-gray-100 text-gray-700",
    destructive: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };
