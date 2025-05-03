"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  companyLogoUrl?: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  avatarUrl,
  companyLogoUrl,
  className = "",
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white dark:bg-gray-900 rounded-2xl px-6 py-8 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0px_10px_30px_rgba(0,0,0,0.2)] overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-tappyGreen/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-tappyGreen/5 rounded-full blur-2xl" />
      
      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-tappyGreen/10 dark:text-tappyGreen/20">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">"{quote}"</p>
        
        <div className="flex items-center">
          {avatarUrl ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md mr-4">
              <Image 
                src={avatarUrl} 
                alt={author} 
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-tappyGreen/30 to-tappyGreen/10 flex items-center justify-center text-tappyGreen text-xl font-bold mr-4">
              {author.charAt(0)}
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">{author}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{role}, {company}</p>
              </div>
              
              {companyLogoUrl && (
                <div className="relative w-16 h-8">
                  <Image 
                    src={companyLogoUrl} 
                    alt={company} 
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative border */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-tappyGreen/80 via-tappyGreen to-tappyGreen/60" />
    </motion.div>
  );
};
