"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';

interface SolutionFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

interface SolutionCardGridProps {
  features: SolutionFeature[];
}

export const SolutionCardGrid: React.FC<SolutionCardGridProps> = ({ features }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.feature-card');
      
      gsap.fromTo(
        cards,
        { 
          y: 30, 
          opacity: 0, 
          scale: 0.9,
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.1, 
          duration: 0.5, 
          ease: "power2.out" 
        }
      );
    }
  }, [isInView]);

  return (
    <div ref={gridRef} className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 opacity-0"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-tappyGreen/10 to-transparent rounded-bl-[100px] -z-0" />
            
            <div className="p-6 md:p-8 relative z-10">
              <div className="w-14 h-14 mb-5 rounded-lg bg-tappyGreen/10 flex items-center justify-center text-tappyGreen">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
              
              <Link 
                href="#"
                className="inline-flex items-center text-tappyGreen font-medium hover:underline"
              >
                <span>Saiba mais</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tappyGreen to-transparent opacity-50" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
