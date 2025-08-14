import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  const baseClasses = `
    bg-background border border-gray-200 dark:border-gray-700 
    rounded-xl shadow-sm transition-all duration-200
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};