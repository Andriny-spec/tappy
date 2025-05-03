"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, HelpCircle, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
}

interface FeatureCategory {
  title: string;
  features: {
    name: string;
    description: string;
    availability: Record<string, boolean | string>;
  }[];
}

interface FeaturesComparisonProps {
  plans: Plan[];
  featureCategories: FeatureCategory[];
  productColor: string;
}

export function FeaturesComparison({ plans, featureCategories, productColor }: FeaturesComparisonProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
              <th className="text-left p-4 w-1/3 text-gray-500 dark:text-gray-400 font-medium text-sm">
                Recursos
              </th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-center p-4 font-medium">
                  <div className={`text-${productColor} dark:text-${productColor}/90 mb-1`}>{plan.name}</div>
                  <div className="text-gray-900 dark:text-white text-lg font-bold">
                    R$ {plan.price.toFixed(2)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Body */}
          <tbody>
            {featureCategories.map((category, categoryIndex) => {
              const isExpanded = expandedCategories[category.title] !== false;
              
              return (
                <React.Fragment key={categoryIndex}>
                  {/* Category header */}
                  <tr 
                    className="border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    onClick={() => toggleCategory(category.title)}
                  >
                    <td colSpan={plans.length + 1} className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Features */}
                  {isExpanded && category.features.map((feature, featureIndex) => (
                    <tr 
                      key={`${categoryIndex}-${featureIndex}`}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    >
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300 group relative">
                        <div className="flex items-center">
                          {feature.name}
                          {feature.description && (
                            <span className="ml-1 cursor-help">
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                              <div className="absolute z-10 left-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {feature.description}
                              </div>
                            </span>
                          )}
                        </div>
                      </td>
                      
                      {plans.map((plan) => {
                        const availability = feature.availability[plan.id];
                        let content;
                        
                        if (typeof availability === 'boolean') {
                          if (availability) {
                            content = (
                              <div className={`flex justify-center items-center w-8 h-8 mx-auto rounded-full bg-${productColor}/10`}>
                                <Check className={`h-5 w-5 text-${productColor}`} />
                              </div>
                            );
                          } else {
                            content = (
                              <div className="flex justify-center items-center w-8 h-8 mx-auto rounded-full bg-gray-100 dark:bg-gray-700">
                                <X className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                              </div>
                            );
                          }
                        } else {
                          content = (
                            <div className="text-sm text-center text-gray-700 dark:text-gray-300">
                              {availability}
                            </div>
                          );
                        }
                        
                        return (
                          <td key={`${feature.name}-${plan.id}`} className="p-4 text-center">
                            {content}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
