"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, CourseCard, CourseType, DifficultyLevel } from '@/components/treinamentos/course-card';
import { FilterSystem, CourseFilters } from '@/components/treinamentos/filter-system';
import { VideoPlayer } from '@/components/treinamentos/video-player';
import { ProgressCard } from '@/components/treinamentos/progress-card';
import { HeroParticles } from '@/components/treinamentos/hero-particles';
import { GraduationCap, BookOpen, Search, Layers } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function TreinamentosPage() {
  // Estados para o sistema de filtragem e exibição
  const [filters, setFilters] = useState<CourseFilters>({
    courseType: 'all',
    difficulty: 'all',
    category: 'all',
    search: '',
  });
  const [activeTab, setActiveTab] = useState<string>('todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState<boolean>(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  // Estados para armazenar dados do usuário (simulados)
  const [userCourses, setUserCourses] = useState<{
    completed: Course[];
    inProgress: Course[];
  }>({
    completed: [],
    inProgress: [],
  });

  // Dados simulados de categorias
  const categories = [
    { id: 'introducao', name: 'Introdução' },
    { id: 'configuracao', name: 'Configuração inicial' },
    { id: 'integracao', name: 'Integrações' },
    { id: 'customizacao', name: 'Customização' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'avancado', name: 'Recursos avançados' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'vendas', name: 'Vendas e conversão' },
    { id: 'suporte', name: 'Suporte' }
  ];

  // Dados simulados de cursos
  const mockCourses: Course[] = [
    // Tappy Link - Introdução e básicos
    {
      id: 'link-intro-1',
      title: 'Introdução ao Tappy Link',
      description: 'Aprenda os conceitos básicos do Tappy Link e como ele pode ajudar seu negócio a ter presença digital.',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 15,
      videoUrl: 'https://player.vimeo.com/external/459400653.hd.mp4?s=9ac2f6d4f36dd207d97b89a8ca535499da8b2f66&profile_id=175&oauth2_token_id=57447761',
      instructor: 'Ana Silva',
      courseType: 'tappy-link',
      category: 'introducao',
      difficulty: 'iniciante',
      tags: ['introdução', 'básico', 'fundamentos'],
      progress: 85,
    },
    {
      id: 'link-setup-1',
      title: 'Configurando seu primeiro Tappy Link',
      description: 'Um guia completo para configurar seu Tappy Link do zero, incluindo personalização e otimização.',
      thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 25,
      videoUrl: 'https://player.vimeo.com/external/371580397.hd.mp4?s=f28f556cf4ce371aa93e8e01c43ac2f40b5ec95c&profile_id=175&oauth2_token_id=57447761',
      instructor: 'Carlos Mendes',
      courseType: 'tappy-link',
      category: 'configuracao',
      difficulty: 'iniciante',
      tags: ['configuração', 'setup', 'personalização'],
      progress: 25,
    },
    {
      id: 'link-custom-1',
      title: 'Personalizando a aparência do seu Tappy Link',
      description: 'Técnicas avançadas de design para criar um Tappy Link único e alinhado à sua marca.',
      thumbnail: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 35,
      videoUrl: 'https://player.vimeo.com/external/496796533.hd.mp4?s=1a41e82cf91bdcc39aee0fe87d6fab1e403edf6a&profile_id=174&oauth2_token_id=57447761',
      instructor: 'Daniel Costa',
      courseType: 'tappy-link',
      category: 'customizacao',
      difficulty: 'intermediario',
      tags: ['design', 'customização', 'branding'],
      completed: true,
    },
    {
      id: 'link-analytics-1',
      title: 'Análise de dados e métricas do Tappy Link',
      description: 'Como interpretar os dados de visitantes e conversões para otimizar resultados de negócio.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 40,
      videoUrl: 'https://player.vimeo.com/external/368320203.hd.mp4?s=388df493dfde51aca12f57c4755a76391265a1ac&profile_id=175&oauth2_token_id=57447761',
      instructor: 'Roberta Almeida',
      courseType: 'tappy-link',
      category: 'analytics',
      difficulty: 'avancado',
      tags: ['analytics', 'dados', 'métricas', 'otimização'],
    },
    
    // Tappy Whats - Introdução e básicos
    {
      id: 'whats-intro-1',
      title: 'Introdução ao Tappy Whats',
      description: 'Conheça o Tappy Whats e como ele revoluciona o atendimento e vendas via WhatsApp.',
      thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 20,
      videoUrl: 'https://player.vimeo.com/external/478575613.hd.mp4?s=c902e7b9c34eeaf65cd8d62e5c945644be6bffb5&profile_id=174&oauth2_token_id=57447761',
      instructor: 'Felipe Santos',
      courseType: 'tappy-whats',
      category: 'introducao',
      difficulty: 'iniciante',
      tags: ['whatsapp', 'introdução', 'chat'],
      progress: 45,
    },
    {
      id: 'whats-automacao-1',
      title: 'Automação de mensagens no Tappy Whats',
      description: 'Construa fluxos de atendimento automático para aumentar a produtividade da sua equipe.',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 35,
      videoUrl: 'https://player.vimeo.com/external/552650017.hd.mp4?s=98a3e45234c65fc63b5bcac3e4648e55ae5f154f&profile_id=174&oauth2_token_id=57447761',
      instructor: 'Juliana Martins',
      courseType: 'tappy-whats',
      category: 'avancado',
      difficulty: 'intermediario',
      tags: ['automação', 'mensagens', 'chatbot'],
    },
    {
      id: 'whats-integracao-1',
      title: 'Integrando Tappy Whats com seu CRM',
      description: 'Como integrar seu sistema de CRM com o Tappy Whats para gestão completa do relacionamento com clientes.',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 45,
      videoUrl: 'https://player.vimeo.com/external/439545862.hd.mp4?s=379e95bca7d8b649e14200cd09d0b66b31d42e56&profile_id=175&oauth2_token_id=57447761',
      instructor: 'Ricardo Oliveira',
      courseType: 'tappy-whats',
      category: 'integracao',
      difficulty: 'avancado',
      tags: ['CRM', 'integração', 'sistemas'],
      completed: true,
    },
    
    // Tappy Imob - Introdução e básicos
    {
      id: 'imob-intro-1',
      title: 'Introdução ao Tappy Imob',
      description: 'Conheça a solução completa para imobiliárias digitalizarem seus processos de vendas e locação.',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 25,
      videoUrl: 'https://player.vimeo.com/external/535025260.hd.mp4?s=861d3700afe1de9b99fc9c7c194db131c5806b0c&profile_id=174&oauth2_token_id=57447761',
      instructor: 'Marcela Souza',
      courseType: 'tappy-imob',
      category: 'introducao',
      difficulty: 'iniciante',
      tags: ['imobiliária', 'introdução', 'gestão'],
    },
    {
      id: 'imob-imoveis-1',
      title: 'Cadastrando imóveis no Tappy Imob',
      description: 'Aprenda a cadastrar e organizar seu portfólio de imóveis de forma eficiente e completa.',
      thumbnail: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 30,
      videoUrl: 'https://player.vimeo.com/external/437806988.hd.mp4?s=f70414eb7409a8c9d5156a4b1c9a7796d3cb7bca&profile_id=174&oauth2_token_id=57447761',
      instructor: 'Victor Mendes',
      courseType: 'tappy-imob',
      category: 'configuracao',
      difficulty: 'iniciante',
      tags: ['cadastro', 'imóveis', 'portfólio'],
      progress: 60,
    },
    {
      id: 'imob-marketing-1',
      title: 'Marketing digital para imobiliárias com Tappy Imob',
      description: 'Estratégias e táticas de marketing digital específicas para o mercado imobiliário.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1015&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 50,
      videoUrl: 'https://player.vimeo.com/external/537591291.hd.mp4?s=7d1db25a8b5b8ee5efbd2e22c4fe7500b8899d9d&profile_id=174&oauth2_token_id=57447761',
      instructor: 'Camila Ferreira',
      courseType: 'tappy-imob',
      category: 'marketing',
      difficulty: 'intermediario',
      tags: ['marketing', 'leads', 'conversão'],
    },
    {
      id: 'imob-vendas-1',
      title: 'Maximizando vendas com Tappy Imob',
      description: 'Técnicas avançadas para aumentar fechamentos e comissões utilizando os recursos do Tappy Imob.',
      thumbnail: 'https://images.unsplash.com/photo-1616587894289-86480e533129?q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      duration: 45,
      videoUrl: 'https://player.vimeo.com/external/513683699.hd.mp4?s=2ae1f5c9452c1b727f2ffc9cbd4bb8860c271283&profile_id=174&oauth2_token_id=57447761',
      instructor: 'Bruno Alves',
      courseType: 'tappy-imob',
      category: 'vendas',
      difficulty: 'avancado',
      tags: ['vendas', 'negociação', 'fechamento'],
      completed: true,
    },
  ];

  // Simular cursos do usuário no carregamento inicial
  useEffect(() => {
    // Encontrar cursos concluídos e em progresso
    const completedCourses = mockCourses.filter(course => course.completed);
    const inProgressCourses = mockCourses.filter(course => course.progress && !course.completed);
    
    setUserCourses({
      completed: completedCourses,
      inProgress: inProgressCourses
    });
    
    // Inicializar com todos os cursos
    setFilteredCourses(mockCourses);
  }, []);

  // Filtrar cursos com base nos filtros selecionados
  useEffect(() => {
    // Determinar quais cursos exibir com base na tab ativa
    let coursesToFilter = mockCourses;
    
    if (activeTab === 'em-andamento') {
      coursesToFilter = userCourses.inProgress;
    } else if (activeTab === 'concluidos') {
      coursesToFilter = userCourses.completed;
    }
    
    // Aplicar filtros
    const filtered = coursesToFilter.filter(course => {
      // Filtrar por tipo de curso
      if (filters.courseType !== 'all' && course.courseType !== filters.courseType) {
        return false;
      }
      
      // Filtrar por nível de dificuldade
      if (filters.difficulty !== 'all' && course.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Filtrar por categoria
      if (filters.category !== 'all' && course.category !== filters.category) {
        return false;
      }
      
      // Filtrar por termo de busca
      if (filters.search && !course.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !course.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setFilteredCourses(filtered);
  }, [filters, activeTab, userCourses]);

  // Abrir o player de vídeo
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsVideoPlayerOpen(true);
  };

  // Fechar o player de vídeo
  const handleCloseVideo = () => {
    setIsVideoPlayerOpen(false);
    setSelectedCourse(null);
  };

  // Marcar um curso como concluído
  const handleCourseComplete = () => {
    if (!selectedCourse) return;
    
    // Atualizar o curso como concluído
    const updatedCourse = { ...selectedCourse, completed: true, progress: 100 };
    
    // Atualizar as listas de cursos
    setUserCourses(prev => ({
      completed: [...prev.completed.filter(c => c.id !== updatedCourse.id), updatedCourse],
      inProgress: prev.inProgress.filter(c => c.id !== updatedCourse.id)
    }));
    
    // Fechar o player
    handleCloseVideo();
  };

  // Atualizar o progresso de um curso
  const handleProgressUpdate = (progress: number) => {
    if (!selectedCourse) return;
    
    // Só atualizar se for maior que o progresso atual
    if (!selectedCourse.progress || progress > selectedCourse.progress) {
      const updatedCourse = { ...selectedCourse, progress };
      
      // Verificar se o curso já está na lista de em andamento
      const isInProgress = userCourses.inProgress.some(c => c.id === updatedCourse.id);
      
      setUserCourses(prev => ({
        completed: prev.completed.filter(c => c.id !== updatedCourse.id),
        inProgress: isInProgress 
          ? prev.inProgress.map(c => c.id === updatedCourse.id ? updatedCourse : c)
          : [...prev.inProgress, updatedCourse]
      }));
      
      // Atualizar o curso selecionado
      setSelectedCourse(updatedCourse);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Hero Section com Partículas */}
        <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
          <HeroParticles />
          
          <div className="container px-4 mx-auto text-center relative z-10">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                Treinamentos
              </span> Tappy
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Aprenda a utilizar as soluções Tappy e maximize seus resultados com nossos treinamentos exclusivos
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg">
                <GraduationCap className="h-5 w-5 text-tappyGreen mr-2" />
                <span className="text-sm font-medium">{mockCourses.length} Treinamentos disponíveis</span>
              </div>
              
              <div className="flex items-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg">
                <BookOpen className="h-5 w-5 text-tappyGreen mr-2" />
                <span className="text-sm font-medium">Conteúdo atualizado regularmente</span>
              </div>
              
              <div className="flex items-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg">
                <Layers className="h-5 w-5 text-tappyGreen mr-2" />
                <span className="text-sm font-medium">Do básico ao avançado</span>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Conteúdo Principal */}
        <section className="container px-4 mx-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar com progresso do usuário */}
            <div className="lg:col-span-1">
              <ProgressCard 
                completedCourses={userCourses.completed}
                inProgressCourses={userCourses.inProgress}
                totalCourses={mockCourses.length}
                onContinueCourse={handleCourseClick}
              />
            </div>
            
            {/* Área de cursos principal */}
            <div className="lg:col-span-2">
              {/* Sistema de filtros */}
              <FilterSystem 
                filters={filters}
                onChange={setFilters}
                categories={categories}
              />
              
              {/* Tabs para alternar entre todos os cursos, em andamento e concluídos */}
              <Tabs 
                defaultValue="todos" 
                className="mb-8"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="em-andamento">Em andamento</TabsTrigger>
                  <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Mensagem se não houver cursos correspondentes aos filtros */}
              {filteredCourses.length === 0 && (
                <div className="text-center py-16 bg-white/10 dark:bg-gray-800/20 rounded-xl border border-gray-200 dark:border-gray-700">
                  <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nenhum curso encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Não encontramos cursos correspondentes aos filtros selecionados. 
                    Tente remover alguns filtros ou buscar por outro termo.
                  </p>
                </div>
              )}
              
              {/* Grid de cursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard 
                    key={course.id}
                    course={course}
                    onClick={handleCourseClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Player de vídeo */}
      <AnimatePresence>
        {isVideoPlayerOpen && selectedCourse && (
          <VideoPlayer 
            course={selectedCourse}
            onClose={handleCloseVideo}
            onComplete={handleCourseComplete}
            onProgressUpdate={handleProgressUpdate}
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </>
  );
}
