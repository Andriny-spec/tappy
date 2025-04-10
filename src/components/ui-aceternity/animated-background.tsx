"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function AnimatedBackground({
  className = "",
  primaryColor = "#17d300",
  secondaryColor = "#0070f3"
}: AnimatedBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Grade animada */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Círculos flutuantes animados */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5, x: "-20%", y: "-20%" }}
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.5, 0.8, 0.5],
          x: ["-20%", "-15%", "-20%"],
          y: ["-20%", "-25%", "-20%"]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-0 left-0 w-[30rem] h-[30rem] rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }}
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5, x: "20%", y: "20%" }}
        animate={{ 
          scale: [0.8, 1.3, 0.8],
          opacity: [0.5, 0.7, 0.5],
          x: ["20%", "15%", "20%"],
          y: ["20%", "25%", "20%"]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-0 right-0 w-[35rem] h-[35rem] rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)` }}
      />
      
      <motion.div
        initial={{ scale: 0.7, opacity: 0.4, x: "30%", y: "-15%" }}
        animate={{ 
          scale: [0.7, 1.1, 0.7],
          opacity: [0.4, 0.6, 0.4],
          x: ["30%", "25%", "30%"],
          y: ["-15%", "-10%", "-15%"]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-0 right-0 w-[25rem] h-[25rem] rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${primaryColor} 20%, ${secondaryColor} 100%)` }}
      />
      
      {/* Linhas de conexão animadas */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 0.5 }} />
          </linearGradient>
        </defs>
        <motion.path 
          d="M0,100 Q250,300 500,100 T1000,100" 
          fill="none" 
          stroke="url(#grad1)" 
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            d: [
              "M0,100 Q250,300 500,100 T1000,100",
              "M0,150 Q250,100 500,200 T1000,150",
              "M0,100 Q250,300 500,100 T1000,100"
            ]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}
