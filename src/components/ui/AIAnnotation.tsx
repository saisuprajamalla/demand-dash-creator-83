
import React, { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIAnnotationProps {
  children: ReactNode;
  title?: string;
}

const AIAnnotation: React.FC<AIAnnotationProps> = ({ 
  children, 
  title = "featureBox AI" 
}) => {
  return (
    <motion.div 
      className="relative border border-blue-200 rounded-lg p-4 my-4 bg-blue-50/50"
      initial={{ opacity: 0.9, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -top-3 left-3 bg-blue-100 px-2 py-0.5 rounded-md flex items-center">
        <Sparkles className="w-4 h-4 text-blue-500 mr-1" />
        <span className="text-xs font-medium text-blue-700">{title}</span>
      </div>
      {children}
    </motion.div>
  );
};

export default AIAnnotation;
