"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Search, ChevronRight, Rss, BookOpen, Youtube, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { TutorialCard, Tutorial, TutorialAuthor } from '@/components/tutoriais/tutorial-card';
import { TutorialFilters, TutorialCategory, TutorialLevel, TutorialSort } from '@/components/tutoriais/tutorial-filters';

// Dados mockados para os tutoriais
const MOCK_AUTHORS: Record<string, TutorialAuthor> = {
  'ana_santos': {
    name: 'Ana Santos',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Product Manager'
  },
  'marcos_dev': {
    name: 'Marcos Silva',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Senior Developer'
  },
  'julia_ux': {
    name: 'Julia Mendes',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'UX Designer'
  },
  'rafael_tech': {
    name: 'Rafael Costa',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    role: 'Tech Lead'
  },
  'carla_dev': {
    name: 'Carla Oliveira',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    role: 'Backend Developer'
  }
};

const MOCK_TUTORIALS: Tutorial[] = [
  {
    id: '1',
    slug: 'primeiros-passos-tappy-whats',
    title: 'Primeiros passos com Tappy Whats',
    description: 'Aprenda a configurar e usar todas as funcionalidades do Tappy Whats para automatizar seu atendimento.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
    duration: 25,
    level: 'iniciante',
    tags: ['Tappy Whats', 'Iniciante', 'Configuração'],
    date: '2025-04-28T14:00:00Z',
    views: 1840,
    rating: 4.8,
    author: MOCK_AUTHORS.ana_santos,
    isFeatured: true,
    isNew: true
  },
  {
    id: '2',
    slug: 'integracao-tappy-imob-portais',
    title: 'Integrando Tappy Imob com portais imobiliários',
    description: 'Como sincronizar seus imóveis com os principais portais do mercado usando a API do Tappy Imob.',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1073&q=80',
    duration: 42,
    level: 'intermediario',
    tags: ['Tappy Imob', 'API', 'Integração'],
    date: '2025-04-25T10:30:00Z',
    views: 1230,
    rating: 4.6,
    author: MOCK_AUTHORS.marcos_dev
  },
  {
    id: '3',
    slug: 'construindo-chatbots-avancados',
    title: 'Construindo chatbots avançados para WhatsApp',
    description: 'Técnicas avançadas para criar chatbots inteligentes e conversacionais usando Tappy Whats.',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    duration: 65,
    level: 'avancado',
    tags: ['Chatbot', 'IA', 'WhatsApp', 'Conversacional'],
    date: '2025-04-20T16:45:00Z',
    views: 2980,
    rating: 4.9,
    author: MOCK_AUTHORS.rafael_tech
  },
  {
    id: '4',
    slug: 'autenticacao-tappy-id',
    title: 'Autenticação segura com Tappy ID',
    description: 'Implementando autenticação e autorização robusta usando o Tappy ID em suas aplicações.',
    thumbnail: 'https://images.unsplash.com/photo-1555421689-491a97ff2f31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    duration: 37,
    level: 'intermediario',
    tags: ['Segurança', 'Autenticação', 'Tappy ID'],
    date: '2025-04-18T09:15:00Z',
    views: 1560,
    rating: 4.7,
    author: MOCK_AUTHORS.marcos_dev,
    isNew: true
  },
  {
    id: '5',
    slug: 'webhooks-e-eventos',
    title: 'Utilizando webhooks e eventos para integrações',
    description: 'Como monitorar eventos e reagir a mudanças em tempo real com webhooks da plataforma Tappy.',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
    duration: 33,
    level: 'intermediario',
    tags: ['Webhooks', 'Eventos', 'Integração'],
    date: '2025-04-15T13:45:00Z',
    views: 1120,
    rating: 4.5,
    author: MOCK_AUTHORS.carla_dev
  },
  {
    id: '6',
    slug: 'crm-imobiliario-tappy',
    title: 'Gerenciando seu CRM imobiliário com Tappy Imob',
    description: 'Como usar o CRM do Tappy Imob para gerenciar leads, clientes e pipeline de vendas de forma eficiente.',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
    duration: 45,
    level: 'intermediario',
    tags: ['CRM', 'Tappy Imob', 'Vendas'],
    date: '2025-04-12T10:00:00Z',
    views: 2250,
    rating: 4.8,
    author: MOCK_AUTHORS.ana_santos
  },
  {
    id: '7',
    slug: 'whatsapp-multi-atendentes',
    title: 'Configurando multi-atendentes no WhatsApp',
    description: 'Como configurar e gerenciar múltiplos atendentes no mesmo número de WhatsApp com o Tappy Whats.',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
    duration: 28,
    level: 'iniciante',
    tags: ['WhatsApp', 'Atendimento', 'Equipe'],
    date: '2025-04-08T14:30:00Z',
    views: 3180,
    rating: 4.9,
    author: MOCK_AUTHORS.julia_ux
  },
  {
    id: '8',
    slug: 'api-tappy-nodejs',
    title: 'Utilizando a API da Tappy com Node.js',
    description: 'Guia completo de como integrar as APIs da Tappy em aplicações Node.js, com exemplos práticos.',
    thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    duration: 52,
    level: 'avancado',
    tags: ['API', 'Node.js', 'Desenvolvimento'],
    date: '2025-04-05T16:00:00Z',
    views: 1870,
    rating: 4.7,
    author: MOCK_AUTHORS.marcos_dev
  },
  {
    id: '9',
    slug: 'dashboards-personalizados',
    title: 'Criando dashboards personalizados',
    description: 'Como criar e personalizar dashboards para monitoramento de performance dos produtos Tappy.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    duration: 40,
    level: 'intermediario',
    tags: ['Dashboard', 'Analytics', 'Personalização'],
    date: '2025-04-02T11:15:00Z',
    views: 1450,
    rating: 4.6,
    author: MOCK_AUTHORS.julia_ux
  },
  {
    id: '10',
    slug: 'otimizando-performance-tappy',
    title: 'Otimizando a performance de integrações Tappy',
    description: 'Técnicas avançadas para melhorar a performance e escalabilidade das suas integrações com a Tappy.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1115&q=80',
    duration: 48,
    level: 'avancado',
    tags: ['Performance', 'Escalabilidade', 'Otimização'],
    date: '2025-03-28T15:30:00Z',
    views: 980,
    rating: 4.8,
    author: MOCK_AUTHORS.rafael_tech
  },
  {
    id: '11',
    slug: 'integracao-zapier',
    title: 'Integrando Tappy com Zapier',
    description: 'Como conectar suas aplicações Tappy com centenas de outros serviços através do Zapier.',
    thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80',
    duration: 35,
    level: 'iniciante',
    tags: ['Zapier', 'Integração', 'Automação'],
    date: '2025-03-25T09:45:00Z',
    views: 2140,
    rating: 4.5,
    author: MOCK_AUTHORS.carla_dev,
    isNew: true
  },
  {
    id: '12',
    slug: 'tappy-integracao-excel',
    title: 'Exportação e importação de dados com Excel',
    description: 'Como importar e exportar dados entre a plataforma Tappy e planilhas Excel para análises avançadas.',
    thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    duration: 30,
    level: 'iniciante',
    tags: ['Excel', 'Dados', 'Importação'],
    date: '2025-03-22T13:00:00Z',
    views: 2560,
    rating: 4.4,
    author: MOCK_AUTHORS.ana_santos
  }
];

