"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: string;
  onSelectProduct: (productId: string) => void;
}

export function ProductSelector({ products, selectedProduct, onSelectProduct }: ProductSelectorProps) {
  return (
    <div className="mx-auto max-w-2xl bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-700 flex overflow-hidden">
      {products.map((product) => {
        const isSelected = product.id === selectedProduct;
        
        return (
          <button
            key={product.id}
            className={`relative flex-1 flex justify-center items-center py-3 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => onSelectProduct(product.id)}
          >
            {isSelected && (
              <motion.div
                className={`absolute inset-0 rounded-full ${product.color}`}
                layoutId="productSelector"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            
            <span className="relative flex items-center z-10">
              <img 
                src={product.icon} 
                alt={product.name} 
                className="h-5 w-5 mr-2" 
              />
              {product.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
