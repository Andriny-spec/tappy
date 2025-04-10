"use client";

import React from "react";
import { motion } from "framer-motion";

interface HighlightedTextProps {
  text: string;
  highlighted: string[];
  className?: string;
  highlightColor?: string;
}

export function HighlightedText({
  text,
  highlighted,
  className = "",
  highlightColor = "#17d300",
}: HighlightedTextProps) {
  // Função para identificar palavras destacadas
  const getHighlightedText = () => {
    const words = text.split(" ");
    
    return words.map((word, index) => {
      const isHighlighted = highlighted.some(highlight => 
        word.toLowerCase().includes(highlight.toLowerCase()));
      
      return (
        <React.Fragment key={index}>
          {index > 0 && " "}
          {isHighlighted ? (
            <motion.span
              initial={{ color: "currentColor" }}
              whileInView={{ color: highlightColor }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="font-bold"
            >
              {word}
            </motion.span>
          ) : (
            word
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={className}>
      {getHighlightedText()}
    </div>
  );
}
