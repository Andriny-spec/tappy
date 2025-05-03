"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Location {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [x, y] percentages for positioning
  description: string;
  employees?: number;
  year?: string;
}

interface GlobalPresenceProps {
  locations: Location[];
  className?: string;
}

export const GlobalPresence: React.FC<GlobalPresenceProps> = ({
  locations,
  className = "",
}) => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const handleLocationClick = (id: string) => {
    setActiveLocation(id === activeLocation ? null : id);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="aspect-[16/9] w-full relative bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[10px_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[10px_10px_30px_rgba(0,0,0,0.2)]">
        {/* World Map Background - Here we're using a decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 bg-[url('/world-map-dots.svg')] bg-no-repeat bg-center bg-contain opacity-20 dark:opacity-10" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          {/* Ocean effect */}
          <div className="absolute inset-0 bg-tappyGreen/5 z-0" />
          
          {/* Continents simplified outline */}
          <div className="absolute inset-0 bg-[url('/world-continents.svg')] bg-no-repeat bg-center bg-contain opacity-10 dark:opacity-20" />
        </div>
        
        {/* Location Markers */}
        {locations.map((location) => {
          const isActive = location.id === activeLocation;
          const isHovered = location.id === hoveredLocation;
          
          return (
            <div
              key={location.id}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${location.coordinates[0]}%`,
                top: `${location.coordinates[1]}%`,
              }}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              onClick={() => handleLocationClick(location.id)}
            >
              {/* Pulse Animation */}
              <div className={`absolute -inset-4 ${isActive || isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <div className="absolute inset-0 rounded-full bg-tappyGreen/20 animate-ping" />
              </div>
              
              {/* Marker */}
              <motion.div
                className={`w-5 h-5 rounded-full bg-tappyGreen cursor-pointer z-10 flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-150' : isHovered ? 'scale-125' : 'scale-100'}`}
                whileHover={{ scale: 1.25 }}
                animate={{ 
                  scale: isActive ? 1.5 : isHovered ? 1.25 : 1,
                  boxShadow: isActive || isHovered ? "0 0 0 4px rgba(3, 252, 174, 0.3)" : "none"
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white text-xs font-bold">{locations.findIndex(loc => loc.id === location.id) + 1}</span>
              </motion.div>
              
              {/* Tooltip */}
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 transition-all duration-300 ${
                  isActive || isHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <p className="font-bold text-sm">{location.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{location.country}</p>
                {location.year && (
                  <p className="text-tappyGreen text-xs mt-1">Desde {location.year}</p>
                )}
                {location.employees && (
                  <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">{location.employees} colaboradores</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Active Location Details */}
      <motion.div
        className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-[5px_5px_15px_#d9d9d9,-5px_-5px_15px_#ffffff] dark:shadow-[5px_5px_15px_#1a1a1a,-5px_-5px_15px_#2e2e2e] transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: activeLocation ? 1 : 0,
          y: activeLocation ? 0 : 20,
          height: activeLocation ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {activeLocation && (
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  {locations.find(loc => loc.id === activeLocation)?.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {locations.find(loc => loc.id === activeLocation)?.country}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-tappyGreen/10 flex items-center justify-center">
                <span className="text-tappyGreen font-bold">
                  {locations.findIndex(loc => loc.id === activeLocation) + 1}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                {locations.find(loc => loc.id === activeLocation)?.description}
              </p>
              {locations.find(loc => loc.id === activeLocation)?.employees && (
                <p className="mt-4 text-tappyGreen font-medium">
                  {locations.find(loc => loc.id === activeLocation)?.employees} colaboradores
                </p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
