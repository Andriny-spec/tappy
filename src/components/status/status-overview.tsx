"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { StatusType } from './status-indicator';
import { Service } from './service-card';

interface StatusOverviewProps {
  services: Service[];
  lastUpdated: string;
}

export function StatusOverview({ services, lastUpdated }: StatusOverviewProps) {
  // Calcular status geral
  const getOverallStatus = (): { status: StatusType; message: string } => {
    const hasOutage = services.some(s => s.status === 'outage');
    const hasDegraded = services.some(s => s.status === 'degraded');
    const hasMaintenance = services.some(s => s.status === 'maintenance');
    
    if (hasOutage) {
      return { 
        status: 'outage', 
        message: 'Detectamos problemas em alguns serviços da Tappy' 
      };
    }
    
    if (hasDegraded) {
      return { 
        status: 'degraded', 
        message: 'Alguns serviços apresentam degradação de performance' 
      };
    }
    
    if (hasMaintenance) {
      return { 
        status: 'maintenance', 
        message: 'Manutenção programada em andamento' 
      };
    }
    
    return { 
      status: 'operational', 
      message: 'Todos os serviços estão operando normalmente' 
    };
  };

  // Formatar data de última atualização
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const { status, message } = getOverallStatus();
  
  // Configurações visuais baseadas no status
  const statusConfig = {
    operational: {
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    degraded: {
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30'
    },
    outage: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30'
    },
    maintenance: {
      icon: Info,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    unknown: {
      icon: Info,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30'
    }
  };

  const { icon: Icon, color, bgColor, borderColor } = statusConfig[status];

  // Calcular estatísticas dos serviços
  const totalServices = services.length;
  const operationalCount = services.filter(s => s.status === 'operational').length;
  const degradedCount = services.filter(s => s.status === 'degraded').length;
  const outageCount = services.filter(s => s.status === 'outage').length;
  const maintenanceCount = services.filter(s => s.status === 'maintenance').length;

  // Calcular média de uptime
  const averageUptime = services.reduce((sum, service) => sum + service.uptime, 0) / totalServices;

  // Últimos 30 dias em timeline
  const generateTimelineDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simular status aleatório para os dias - em produção viria do histórico real
      let dayStatus: StatusType = 'operational';
      
      // Vamos simular que cerca de 90% dos dias estão operacionais
      const randomValue = Math.random();
      if (randomValue > 0.9 && randomValue < 0.95) {
        dayStatus = 'degraded';
      } else if (randomValue >= 0.95 && randomValue < 0.98) {
        dayStatus = 'maintenance';
      } else if (randomValue >= 0.98) {
        dayStatus = 'outage';
      }
      
      days.push({
        date: date,
        status: dayStatus
      });
    }
    
    return days;
  };

  const timelineDays = generateTimelineDays();

  return (
    <div className="space-y-8">
      {/* Status geral */}
      <motion.div 
        className={`p-6 rounded-xl ${bgColor} ${borderColor} border`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <div className="mr-4">
            <Icon className={`h-10 w-10 ${color}`} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {message}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Última atualização: {formatLastUpdated(lastUpdated)}
            </p>
          </div>
          
          <div className="ml-auto text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Média de uptime
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {averageUptime.toFixed(2)}%
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Estatísticas */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Operacionais</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{operationalCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Degradados</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{degradedCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Fora do ar</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{outageCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Em manutenção</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{maintenanceCount}</p>
        </div>
      </motion.div>
      
      {/* Timeline de 30 dias */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Status dos últimos 30 dias
        </h3>
        
        <div className="flex items-center space-x-1 overflow-x-auto pb-4">
          {timelineDays.map((day, index) => {
            const statusColor = 
              day.status === 'operational' ? 'bg-green-500' :
              day.status === 'degraded' ? 'bg-yellow-500' :
              day.status === 'maintenance' ? 'bg-blue-500' :
              'bg-red-500';
            
            return (
              <div key={index} className="flex-shrink-0 text-center">
                <div 
                  className={`w-4 h-12 ${statusColor} rounded-sm`} 
                  title={`${day.date.toLocaleDateString('pt-BR')}: ${
                    day.status === 'operational' ? 'Operacional' :
                    day.status === 'degraded' ? 'Degradado' :
                    day.status === 'maintenance' ? 'Manutenção' :
                    'Fora do ar'
                  }`}
                />
                {index % 5 === 0 && (
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 -ml-1">
                    {day.date.getDate()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center mt-4 text-xs text-gray-500 dark:text-gray-400 justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1" />
            <span>Operacional</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1" />
            <span>Degradado</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
            <span>Manutenção</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1" />
            <span>Fora do ar</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
