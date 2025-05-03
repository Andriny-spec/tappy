"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { BlogPost, PostCard } from './post-card';

interface Category {
  id: string;
  name: string;
  postCount: number;
}

interface BlogSidebarProps {
  popularPosts: BlogPost[];
  categories: Category[];
  onSearch?: (searchTerm: string) => void;
}

export function BlogSidebar({ popularPosts, categories, onSearch }: BlogSidebarProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="space-y-8">
      {/* Barra de pesquisa */}
      <motion.div
        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pesquisar
        </h3>
        
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar no blog..."
              className="pl-10 pr-4 py-2 rounded-full border-gray-200 dark:border-gray-700 focus:border-tappyGreen focus:ring-tappyGreen/20 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </motion.div>
      
      {/* Posts populares */}
      <motion.div
        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-tappyGreen mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mais populares
          </h3>
        </div>
        
        <div className="space-y-1 divide-y divide-gray-200 dark:divide-gray-700">
          {popularPosts.map((post, index) => (
            <PostCard 
              key={post.id}
              post={post}
              variant="minimal"
              index={index}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Categorias */}
      <motion.div
        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center mb-4">
          <Tag className="h-5 w-5 text-tappyGreen mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Categorias
          </h3>
        </div>
        
        <div className="space-y-2">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={`/blog/categoria/${category.id}`}
                className="flex items-center justify-between group py-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 px-3 rounded-lg transition-colors"
              >
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-tappyGreen transition-colors">
                  {category.name}
                </span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full px-2 py-0.5">
                  {category.postCount}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Inscreva-se na newsletter */}
      <motion.div
        className="rounded-xl p-6 border border-tappyGreen/30 bg-gradient-to-br from-tappyGreen/10 to-tappyGreen/5 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Fique atualizado
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Inscreva-se para receber as últimas atualizações, dicas e novidades.
        </p>
        
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            className="w-full border-gray-200 dark:border-gray-700 focus:border-tappyGreen focus:ring-tappyGreen/20"
          />
          
          <button
            className="w-full py-2 rounded-lg bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium transition-colors"
          >
            Inscrever-se
          </button>
        </div>
      </motion.div>
    </div>
  );
}
