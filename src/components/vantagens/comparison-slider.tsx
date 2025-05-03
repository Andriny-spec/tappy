"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
  description: string;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  title,
  description
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Animação automática inicial
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ 
        x: '0%',
        transition: { duration: 1.5, ease: 'easeInOut' } 
      });
      await controls.start({ 
        x: '100%',
        transition: { duration: 1.5, ease: 'easeInOut' } 
      });
      await controls.start({ 
        x: '50%',
        transition: { duration: 0.8, ease: 'easeOut' } 
      });
    };
    
    sequence();
  }, [controls]);
  
  // Funções para controlar o slider
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleTouchMove(e);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(position);
    controls.set({ x: `${position}%` });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const touch = e.touches[0];
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(position);
    controls.set({ x: `${position}%` });
  };
  
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalTouchEnd = () => setIsDragging(false);
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 max-w-2xl mx-auto">{description}</p>
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl cursor-col-resize bg-gray-900"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Before Image */}
        <div className="absolute inset-0 z-10">
          <Image
            src={beforeImage}
            alt="Antes"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-0 left-0 p-4 bg-black/60 text-white text-sm md:text-base font-medium z-20 rounded-tr-lg">
            {beforeLabel}
          </div>
        </div>
        
        {/* After Image - This will be clipped based on slider position */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-[100vw] h-full">
            <Image
              src={afterImage}
              alt="Depois"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute bottom-0 right-0 p-4 bg-tappyGreen/90 text-white text-sm md:text-base font-medium z-20 rounded-tl-lg">
              {afterLabel}
            </div>
          </div>
        </div>
        
        {/* Slider Control */}
        <motion.div 
          className="absolute top-0 bottom-0 w-1 bg-white z-30 cursor-col-resize"
          style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
          animate={controls}
          drag="x"
          dragConstraints={sliderRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={(_, info) => {
            if (!sliderRef.current) return;
            const rect = sliderRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(info.point.x - rect.left, rect.width));
            const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setSliderPosition(position);
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border-3 border-white bg-tappyGreen flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white transform rotate-90" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
