"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type TutorialCategory = 'todos' | 'tappy-whats' | 'tappy-imob' | 'tappy-id' | 'integracao' | 'api';
export type TutorialLevel = 'todos' | 'iniciante' | 'intermediario' | 'avancado';
export type TutorialSort = 'recentes' | 'populares' | 'melhor-avaliados' | 'duracao';

export interface TutorialFilters {
  category: TutorialCategory;
  level: TutorialLevel;
  sort: TutorialSort;
  search: string;
  tags: string[];
}

interface TutorialFiltersProps {
  filters: TutorialFilters;
  onChange: (filters: TutorialFilters) => void;
  availableTags: string[];
  className?: string;
}

export function TutorialFilters({
  filters,
  onChange,
  availableTags,
  className
}: TutorialFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search);

  // Mapeia os nomes para exibição
  const categoryNames = {
    'todos': 'Todos',
    'tappy-whats': 'Tappy Whats',
    'tappy-imob': 'Tappy Imob',
    'tappy-id': 'Tappy ID',
    'integracao': 'Integrações',
    'api': 'API'
  };

  const levelNames = {
    'todos': 'Todos',
    'iniciante': 'Iniciante',
    'intermediario': 'Intermediário',
    'avancado': 'Avançado'
  };

  const sortNames = {
    'recentes': 'Mais recentes',
    'populares': 'Mais populares',
    'melhor-avaliados': 'Melhor avaliados',
    'duracao': 'Menor duração'
  };

  // Handler para alterações de categoria
  const handleCategoryChange = (value: string) => {
    onChange({
      ...filters,
      category: value as TutorialCategory
    });
  };

  // Handler para alterações de nível
  const handleLevelChange = (value: string) => {
    onChange({
      ...filters,
      level: value as TutorialLevel
    });
  };

  // Handler para alterações de ordenação
  const handleSortChange = (value: string) => {
    onChange({
      ...filters,
      sort: value as TutorialSort
    });
  };

  // Handler para alterações de busca
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({
      ...filters,
      search: searchQuery
    });
  };

  // Handler para limpar a busca
  const handleClearSearch = () => {
    setSearchQuery('');
    onChange({
      ...filters,
      search: ''
    });
  };

  // Handler para alternar tag
  const handleTagToggle = (tag: string) => {
    const updatedTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onChange({
      ...filters,
      tags: updatedTags
    });
  };

  // Handler para limpar todos os filtros
  const handleClearAll = () => {
    setSearchQuery('');
    onChange({
      category: 'todos',
      level: 'todos',
      sort: 'recentes',
      search: '',
      tags: []
    });
    setIsAdvancedOpen(false);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Campo de busca */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        
        <input
          type="text"
          placeholder="Buscar tutoriais..."
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-tappyGreen focus:border-transparent transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
      
      {/* Filtros principais */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Tabs 
            defaultValue={filters.category} 
            onValueChange={handleCategoryChange}
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-white/20 dark:bg-gray-800/20 p-1 rounded-lg w-full sm:w-auto overflow-x-auto flex-nowrap">
              {Object.entries(categoryNames).map(([value, label]) => (
                <TabsTrigger 
                  key={value} 
                  value={value}
                  className="whitespace-nowrap data-[state=active]:bg-tappyGreen data-[state=active]:text-black"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className={`gap-2 ${isAdvancedOpen ? 'bg-tappyGreen/10 border-tappyGreen text-tappyGreen' : ''}`}
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
          
          {(filters.level !== 'todos' || filters.tags.length > 0) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
            >
              <span>Limpar</span>
              <X className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Filtros avançados */}
      {isAdvancedOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Nível
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {Object.entries(levelNames).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handleLevelChange(value)}
                    className={`px-3 py-1.5 rounded-lg text-sm 
                      ${filters.level === value
                        ? 'bg-tappyGreen text-black font-medium'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Ordenar por
              </h3>
              
              <div className="flex flex-col gap-2">
                {Object.entries(sortNames).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handleSortChange(value)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className={filters.sort === value ? 'text-tappyGreen font-medium' : 'text-gray-700 dark:text-gray-300'}>
                      {label}
                    </span>
                    
                    {filters.sort === value && (
                      <Check className="h-4 w-4 text-tappyGreen" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
              Tags
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm 
                    ${filters.tags.includes(tag)
                      ? 'bg-tappyGreen/15 text-tappyGreen border border-tappyGreen/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-transparent'
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Exibição dos filtros ativos */}
      {(filters.level !== 'todos' || filters.tags.length > 0 || filters.search) && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Filtros ativos:
          </span>
          
          {filters.level !== 'todos' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tappyGreen/10 text-tappyGreen">
              Nível: {levelNames[filters.level]}
              <X
                className="h-3.5 w-3.5 ml-1 cursor-pointer"
                onClick={() => handleLevelChange('todos')}
              />
            </span>
          )}
          
          {filters.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tappyGreen/10 text-tappyGreen"
            >
              {tag}
              <X
                className="h-3.5 w-3.5 ml-1 cursor-pointer"
                onClick={() => handleTagToggle(tag)}
              />
            </span>
          ))}
          
          {filters.search && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tappyGreen/10 text-tappyGreen">
              Busca: "{filters.search}"
              <X
                className="h-3.5 w-3.5 ml-1 cursor-pointer"
                onClick={handleClearSearch}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
