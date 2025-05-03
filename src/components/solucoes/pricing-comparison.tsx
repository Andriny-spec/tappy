"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PlanFeature {
  name: string;
  included: {
    [key: string]: boolean | string | number;
  };
  highlight?: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string | number;
  description: string;
  highlight?: boolean;
  cta: string;
  ctaLink: string;
}

interface PricingComparisonProps {
  plans: PricingPlan[];
  features: PlanFeature[];
  className?: string;
  yearly?: boolean;
}

export const PricingComparison: React.FC<PricingComparisonProps> = ({
  plans,
  features,
  className = "",
  yearly = false,
}) => {
  const [isYearly, setIsYearly] = useState(yearly);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-10">
        <span className={`mr-3 text-sm font-medium ${!isYearly ? "text-tappyGreen" : "text-gray-500 dark:text-gray-400"}`}>Mensal</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isYearly ? "translate-x-6" : "translate-x-1"}`}
          />
          <span
            className={`absolute inset-0 rounded-full ${isYearly ? "bg-tappyGreen" : "bg-gray-200 dark:bg-gray-700"} transition-colors duration-300`}
          />
          <span
            className={`absolute inset-0 rounded-full ${isYearly ? "bg-tappyGreen" : "bg-gray-200 dark:bg-gray-700"} transition-colors duration-300`}
          >
            <span className="sr-only">Toggle Yearly Billing</span>
          </span>
        </button>
        <span className={`ml-3 text-sm font-medium ${isYearly ? "text-tappyGreen" : "text-gray-500 dark:text-gray-400"}`}>
          Anual <span className="bg-tappyGreen/10 text-tappyGreen rounded-full px-2 py-0.5 text-xs font-medium ml-1">-20%</span>
        </span>
      </div>

      {/* Pricing Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
          {/* Table Header - Plan names and prices */}
          <thead>
            <tr>
              <th className="py-6 px-8 text-left bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-medium text-sm">
                <span className="sr-only">Feature</span>
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className={`relative py-8 px-6 text-center bg-white dark:bg-gray-900 border-b ${
                    plan.highlight ? "border-tappyGreen" : "border-gray-200 dark:border-gray-700"
                  }`}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-tappyGreen" />
                  )}
                  <div className={`transition-all duration-300 ${hoveredPlan === plan.id ? "scale-105" : ""}`}>
                    <p className="text-lg font-bold">{plan.name}</p>
                    <p className="mt-2 mb-4">
                      <span className="text-4xl font-bold">
                        {typeof plan.price === "number"
                          ? new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              minimumFractionDigits: 0,
                            }).format(
                              isYearly ? (plan.price * 12 * 0.8) : plan.price
                            )
                          : plan.price}
                      </span>
                      {typeof plan.price === "number" && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          /{isYearly ? "ano" : "mês"}
                        </span>
                      )}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                      {plan.description}
                    </p>
                    <Button
                      className={`rounded-full px-6 w-full ${
                        plan.highlight
                          ? "bg-tappyGreen hover:bg-tappyGreen/90 text-white"
                          : "bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-tappyGreen hover:text-tappyGreen"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Body - Features */}
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {features.map((feature, index) => (
              <tr 
                key={index} 
                className={`${
                  feature.highlight 
                    ? "bg-tappyGreen/5" 
                    : index % 2 === 0 
                      ? "bg-white dark:bg-gray-900" 
                      : "bg-gray-50 dark:bg-gray-900/50"
                }`}
              >
                <td className="py-4 px-8 text-left text-sm font-medium border-r border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    {feature.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-tappyGreen mr-2" />
                    )}
                    {feature.name}
                  </div>
                </td>
                {plans.map((plan) => {
                  const value = feature.included[plan.id];
                  return (
                    <td 
                      key={`${feature.name}-${plan.id}`} 
                      className={`py-4 px-6 text-center text-sm border-r border-gray-200 dark:border-gray-700 last:border-r-0 ${
                        hoveredPlan === plan.id
                          ? "bg-tappyGreen/5"
                          : ""
                      }`}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-tappyGreen/10 text-tappyGreen mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )
                      ) : (
                        <span className={`${
                          hoveredPlan === plan.id
                            ? "text-tappyGreen font-medium"
                            : "text-gray-700 dark:text-gray-300"
                        }`}>
                          {value}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Disclaimer */}
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        Todos os planos incluem suporte básico e atualizações gratuitas. Para necessidades específicas, entre em contato.
      </p>
    </div>
  );
};
