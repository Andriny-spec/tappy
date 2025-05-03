"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
  color: string;
  icon: React.ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  suffix = '',
  prefix = '',
  delay = 0,
  duration = 2000,
  color,
  icon
}) => {
  const [isValueVisible, setIsValueVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsValueVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);
  
  const { number } = useSpring({
    from: { number: 0 },
    number: isValueVisible ? value : 0,
    delay,
    config: { duration },
  });
  
  return (
    <div ref={itemRef} className="relative p-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay / 1000 }}
        className="p-6 md:p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 h-full"
      >
        {/* Background glow */}
        <div 
          className={`absolute -inset-1 rounded-2xl opacity-30 blur-xl z-0`}
          style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
        />
        
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10"
          style={{ backgroundColor: `${color}20` }}
        >
          <div className="text-white">
            {icon}
          </div>
        </div>
        
        {/* Counter */}
        <div className="relative z-10 mb-2">
          <animated.h3 
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ color }}
          >
            {number.to(n => `${prefix}${Math.floor(n).toLocaleString()}${suffix}`)}
          </animated.h3>
        </div>
        
        {/* Label */}
        <p className="text-lg text-gray-300 relative z-10">{label}</p>
      </motion.div>
    </div>
  );
};

interface StatsCounterProps {
  stats: StatItemProps[];
  title: string;
  description: string;
}

export function StatsCounter({ stats, title, description }: StatsCounterProps) {
  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-tappyGreen/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {title.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 2 ? (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    {word}{' '}
                  </span>
                ) : (
                  `${word} `
                )}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              {...stat}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
