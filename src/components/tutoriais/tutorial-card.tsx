"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Clock, Tag, Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TutorialAuthor {
  name: string;
  avatar: string;
  role: string;
}

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in minutes
  level: 'iniciante' | 'intermediario' | 'avancado';
  tags: string[];
  date: string;
  views: number;
  rating: number;
  author: TutorialAuthor;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface TutorialCardProps {
  tutorial: Tutorial;
  variant?: 'default' | 'featured' | 'compact';
  index?: number;
  className?: string;
}

export function TutorialCard({ 
  tutorial, 
  variant = 'default', 
  index = 0, 
  className 
}: TutorialCardProps) {
  const {
    slug,
    title,
    description,
    thumbnail,
    duration,
    level,
    tags,
    views,
    rating,
    author,
    date,
    isNew
  } = tutorial;

  // Badge de nível
  const LevelBadge = () => {
    const bgColors = {
      'iniciante': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'intermediario': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'avancado': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    };
    
    const levelNames = {
      'iniciante': 'Iniciante',
      'intermediario': 'Intermediário',
      'avancado': 'Avançado',
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColors[level]}`}>
        {levelNames[level]}
      </span>
    );
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Formatar duração
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${remainingMinutes}min`;
  };

  // Formatar visualizações
  const formatViews = (views: number) => {
    if (views < 1000) {
      return views.toString();
    }
    
    return `${(views / 1000).toFixed(1)}k`;
  };

  // Variante featured (destacada)
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 group",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
        
        <div className="relative h-80 md:h-96 overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            quality={90}
          />
        </div>
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
          {isNew && (
            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tappyGreen text-black">
                Novo
              </span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-3">
            <LevelBadge />
            
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              <Clock className="h-3 w-3 mr-1" />
              {formatDuration(duration)}
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-tappyGreen transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-2 md:line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={author.avatar}
                alt={author.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-white/20"
              />
              
              <div className="ml-2">
                <div className="text-sm font-medium text-white">{author.name}</div>
                <div className="text-xs text-gray-400">{author.role}</div>
              </div>
            </div>
            
            <Link 
              href={`/tutoriais/${slug}`}
              className="inline-flex items-center justify-center p-2 rounded-full bg-tappyGreen text-black hover:bg-tappyGreen/90 transition-colors"
            >
              <Play className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Variante compact
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={cn(
          "flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
          className
        )}
      >
        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDuration(duration)}
            </span>
            
            <span className="flex items-center">
              <Star className="h-3 w-3 mr-1 text-yellow-500" />
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Variante default
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-tappyGreen dark:hover:border-tappyGreen transition-all",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              <Clock className="h-3 w-3 mr-1" />
              {formatDuration(duration)}
            </span>
            
            <LevelBadge />
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-1.5 rounded-full">
            <Play className="h-5 w-5 text-white" />
          </div>
        </div>
        
        {isNew && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tappyGreen text-black">
              Novo
            </span>
          </div>
        )}
      </div>
      
      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-tappyGreen transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Image
              src={author.avatar}
              alt={author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {author.name}
            </span>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(date)}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Eye className="h-3 w-3 mr-1" />
              {formatViews(views)}
            </span>
            
            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Star className="h-3 w-3 mr-1 text-yellow-500" />
              {rating.toFixed(1)}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-1.5 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            
            {tags.length > 2 && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                +{tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <Link href={`/tutoriais/${slug}`} className="absolute inset-0" aria-label={title} />
    </motion.div>
  );
}
