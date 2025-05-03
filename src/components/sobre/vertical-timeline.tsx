"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

interface VerticalTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
  events,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-tappyGreen/20 via-tappyGreen/60 to-tappyGreen/20 z-0 transform sm:-translate-x-1/2" />

      <div className="relative z-10">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const isHighlight = event.highlight;
          
          return (
            <div 
              key={index}
              className="flex flex-col sm:flex-row items-start mb-12 relative"
            >
              <motion.div 
                className={`hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 z-10 ${isHighlight ? 'scale-125' : ''}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isHighlight ? 'bg-tappyGreen text-white' : 'bg-white dark:bg-gray-900 text-tappyGreen border border-tappyGreen/30'} shadow-xl`}>
                  {event.icon ? (
                    event.icon
                  ) : (
                    <span className="text-lg font-bold">{event.year}</span>
                  )}
                </div>
              </motion.div>

              {/* Mobile visible year marker */}
              <motion.div 
                className="sm:hidden flex-shrink-0 mr-4 ml-1 mt-1"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isHighlight ? 'bg-tappyGreen text-white' : 'bg-white dark:bg-gray-900 text-tappyGreen border border-tappyGreen/30'} shadow-lg`}>
                  {event.icon ? (
                    event.icon
                  ) : (
                    <span className="text-sm font-bold">{event.year}</span>
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <div className={`sm:w-1/2 ${isEven ? 'sm:pr-16 sm:text-right ml-10 sm:ml-0' : 'sm:pl-16 sm:text-left ml-10 sm:ml-0 sm:order-last'}`}>
                <motion.div
                  className={`p-6 rounded-xl bg-white dark:bg-gray-900 shadow-[5px_5px_15px_#d9d9d9,-5px_-5px_15px_#ffffff] dark:shadow-[5px_5px_15px_#1a1a1a,-5px_-5px_15px_#2e2e2e] ${isHighlight ? 'border-l-4 border-tappyGreen' : ''}`}
                  initial={{ opacity: 0, y: 20, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
                  {isHighlight && (
                    <div className="mt-4 h-1 w-12 bg-tappyGreen rounded-full mx-auto sm:mr-0 sm:ml-auto" />
                  )}
                </motion.div>
              </div>
              
              {/* Empty div for layout on desktop */}
              <div className={`hidden sm:block sm:w-1/2`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
