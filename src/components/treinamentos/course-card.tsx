"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Award, ChevronRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Tipos de curso (Link, Whats, Imob)
export type CourseType = 'tappy-link' | 'tappy-whats' | 'tappy-imob';

// Níveis de dificuldade
export type DifficultyLevel = 'iniciante' | 'intermediario' | 'avancado';

// Interface para o curso
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // Em minutos
  videoUrl: string;
  instructor: string;
  courseType: CourseType;
  category: string;
  difficulty: DifficultyLevel;
  tags: string[];
  completed?: boolean;
  progress?: number;
}

// Mapeamento de cores por tipo de curso
const courseTypeColors = {
  'tappy-link': {
    bgGradient: 'from-tappyGreen/20 to-tappyGreen/5',
    hoverGradient: 'from-tappyGreen/30 to-tappyGreen/10',
    border: 'border-tappyGreen/30',
    text: 'text-tappyGreen',
    badge: 'bg-tappyGreen/20 text-tappyGreen'
  },
  'tappy-whats': {
    bgGradient: 'from-emerald-500/20 to-emerald-500/5',
    hoverGradient: 'from-emerald-500/30 to-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-500',
    badge: 'bg-emerald-500/20 text-emerald-500'
  },
  'tappy-imob': {
    bgGradient: 'from-cyan-500/20 to-cyan-500/5',
    hoverGradient: 'from-cyan-500/30 to-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-500',
    badge: 'bg-cyan-500/20 text-cyan-500'
  }
};

// Mapeamento de nomes amigáveis para tipos de curso
const courseTypeNames = {
  'tappy-link': 'Tappy Link',
  'tappy-whats': 'Tappy Whats',
  'tappy-imob': 'Tappy Imob'
};

// Mapeamento de nomes para níveis de dificuldade
const difficultyNames = {
  'iniciante': 'Iniciante',
  'intermediario': 'Intermediário',
  'avancado': 'Avançado'
};

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = courseTypeColors[course.courseType];
  
  // Formatar a duração do vídeo
  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}min`;
  };

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden backdrop-blur-sm border ${colors.border} bg-gradient-to-br ${colors.bgGradient} dark:bg-black/20 shadow-lg hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(course)}
    >
      {/* Overlay de luz/brilho que se move com hover */}
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          '--x': isHovered ? '50%' : '0%',
          '--y': isHovered ? '50%' : '0%',
        } as any}
        transition={{ duration: 0.3 }}
      />

      {/* Badge indicando o tipo de curso */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className={`${colors.badge} font-medium px-3 py-1 rounded-full text-xs shadow-sm`}>
          {courseTypeNames[course.courseType]}
        </Badge>
      </div>

      {/* Thumbnail com gradiente overlay e ícone de play */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${course.thumbnail})` }}
        />
        
        {/* Botão Play centralizado */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: isHovered ? 1 : 0.7, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-14 w-14 rounded-full bg-white/90 dark:bg-black/70 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-tappyGreen fill-current ml-1" />
          </div>
        </motion.div>
        
        {/* Barra de progresso (se aplicável) */}
        {course.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/30 z-20">
            <div 
              className="h-full bg-tappyGreen" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">{course.title}</h3>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{course.description}</p>
        
        {/* Metadados do curso */}
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Award className="h-4 w-4 mr-2" />
            <span>{difficultyNames[course.difficulty]}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Tag className="h-4 w-4 mr-2" />
            <span>{course.category}</span>
          </div>
        </div>
        
        {/* Botão Ver curso */}
        <Button 
          variant="ghost" 
          className={`w-full justify-between group ${colors.text} hover:bg-transparent`}
        >
          <span>Ver curso</span>
          <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
