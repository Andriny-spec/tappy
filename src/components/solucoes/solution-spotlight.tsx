"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

interface SolutionSpotlightProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc: string;
  ctaText: string;
  ctaLink: string;
  color: string;
  reverse?: boolean;
  index: number;
}

export const SolutionSpotlight: React.FC<SolutionSpotlightProps> = ({
  title,
  subtitle,
  description,
  features,
  imageSrc,
  ctaText,
  ctaLink,
  color,
  reverse = false,
  index,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation variants for content
  const contentVariants = {
    hidden: {
      opacity: 0,
      x: reverse ? 50 : -50,
      y: 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for features
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Color classes based on the provided color
  type ColorOption = 'green' | 'blue' | 'purple';
  type ColorClasses = {
    button: string;
    gradient: string;
    border: string;
    text: string;
    highlight: string;
    glow: string;
  };

  const colorMap: Record<ColorOption, ColorClasses> = {
    green: {
      button: "bg-tappyGreen hover:bg-tappyGreen/80 text-white",
      gradient: "from-tappyGreen/20 to-tappyGreen/5",
      border: "border-tappyGreen/20",
      text: "text-tappyGreen",
      highlight: "bg-tappyGreen/10 text-tappyGreen",
      glow: "bg-tappyGreen/30",
    },
    blue: {
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      gradient: "from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/20",
      text: "text-blue-500",
      highlight: "bg-blue-500/10 text-blue-500",
      glow: "bg-blue-500/30",
    },
    purple: {
      button: "bg-purple-500 hover:bg-purple-600 text-white",
      gradient: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/20",
      text: "text-purple-500",
      highlight: "bg-purple-500/10 text-purple-500",
      glow: "bg-purple-500/30",
    },
  };

  // Use a default (green) if an invalid color is provided
  const colorClasses = colorMap[color as ColorOption] || colorMap.green;

  // Use GSAP for more advanced animations when in view
  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const featuresElements = section.querySelectorAll('.feature-item');

    if (isInView) {
      // Animate the glow effect
      gsap.to(section.querySelector('.animated-glow'), {
        opacity: 0.5,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Animate the features
      gsap.fromTo(
        featuresElements,
        { 
          opacity: 0, 
          x: reverse ? 20 : -20 
        },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.15, 
          duration: 0.4, 
          ease: "power2.out" 
        }
      );
    }
  }, [isInView, reverse]);

  const staggerDelay = index * 0.2; // Stagger the animations between sections

  return (
    <motion.div
      ref={sectionRef}
      className={`relative py-16 md:py-28 overflow-hidden ${index % 2 === 1 ? 'bg-gray-50/70 dark:bg-gray-900/30' : ''}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            delay: staggerDelay,
            duration: 0.5 
          }
        }
      }}
    >
      {/* Background elements */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-60`} />
      <div className={`animated-glow absolute ${reverse ? 'left-1/4' : 'right-1/4'} top-1/3 w-64 h-64 rounded-full ${colorClasses.glow} blur-3xl opacity-0`} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}>
          
          {/* Content Section */}
          <motion.div
            ref={contentRef}
            className="w-full md:w-1/2"
            variants={contentVariants}
          >
            <motion.span 
              className={`inline-block py-1.5 px-4 mb-4 rounded-full text-sm font-medium ${colorClasses.highlight}`}
              variants={featureVariants}
            >
              {subtitle}
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              variants={featureVariants}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              variants={featureVariants}
            >
              {description}
            </motion.p>
            
            <motion.ul className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className="feature-item flex items-start opacity-0"
                >
                  <div className={`p-1 rounded-full ${colorClasses.highlight} mr-3 mt-0.5`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div variants={featureVariants}>
              <Link href={ctaLink}>
                <Button 
                  size="lg" 
                  className={`${colorClasses.button} rounded-full px-8 py-6 text-base`}
                >
                  {ctaText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div
            ref={imageRef}
            className="w-full md:w-1/2"
            initial={{ 
              opacity: 0, 
              x: reverse ? -50 : 50,
              y: 20,
            }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              y: 0,
              transition: { 
                delay: 0.3 + staggerDelay, 
                duration: 0.7, 
                ease: [0.25, 0.1, 0.25, 1.0] 
              }
            } : {}}
          >
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${colorClasses.border} border-2 transform hover:scale-[1.02] transition-transform duration-500`}>
              <div className="aspect-[4/3] w-full relative">
                <Image 
                  src={imageSrc} 
                  alt={title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Decorative elements */}
              <div className={`absolute -bottom-6 -right-6 w-32 h-32 ${colorClasses.glow} rounded-full blur-2xl opacity-80`}></div>
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent opacity-60`}></div>
              
              {/* Optional caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-white text-lg font-medium">{title}</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
};
