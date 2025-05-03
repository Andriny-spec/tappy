"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration?: string;
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  items,
  className = "",
}) => {
  const [activeItem, setActiveItem] = useState<number>(1);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-tappyGreen/20 via-tappyGreen/60 to-tappyGreen/20 z-0" />

        {/* Timeline Items */}
        <div className="relative z-10">
          {items.map((item, index) => {
            const isActive = item.id === activeItem;
            const isHovered = item.id === hoveredItem;
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.id}
                className={`relative mb-12 md:mb-16`}
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  {/* Content Box - Always on left for mobile, alternating for desktop */}
                  <motion.div 
                    className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-last md:pl-12'}`}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={`p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-t border-l border-white/30 dark:border-gray-800/30 ${isActive ? 'shadow-tappyGreen/20' : ''} ${isHovered ? 'shadow-tappyGreen/10' : ''}`}
                      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(3, 252, 174, 0.15)" }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => setActiveItem(item.id)}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      {item.duration && (
                        <p className="text-sm text-tappyGreen mb-3">{item.duration}</p>
                      )}
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </motion.div>
                  </motion.div>

                  {/* Timeline Dot and Icon */}
                  <div 
                    className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 mt-6 md:mt-0 ${isEven ? 'md:translate-y-0' : 'md:translate-y-0'}`}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-tappyGreen text-white scale-110' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'} ${isHovered ? 'scale-105' : ''}`}
                      animate={{ 
                        backgroundColor: isActive ? "rgb(3, 252, 174)" : "#f3f4f6",
                        color: isActive ? "#ffffff" : "#6b7280",
                        scale: isActive ? 1.1 : isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Empty div for layout on mobile, and to balance the timeline on desktop */}
                  <div className={`hidden md:block md:w-1/2`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Content Preview */}
      <AnimatePresence mode="wait">
        {activeItem && (
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-10 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center flex-shrink-0">
                {items.find(item => item.id === activeItem)?.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  {items.find(item => item.id === activeItem)?.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {items.find(item => item.id === activeItem)?.description}
                </p>
                
                <div className="mt-4">
                  <button className="py-2 px-4 bg-tappyGreen text-white rounded-lg hover:bg-tappyGreen/90 transition-colors duration-300">
                    Saiba mais
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
