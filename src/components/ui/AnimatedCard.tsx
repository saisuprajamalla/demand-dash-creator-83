
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  hover?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className, 
  onClick, 
  delay = 0,
  hover = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'bg-white rounded-xl p-6 shadow-sm',
        hover ? 'cursor-pointer transition-all duration-300 hover:shadow-xl' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
