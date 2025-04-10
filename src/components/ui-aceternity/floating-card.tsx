"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
}

export const FloatingCard = ({
  children,
  className,
  cardClassName,
}: FloatingCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    const rotateXValue = mouseY * 20; // Adjust multiplier for more/less rotation
    const rotateYValue = mouseX * -20; // Negative to make it follow the mouse

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full h-full perspective-1000", className)}
    >
      <motion.div
        className={cn(
          "w-full h-full p-1 rounded-2xl bg-gradient-to-br from-tappyGreen to-tappyBlue transition-transform duration-200 ease-out",
          cardClassName
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-1 bg-black rounded-xl" style={{ transform: "translateZ(-1px)" }} />
        <div className="relative h-full w-full bg-black rounded-xl overflow-hidden z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
