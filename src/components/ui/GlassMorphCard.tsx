
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassMorphCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  dark?: boolean;
}

const GlassMorphCard: React.FC<GlassMorphCardProps> = ({ 
  children, 
  className, 
  onClick, 
  hover = true,
  dark = false
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        dark ? 'glass-dark' : 'glass',
        'rounded-xl p-6',
        hover ? 'cursor-pointer transition-all duration-300 hover:shadow-xl' : '',
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassMorphCard;
