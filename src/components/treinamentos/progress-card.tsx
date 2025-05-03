"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Award, ChevronRight } from 'lucide-react';
import { Course } from './course-card';
import { Button } from '@/components/ui/button';

interface ProgressCardProps {
  completedCourses: Course[];
  inProgressCourses: Course[];
  totalCourses: number;
  onContinueCourse: (course: Course) => void;
}

export function ProgressCard({ completedCourses, inProgressCourses, totalCourses, onContinueCourse }: ProgressCardProps) {
  // Calcular estatísticas
  const completedCount = completedCourses.length;
  const inProgressCount = inProgressCourses.length;
  const completionPercentage = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;
  
  // Ordenar cursos em andamento pelo progresso (decrescente)
  const sortedInProgress = [...inProgressCourses].sort((a, b) => (b.progress || 0) - (a.progress || 0));

  return (
    <motion.div
      className="rounded-xl overflow-hidden backdrop-blur-sm border border-gray-200 dark:border-gray-800 bg-white/10 dark:bg-black/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Meu progresso
        </h3>
        
        {/* Barra de progresso geral */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Progresso total
            </span>
            <span className="text-sm font-medium text-tappyGreen">
              {completionPercentage}%
            </span>
          </div>
          
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-tappyGreen to-tappyGreen/80 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {completedCount} de {totalCourses} treinamentos completos
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {inProgressCount} em andamento
            </span>
          </div>
        </div>

        {/* Certificados e conquistas */}
        {completedCount > 0 && (
          <div className="flex items-center mb-6 p-3 rounded-lg bg-tappyGreen/10 dark:bg-tappyGreen/5 border border-tappyGreen/20">
            <div className="flex-shrink-0 mr-4">
              <Award className="h-8 w-8 text-tappyGreen" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                {completedCount} {completedCount === 1 ? 'certificado' : 'certificados'} conquistado{completedCount === 1 ? '' : 's'}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Continue aprendendo para desbloquear mais conquistas e certificados!
              </p>
            </div>
          </div>
        )}
        
        {/* Cursos em andamento */}
        {sortedInProgress.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-3">
              Continue de onde parou
            </h4>
            
            <div className="space-y-3">
              {sortedInProgress.slice(0, 3).map((course) => (
                <div 
                  key={course.id}
                  className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => onContinueCourse(course)}
                >
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded overflow-hidden mr-3 bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                  />
                  
                  <div className="flex-grow min-w-0">
                    <h5 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {course.title}
                    </h5>
                    
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">
                        {Math.floor(course.progress || 0)}% concluído
                      </span>
                    </div>
                    
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-tappyGreen rounded-full" 
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  
                  <ChevronRight className="flex-shrink-0 h-4 w-4 text-gray-400 ml-2" />
                </div>
              ))}
              
              {sortedInProgress.length > 3 && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-center text-sm text-gray-600 dark:text-gray-300 hover:text-tappyGreen"
                >
                  Ver todos os cursos em andamento ({sortedInProgress.length})
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Estado vazio (sem cursos em progresso) */}
        {inProgressCount === 0 && completedCount === 0 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Comece a aprender
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Você ainda não iniciou nenhum treinamento.
            </p>
            <Button 
              className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full"
            >
              Explorar cursos
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
