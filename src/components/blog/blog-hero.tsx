"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from './post-card';

interface BlogHeroProps {
  featuredPost: BlogPost;
}

export function BlogHero({ featuredPost }: BlogHeroProps) {
  // Formatar data de publicação
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background image com overlay gradient */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${featuredPost.coverImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      
      {/* Animated particle effect */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
      
      {/* Conteúdo do Hero */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-tappyGreen/90 text-white px-3 py-1 rounded-full mb-6">
              {featuredPost.category}
            </Badge>
          </motion.div>
          
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {featuredPost.title}
          </motion.h1>
          
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {featuredPost.excerpt}
          </motion.p>
          
          <motion.div
            className="flex flex-wrap items-center justify-center mb-8 text-sm text-gray-300 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center">
              <img 
                src={featuredPost.author.avatar} 
                alt={featuredPost.author.name}
                className="h-8 w-8 rounded-full mr-2 object-cover border-2 border-white/20"
              />
              <span>{featuredPost.author.name}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(featuredPost.publishedAt)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{featuredPost.readTime} min de leitura</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium transition-colors group"
            >
              Ler artigo completo
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
