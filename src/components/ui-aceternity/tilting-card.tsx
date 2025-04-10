"use client";

import React, { useRef, MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltingCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  borderGradient?: boolean;
}

export function TiltingCard({
  children,
  className = "",
  tiltAmount = 15,
  borderGradient = false,
}: TiltingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateXSpring = useSpring(0, springConfig);
  const rotateYSpring = useSpring(0, springConfig);
  const scaleSpring = useSpring(1, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculando a posição do mouse relativa ao card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculando a rotação baseada na posição do mouse
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateYValue = ((mouseX - centerX) / centerX) * tiltAmount;
    const rotateXValue = ((centerY - mouseY) / centerY) * tiltAmount;
    
    rotateXSpring.set(rotateXValue);
    rotateYSpring.set(rotateYValue);
    scaleSpring.set(1.05);
  };

  const handleMouseLeave = () => {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
    scaleSpring.set(1);
  };

  const baseClasses = `relative rounded-xl overflow-hidden transition-all ${className}`;
  const borderGradientClasses = borderGradient ? 
    "before:absolute before:inset-0 before:p-[1px] before:rounded-xl before:bg-gradient-to-r before:from-tappyGreen/60 before:to-tappyBlue/60 before:content-[''] before:-z-10 before:animate-gradient" : "";

  return (
    <motion.div
      ref={cardRef}
      className={`${baseClasses} ${borderGradientClasses}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleSpring,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
