"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";

interface AnimatedFeatureProps {
  title: string;
  description: string;
  animationData: any;
  reverse?: boolean;
  className?: string;
  features?: string[];
}

export const AnimatedFeature: React.FC<AnimatedFeatureProps> = ({
  title,
  description,
  animationData,
  reverse = false,
  className = "",
  features,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (isInView && animationRef.current) {
      // Play animation when in view
      animationRef.current.play();
    }
  }, [isInView]);

  return (
    <div 
      ref={ref}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 ${className}`}
    >
      {/* Animation Side */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 50 : -50 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 bg-tappyGreen/10 rounded-full filter blur-3xl opacity-70" />
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={false}
            lottieRef={animationRef}
            className="w-full h-full"
          />
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? -50 : 50 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
            {title}
          </span>
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          {description}
        </p>

        {features && features.length > 0 && (
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="mr-3 mt-1 w-6 h-6 rounded-full bg-tappyGreen/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-tappyGreen" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{feature}</p>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button className="py-2 px-6 rounded-full bg-tappyGreen/10 text-tappyGreen hover:bg-tappyGreen hover:text-white transition-all duration-300 flex items-center">
            <span>Saiba mais</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
