"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  title?: string;
  description?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start = 0,
  end,
  duration = 2.5,
  prefix = "",
  suffix = "",
  className = "",
  title,
  description,
}) => {
  const [count, setCount] = useState(start);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, amount: 0.5 });
  const animationStarted = useRef(false);

  useEffect(() => {
    if (isInView && !animationStarted.current) {
      animationStarted.current = true;
      
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * (end - start) + start);
        
        setCount(currentCount);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, start, end, duration]);

  return (
    <div ref={countRef} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-2">
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/80">
            {prefix}
            {count.toLocaleString()}
            {suffix}
          </span>
        </div>
        
        {title && (
          <h3 className="text-xl md:text-2xl font-bold mb-1">{title}</h3>
        )}
        
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{description}</p>
        )}
      </motion.div>
      
      {/* Decorative Element */}
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[120%] max-h-[120%]">
        <div className="absolute inset-0 rounded-full bg-tappyGreen/5 blur-xl"></div>
      </div>
    </div>
  );
};
