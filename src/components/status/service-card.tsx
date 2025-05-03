"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { StatusIndicator, StatusType } from './status-indicator';

export interface ServiceIncident {
  id: string;
  date: string;
  title: string;
  description: string;
  status: StatusType;
  updatedAt: string;
  resolved?: boolean;
  resolutionTime?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  status: StatusType;
  uptime: number;
  lastIncident?: string;
  incidents: ServiceIncident[];
  category: string;
}

interface ServiceCardProps {
  service: Service;
  expanded?: boolean;
  onClick?: () => void;
  index?: number;
}

export function ServiceCard({ service, expanded = false, onClick, index = 0 }: ServiceCardProps) {
  // Formatador para datas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Cabeçalho do Card */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={onClick}
      >
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {service.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {service.description}
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="text-right mr-3">
            <div className="text-sm font-medium">
              Uptime
            </div>
            <div className={`text-sm font-medium ${
              service.uptime > 99 
                ? 'text-green-500' 
                : service.uptime > 95 
                  ? 'text-yellow-500' 
                  : 'text-red-500'
            }`}>
              {service.uptime.toFixed(2)}%
            </div>
          </div>
          
          <StatusIndicator 
            status={service.status} 
            showLabel={false} 
          />
        </div>
      </div>
      
      {/* Corpo expandido do Card */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-200 dark:border-gray-700"
        >
          {/* Histórico de incidentes */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Histórico recente
            </h4>
            
            {service.incidents.length > 0 ? (
              <div className="space-y-4">
                {service.incidents.map((incident) => (
                  <div 
                    key={incident.id}
                    className="relative pl-6 pb-4 border-l border-gray-200 dark:border-gray-700"
                  >
                    {/* Marcador de status */}
                    <div className="absolute left-0 top-0 -translate-x-1/2">
                      <StatusIndicator 
                        status={incident.status} 
                        size="sm"
                        animate={false}
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {formatDate(incident.date)}
                    </div>
                    
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {incident.title}
                      {incident.resolved && (
                        <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                          Resolvido
                        </span>
                      )}
                    </h5>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                      {incident.description}
                    </p>
                    
                    {incident.resolved && incident.resolutionTime && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Tempo de resolução: {incident.resolutionTime}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nenhum incidente reportado nos últimos 90 dias.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
