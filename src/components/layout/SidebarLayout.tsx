
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

interface SidebarLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, sidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sidebar toggle button that sticks to the side
  const SidebarToggle = () => (
    <div 
      className={cn(
        "fixed top-1/2 transform -translate-y-1/2 z-30",
        isSidebarOpen ? "left-[280px] md:left-[300px]" : "left-0"
      )}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-white rounded-full shadow-md p-2 border border-gray-200 text-gray-700"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </motion.button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={isSidebarOpen} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && sidebar && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "w-[280px] md:w-[300px] shrink-0 border-r border-border/40 bg-sidebar overflow-y-auto p-4",
                isMobile ? "fixed inset-y-0 mt-16 z-40" : "relative"
              )}
            >
              {sidebar}
            </motion.aside>
          )}
        </AnimatePresence>
        
        {/* Main content with conditional margin */}
        <motion.main 
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300",
            isSidebarOpen && !isMobile ? "ml-0" : "ml-0"
          )}
          animate={{ 
            marginLeft: isSidebarOpen && !isMobile ? 0 : 0,
            transition: { duration: 0.3 }
          }}
        >
          {children}
        </motion.main>

        {/* Overlay for mobile when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Sidebar toggle */}
      {sidebar && <SidebarToggle />}
    </div>
  );
};

export default SidebarLayout;
