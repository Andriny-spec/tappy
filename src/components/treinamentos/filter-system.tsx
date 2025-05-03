"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CourseType, DifficultyLevel } from './course-card';

// Interface para os filtros
export interface CourseFilters {
  courseType: CourseType | 'all';
  difficulty: DifficultyLevel | 'all';
  category: string | 'all';
  search: string;
}

// Interface para as categorias
interface Category {
  id: string;
  name: string;
}

interface FilterSystemProps {
  filters: CourseFilters;
  onChange: (filters: CourseFilters) => void;
  categories: Category[];
}

export function FilterSystem({ filters, onChange, categories }: FilterSystemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search);

  const courseTypeOptions = [
    { value: 'all', label: 'Todos os cursos' },
    { value: 'tappy-link', label: 'Tappy Link' },
    { value: 'tappy-whats', label: 'Tappy Whats' },
    { value: 'tappy-imob', label: 'Tappy Imob' },
  ];

  const difficultyOptions = [
    { value: 'all', label: 'Todos os níveis' },
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' },
  ];

  // Atualizar os filtros
  const updateFilters = (key: keyof CourseFilters, value: any) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  // Resetar todos os filtros
  const resetFilters = () => {
    onChange({
      courseType: 'all',
      difficulty: 'all',
      category: 'all',
      search: '',
    });
    setSearchValue('');
  };

  // Lidar com a busca quando o usuário pressiona Enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters('search', searchValue);
  };

  return (
    <motion.div
      className="relative w-full mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Barra de pesquisa */}
        <form 
          className="relative w-full md:max-w-md" 
          onSubmit={handleSearchSubmit}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar treinamentos..."
            className="pl-10 pr-4 h-11 rounded-full border-gray-200 dark:border-gray-700 focus:border-tappyGreen focus:ring-tappyGreen/20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => {
                setSearchValue('');
                if (filters.search) {
                  updateFilters('search', '');
                }
              }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Botões de filtro */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="sm"
            className="rounded-full flex items-center gap-1.5 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>

          {Object.values(filters).some(value => value !== 'all' && value !== '') && (
            <Button
              onClick={resetFilters}
              variant="ghost"
              size="sm"
              className="rounded-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Limpar
            </Button>
          )}

          {/* Contador de filtros ativos */}
          {(() => {
            const activeFilterCount = Object.entries(filters).filter(
              ([key, value]) => key !== 'search' && value !== 'all'
            ).length;
            
            if (activeFilterCount > 0) {
              return (
                <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  {activeFilterCount}
                </Badge>
              );
            }
            return null;
          })()}
        </div>
      </div>

      {/* Paineis de filtro expandidos */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 overflow-hidden"
        animate={{
          height: isExpanded ? 'auto' : 0,
          marginTop: isExpanded ? 16 : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        initial={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Filtro de tipo de curso */}
        <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Produto</h3>
          <div className="space-y-2">
            {courseTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilters('courseType', option.value)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  filters.courseType === option.value
                    ? 'bg-tappyGreen/10 text-tappyGreen font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro de nível de dificuldade */}
        <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nível</h3>
          <div className="space-y-2">
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilters('difficulty', option.value)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  filters.difficulty === option.value
                    ? 'bg-tappyGreen/10 text-tappyGreen font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro de categoria */}
        <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categoria</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <button
              onClick={() => updateFilters('category', 'all')}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                filters.category === 'all'
                  ? 'bg-tappyGreen/10 text-tappyGreen font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
            >
              Todas as categorias
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => updateFilters('category', category.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  filters.category === category.id
                    ? 'bg-tappyGreen/10 text-tappyGreen font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Indicadores de filtros ativos */}
      {Object.entries(filters).some(([key, value]) => key !== 'search' && value !== 'all') && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.courseType !== 'all' && (
            <Badge 
              variant="outline" 
              className="py-1.5 pl-2 pr-1 flex items-center gap-1 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
            >
              <span>
                {courseTypeOptions.find(opt => opt.value === filters.courseType)?.label}
              </span>
              <button
                onClick={() => updateFilters('courseType', 'all')}
                className="ml-1 rounded-full p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.difficulty !== 'all' && (
            <Badge 
              variant="outline" 
              className="py-1.5 pl-2 pr-1 flex items-center gap-1 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
            >
              <span>
                {difficultyOptions.find(opt => opt.value === filters.difficulty)?.label}
              </span>
              <button
                onClick={() => updateFilters('difficulty', 'all')}
                className="ml-1 rounded-full p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.category !== 'all' && (
            <Badge 
              variant="outline" 
              className="py-1.5 pl-2 pr-1 flex items-center gap-1 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
            >
              <span>
                {categories.find(cat => cat.id === filters.category)?.name}
              </span>
              <button
                onClick={() => updateFilters('category', 'all')}
                className="ml-1 rounded-full p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
}
