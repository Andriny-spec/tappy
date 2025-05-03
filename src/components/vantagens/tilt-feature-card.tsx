"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface TiltFeatureCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  bgGradient: string;
  index: number;
}

export function TiltFeatureCard({ title, description, icon, iconBg, bgGradient, index }: TiltFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.transition = 'transform 0.1s ease';
    };
    
    const handleMouseLeave = () => {
      if (!card) return;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative group h-full cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{ 
          background: bgGradient,
          transform: 'translateZ(-10px)',
          filter: 'blur(8px) opacity(0.4)',
          transition: 'all 0.5s ease' 
        }}
      />
      
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm bg-black/40 p-8">
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: iconBg }}
        >
          <div className="w-8 h-8 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
        
        {/* Highlight line */}
        <div 
          className="absolute bottom-0 left-0 h-1 w-full opacity-50"
          style={{ 
            background: bgGradient,
            transform: 'scaleX(0.2)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
          }}
        />
        
        {/* Card shine effect */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundSize: '200% 200%',
            animation: 'shine 4s linear infinite',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
