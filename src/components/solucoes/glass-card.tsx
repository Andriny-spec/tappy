"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface GlassCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkUrl: string;
  className?: string;
  gradientColors?: string;
  features?: string[];
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  description,
  icon,
  linkUrl,
  className = "",
  gradientColors = "from-tappyGreen/30 to-tappyGreen/5",
  features,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Update light position even when document scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current && isHovered) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition(prev => ({
          x: prev.x,
          y: prev.y - window.scrollY,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Glass effect with border */}
      <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border border-white/20 dark:border-gray-800/30 rounded-2xl z-0" />
      
      {/* Dynamic lighting effect */}
      <div 
        className="absolute -inset-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(3, 252, 174, 0.4) 0%, transparent 50%)`
            : "none",
          opacity: isHovered ? 0.3 : 0,
        }}
      />
      
      {/* Shine effect on edge */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.2) 25%, transparent 50%)`
            : "none",
          opacity: isHovered ? 0.5 : 0,
          transform: "translateX(-100%)",
          animation: isHovered ? "shine 1.5s infinite" : "none",
        }}
      />
      
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-40 z-0`} />
      
      {/* Content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="w-16 h-16 rounded-2xl bg-white/20 dark:bg-gray-900/40 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30 dark:border-gray-800/30 shadow-inner">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        
        {features && features.length > 0 && (
          <ul className="mb-8 space-y-2 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tappyGreen mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        <Link 
          href={linkUrl}
          className={`mt-auto inline-flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium transition-colors duration-300 ${
            isHovered 
              ? "bg-tappyGreen text-white" 
              : "bg-white/20 dark:bg-gray-900/40 backdrop-blur-sm text-gray-900 dark:text-white hover:bg-tappyGreen/80 hover:text-white"
          }`}
        >
          <span>Saiba mais</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      
      {/* Add a subtle hover border effect */}
      <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300 ${isHovered ? "border-tappyGreen/30" : ""}`} />
    </motion.div>
  );
};
