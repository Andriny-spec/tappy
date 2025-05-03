"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FloatingCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  delay?: number;
  className?: string;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  title = "Pronto para transformar seu negócio?",
  description = "Agende uma demonstração gratuita e descubra como a Tappy pode alavancar seus resultados.",
  buttonText = "Falar com especialista",
  buttonLink = "#contato",
  delay = 3000,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // Show the CTA after specified delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasBeenShown(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 100, x: "-50%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className={`fixed bottom-8 left-1/2 transform z-50 ${className}`}
        >
          <div className="relative">
            {/* Main CTA Container */}
            <motion.div
              layout
              className={`rounded-2xl bg-white dark:bg-gray-900 shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-6 max-w-md border border-gray-100 dark:border-gray-800 overflow-hidden`}
              style={{
                boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
              }}
            >
              {/* Glow Effects */}
              <div className="absolute -left-20 -top-20 w-40 h-40 bg-tappyGreen/20 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-tappyGreen/20 rounded-full blur-3xl opacity-50"></div>
              
              {/* Content */}
              <AnimatePresence mode="wait">
                {!isMinimized ? (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{title}</h3>
                      <div className="flex gap-1">
                        <button
                          onClick={toggleMinimize}
                          className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <button
                          onClick={handleClose}
                          className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
                    <div className="flex justify-center">
                      <Button
                        className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8 py-6 text-base font-medium"
                        asChild
                      >
                        <a href={buttonLink}>
                          {buttonText}
                          <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="minimized"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex items-center gap-3"
                    onClick={toggleMinimize}
                  >
                    <div className="w-10 h-10 rounded-full bg-tappyGreen/20 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tappyGreen" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-medium">Clique para falar com um especialista</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Pulse animation when minimized */}
            {isMinimized && (
              <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
                <span className="absolute w-3 h-3 rounded-full bg-tappyGreen animate-ping opacity-75"></span>
                <span className="relative block w-3 h-3 rounded-full bg-tappyGreen"></span>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Trigger button to reopen if it was closed */}
      <AnimatePresence>
        {!isVisible && hasBeenShown && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={() => setIsVisible(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-tappyGreen text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-tappyGreen/90 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
