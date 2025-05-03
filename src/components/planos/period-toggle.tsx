"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PeriodToggleProps {
  selectedPeriod: 'monthly' | 'yearly';
  onPeriodChange: (period: 'monthly' | 'yearly') => void;
  discount?: number;
}

export function PeriodToggle({ selectedPeriod, onPeriodChange, discount = 20 }: PeriodToggleProps) {
  return (
    <div className="inline-flex flex-col items-center">
      <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
        <button
          onClick={() => onPeriodChange('monthly')}
          className={`relative rounded-full py-2 px-5 text-sm font-medium ${
            selectedPeriod === 'monthly'
              ? 'text-white'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {selectedPeriod === 'monthly' && (
            <motion.div
              className="absolute inset-0 bg-tappyGreen rounded-full"
              layoutId="periodToggle"
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">Mensal</span>
        </button>
        
        <button
          onClick={() => onPeriodChange('yearly')}
          className={`relative rounded-full py-2 px-5 text-sm font-medium ${
            selectedPeriod === 'yearly'
              ? 'text-white'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {selectedPeriod === 'yearly' && (
            <motion.div
              className="absolute inset-0 bg-tappyGreen rounded-full"
              layoutId="periodToggle"
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">Anual</span>
        </button>
      </div>
      
      {selectedPeriod === 'yearly' && (
        <div className="mt-2 text-xs font-medium bg-gradient-to-r from-tappyGreen to-tappyGreen/80 text-white py-1 px-3 rounded-full animate-pulse">
          Economize {discount}% no plano anual
        </div>
      )}
    </div>
  );
}
