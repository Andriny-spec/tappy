"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'minimal';
  index?: number;
}

export function PostCard({ post, variant = 'default', index = 0 }: PostCardProps) {
  // Formatar data de publicação
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  // Card destacado (featured)
  if (variant === 'featured') {
    return (
      <motion.div 
        className="group relative flex flex-col md:flex-row gap-8 overflow-hidden rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Overlay de gradiente animado */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-tappyGreen/10 to-transparent transition-opacity duration-500" />
        
        {/* Imagem de capa */}
        <div className="md:w-2/5 relative h-60 md:h-auto overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
          
          {/* Badge de categoria */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-tappyGreen/90 text-white text-xs px-3 py-1 rounded-full">
              {post.category}
            </Badge>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white line-clamp-2 group-hover:text-tappyGreen transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Meta informações */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{formatDate(post.publishedAt)}</span>
            
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} min de leitura</span>
          </div>
          
          {/* Autor */}
          <div className="flex items-center mt-auto">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="h-10 w-10 rounded-full mr-3 object-cover border-2 border-white dark:border-gray-800"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Autor
              </p>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`} 
              className="ml-auto flex items-center text-tappyGreen hover:text-tappyGreen/80 transition-colors"
            >
              <span className="mr-1 font-medium">Ler artigo</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Card padrão
  if (variant === 'default') {
    return (
      <motion.div 
        className="group h-full flex flex-col overflow-hidden rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        {/* Imagem de capa */}
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
          
          {/* Badge de categoria */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-tappyGreen/90 text-white text-xs px-3 py-1 rounded-full">
              {post.category}
            </Badge>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-tappyGreen transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          
          {/* Meta informações */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span className="mr-3">{formatDate(post.publishedAt)}</span>
            
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{post.readTime} min de leitura</span>
          </div>
          
          {/* Autor e link */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="h-8 w-8 rounded-full mr-2 object-cover border-2 border-white dark:border-gray-800"
              />
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </span>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`} 
              className="text-tappyGreen hover:text-tappyGreen/80 transition-colors"
            >
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Card mínimo (para sidebar ou relacionados)
  return (
    <motion.div 
      className="group flex items-start gap-3 py-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <img 
        src={post.coverImage} 
        alt={post.title}
        className="h-16 w-16 rounded-md object-cover flex-shrink-0"
      />
      
      <div className="flex-grow">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-tappyGreen transition-colors duration-300">
          {post.title}
        </h4>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        
        <Link 
          href={`/blog/${post.slug}`} 
          className="text-xs text-tappyGreen hover:text-tappyGreen/80 transition-colors inline-flex items-center mt-1"
        >
          <span>Ler mais</span>
          <ArrowRight className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}