// Tags disponíveis para filtro
const AVAILABLE_TAGS = [
  'Tappy Whats', 'Tappy Imob', 'Tappy ID', 'API', 'WhatsApp', 'Chatbot', 
  'Integração', 'CRM', 'Segurança', 'Webhooks', 'Node.js', 'Dashboard', 
  'Performance', 'Zapier', 'Excel', 'Automação', 'IA'
];

export default function TutoriaisPage() {
  // Estado para os filtros
  const [filters, setFilters] = useState({
    category: 'todos' as TutorialCategory,
    level: 'todos' as TutorialLevel,
    sort: 'recentes' as TutorialSort,
    search: '',
    tags: [] as string[]
  });
  
  // Estado para os tutoriais filtrados
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>(MOCK_TUTORIALS);
  
  // Encontrar o tutorial em destaque
  const featuredTutorial = MOCK_TUTORIALS.find(tutorial => tutorial.isFeatured);
  
  // Aplicar filtros
  useEffect(() => {
    let result = [...MOCK_TUTORIALS];
    
    // Filtrar por categoria
    if (filters.category !== 'todos') {
      const categoryMap: Record<TutorialCategory, string[]> = {
        'todos': [],
        'tappy-whats': ['Tappy Whats', 'WhatsApp', 'Chatbot'],
        'tappy-imob': ['Tappy Imob', 'CRM', 'Imobiliário'],
        'tappy-id': ['Tappy ID', 'Autenticação', 'Segurança'],
        'integracao': ['Integração', 'API', 'Webhooks', 'Zapier'],
        'api': ['API', 'Node.js', 'Desenvolvimento']
      };
      
      const categoryTags = categoryMap[filters.category];
      if (categoryTags.length > 0) {
        result = result.filter(tutorial => 
          tutorial.tags.some(tag => categoryTags.includes(tag))
        );
      }
    }
    
    // Filtrar por nível
    if (filters.level !== 'todos') {
      result = result.filter(tutorial => tutorial.level === filters.level);
    }
    
    // Filtrar por tags
    if (filters.tags.length > 0) {
      result = result.filter(tutorial => 
        filters.tags.some(tag => tutorial.tags.includes(tag))
      );
    }
    
    // Filtrar por busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchLower) || 
        tutorial.description.toLowerCase().includes(searchLower) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Ordenar
    result = result.sort((a, b) => {
      switch (filters.sort) {
        case 'recentes':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'populares':
          return b.views - a.views;
        case 'melhor-avaliados':
          return b.rating - a.rating;
        case 'duracao':
          return a.duration - b.duration;
        default:
          return 0;
      }
    });
    
    setFilteredTutorials(result);
  }, [filters]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Hero da página */}
        <section className="w-full bg-gradient-to-b from-gray-900 to-background dark:from-black dark:to-background border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Tutoriais & Guias Tappy
                </h1>
                
                <p className="text-lg text-gray-300 mb-8">
                  Aprenda a utilizar todo o potencial das plataformas Tappy com nossos tutoriais passo a passo, vídeos detalhados e guias práticos.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="gap-2 bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Comece por aqui</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-gray-600 text-black  hover:text-tappyGreen hover:border-tappyGreen"
                  >
                    <Youtube className="h-4 w-4" />
                    <span>Canal do YouTube</span>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl hidden md:block"
              >
                {featuredTutorial && (
                  <>
                    <Image
                      src={featuredTutorial.thumbnail}
                      alt="Tutorial em destaque"
                      fill
                      className="object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tappyGreen text-black">
                          Em destaque
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        {featuredTutorial.title}
                      </h3>
                      
                      <div className="flex items-center">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-tappyGreen text-black mr-3">
                          <Play className="h-5 w-5" />
                        </button>
                        
                        <div>
                          <p className="text-white text-sm font-medium">
                            Assistir agora
                          </p>
                          <p className="text-gray-300 text-xs">
                            {featuredTutorial.duration} minutos
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Filtros e conteúdo principal */}
        <section className="container mx-auto px-4 py-12">
          {/* Sistema de filtros */}
          <div className="mb-10">
            <TutorialFilters 
              filters={filters}
              onChange={setFilters}
              availableTags={AVAILABLE_TAGS}
            />
          </div>
          
          {/* Contagem de resultados */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} encontrado{filteredTutorials.length !== 1 ? 's' : ''}
            </h2>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full border-gray-200 dark:border-gray-700"
              >
                <Rss className="h-4 w-4" />
                <span>RSS</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full border-gray-200 dark:border-gray-700"
              >
                <Users className="h-4 w-4" />
                <span>Colaborar</span>
              </Button>
            </div>
          </div>
          
          {/* Grid de tutoriais */}
          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial, index) => (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhum tutorial encontrado
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Tente ajustar seus filtros ou buscar por outros termos.
              </p>
              
              <Button
                onClick={() => setFilters({
                  category: 'todos',
                  level: 'todos',
                  sort: 'recentes',
                  search: '',
                  tags: []
                })}
              >
                Limpar filtros
              </Button>
            </div>
          )}
          
          {/* Área de inscrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 p-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Receba novos tutoriais por e-mail
            </h3>
            
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Inscreva-se para receber os mais recentes tutoriais, dicas e novidades sobre as plataformas Tappy diretamente em sua caixa de entrada.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-tappyGreen focus:border-transparent transition-all"
                required
              />
              
              <Button 
                type="submit"
                className="bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium py-3 px-6"
              >
                Inscrever-se
              </Button>
            </form>
            
            <p className="text-gray-400 text-sm mt-4">
              Prometemos não enviar spam e você pode cancelar a qualquer momento.
            </p>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
