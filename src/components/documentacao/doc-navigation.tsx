"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, FileText, Bookmark, ArrowRight, Box } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface DocSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  items: DocItem[];
  defaultOpen?: boolean;
}

export interface DocItem {
  id: string;
  title: string;
  href: string;
  isNew?: boolean;
  isUpdated?: boolean;
}

interface DocNavigationProps {
  sections: DocSection[];
  activePath: string;
  className?: string;
  isCollapsible?: boolean;
}

export function DocNavigation({ 
  sections, 
  activePath, 
  className,
  isCollapsible = true
}: DocNavigationProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ section: string; item: DocItem }[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Inicializar seções abertas com base nas props defaultOpen
  useEffect(() => {
    const initialOpenSections = sections
      .filter(section => section.defaultOpen)
      .map(section => section.id);
    
    setOpenSections(initialOpenSections);
  }, [sections]);

  // Alternar estado de expansão de uma seção
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Pesquisar nos itens de documentação
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    const results = sections.flatMap(section => 
      section.items
        .filter(item => 
          item.title.toLowerCase().includes(query)
        )
        .map(item => ({ section: section.title, item }))
    );
    
    setSearchResults(results);
  };

  return (
    <div className={cn("relative flex flex-col", className)}>
      {/* Campo de busca */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Buscar na documentação..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tappyGreen focus:border-transparent transition-all"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      
      {/* Resultados da busca */}
      {searchResults.length > 0 && (
        <motion.div 
          className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Resultados da busca
            </h3>
          </div>
          
          <div className="max-h-64 overflow-y-auto p-2">
            {searchResults.map((result, index) => (
              <Link 
                key={index} 
                href={result.item.href}
                className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors group"
              >
                <div className="flex items-start">
                  <FileText className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-tappyGreen transition-colors">
                      {result.item.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {result.section}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Botão de toggle para mobile */}
      {isCollapsible && (
        <div className="lg:hidden mb-4">
          <button
            className="flex w-full items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span className="font-medium text-gray-900 dark:text-white">Navegação</span>
            <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${isMobileOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
      
      {/* Menu de navegação */}
      <nav 
        className={`space-y-1 ${isCollapsible ? (isMobileOpen ? 'block' : 'hidden lg:block') : 'block'}`}
      >
        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id} className="rounded-md overflow-hidden">
              {/* Cabeçalho da seção */}
              <button
                className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded-md transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center">
                  {section.icon || <Box className="h-4 w-4 text-tappyGreen mr-2" />}
                  <span>{section.title}</span>
                </div>
                
                <ChevronDown 
                  className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${
                    openSections.includes(section.id) ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {/* Itens da seção */}
              {openSections.includes(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pl-4 ml-2 border-l border-gray-200 dark:border-gray-700 mt-1 space-y-1"
                >
                  {section.items.map((item) => {
                    const isActive = activePath === item.href;
                    
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between py-1.5 px-3 text-sm rounded-md group transition-colors",
                          isActive 
                            ? "bg-tappyGreen/10 text-tappyGreen font-medium" 
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                        )}
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full mr-2",
                            isActive ? "bg-tappyGreen" : "bg-gray-300 dark:bg-gray-600"
                          )} />
                          
                          <span>{item.title}</span>
                        </div>
                        
                        <div className="flex items-center">
                          {item.isNew && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mr-1.5">
                              Novo
                            </span>
                          )}
                          
                          {item.isUpdated && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mr-1.5">
                              Atualizado
                            </span>
                          )}
                          
                          {isActive && (
                            <ArrowRight className="h-3.5 w-3.5 text-tappyGreen" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        {/* Links úteis */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Links úteis
          </h3>
          
          <div className="space-y-1">
            <Link 
              href="#"
              className="flex items-center py-1.5 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded-md group"
            >
              <Bookmark className="h-4 w-4 text-gray-400 group-hover:text-tappyGreen mr-2" />
              <span>Guia de referência rápida</span>
            </Link>
            
            <Link 
              href="#"
              className="flex items-center py-1.5 px-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded-md group"
            >
              <FileText className="h-4 w-4 text-gray-400 group-hover:text-tappyGreen mr-2" />
              <span>Exemplos de código</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
