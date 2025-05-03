"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

interface RotatingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  frontColor?: string;
  backColor?: string;
  className?: string;
}

export const RotatingCard: React.FC<RotatingCardProps> = ({
  title,
  description,
  icon,
  frontColor = "from-white to-gray-50",
  backColor = "from-tappyGreen/80 to-tappyGreen",
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={`relative w-full h-80 perspective-1000 ${className}`}>
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={isFlipped ? "back" : "front"}
        variants={cardVariants}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <Tilt
          options={{
            max: 15,
            scale: 1,
            speed: 450,
            transition: true,
            reset: true,
            easing: "cubic-bezier(.03,.98,.52,.99)",
          }}
          className="absolute w-full h-full backface-hidden"
        >
          <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${frontColor} p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center border border-gray-100 dark:border-gray-800 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-shadow duration-300`}>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center mb-6 shadow-inner">
              {icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{description}</p>
            
            <div className="mt-6 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-tappyGreen group-hover:rotate-45 transition-transform duration-300"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
        </Tilt>

        {/* Back Side */}
        <div className={`absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br ${backColor} p-8 flex flex-col items-center justify-center text-center text-white rotate-y-180 shadow-[0_10px_30px_rgba(0,0,0,0.2)]`}>
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="mb-6">{description}</p>
          <button className="py-2 px-6 rounded-full bg-white text-tappyGreen font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Saiba mais
          </button>
          
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/30 backdrop-blur-sm cursor-pointer hover:bg-white/50 transition-colors duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
