"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutGrid = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = React.useState<null | number>(null);

  const handleClick = (index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 p-4 md:p-10">
      {React.Children.map(children, (child, index) => (
        <Card
          key={index}
          isSelected={selected === index}
          onClick={() => handleClick(index)}
        
          className={cn({
            "md:col-span-2": index === 0,
            "md:col-span-1": index !== 0,
          })}
        >
          {child}
        </Card>
      ))}
    </div>
  );
};

export const Card = ({
  children,
  isSelected,
  onClick,
  className,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "relative rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br from-neutral-900/90 via-neutral-900 to-neutral-800 border border-white/[0.08]",
        className
      )}
      layout
      initial={{ borderRadius: 24 }}
      whileHover={isSelected ? {} : { scale: 0.985 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <motion.div
        layout
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const CardTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.h2
      layout="position"
      className="text-xl md:text-3xl font-bold text-white p-4 md:p-8"
    >
      {children}
    </motion.h2>
  );
};

export const CardContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      layout="position"
      className="w-full h-full p-4 md:p-8 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900/90"
    >
      {children}
    </motion.div>
  );
};

export const CardItem = ({
  title,
  description,
  icon,
  className,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="text-white/60">{icon}</div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
};
