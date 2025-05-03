"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusType = 'operational' | 'degraded' | 'outage' | 'maintenance' | 'unknown';

interface StatusIndicatorProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function StatusIndicator({
  status,
  size = 'md',
  animate = true,
  showLabel = false,
  className
}: StatusIndicatorProps) {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const statusConfig = {
    operational: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      label: 'Operacional'
    },
    degraded: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
      label: 'Degradado'
    },
    outage: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500',
      label: 'Fora do ar'
    },
    maintenance: {
      icon: AlertTriangle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      label: 'Em manutenção'
    },
    unknown: {
      icon: Info,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500',
      label: 'Desconhecido'
    }
  };

  const { icon: Icon, color, bgColor, label } = statusConfig[status];

  return (
    <div className={cn("flex items-center", className)}>
      <div className="relative">
        {animate && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full opacity-30",
              bgColor
            )}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          />
        )}
        <Icon className={cn(iconSizes[size], color)} />
      </div>
      
      {showLabel && (
        <span className={cn("ml-2 font-medium", color)}>
          {label}
        </span>
      )}
    </div>
  );
}
