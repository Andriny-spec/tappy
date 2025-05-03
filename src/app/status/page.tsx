"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Rss, Server, Activity, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { StatusType } from '@/components/status/status-indicator';
import { ServiceCard, Service, ServiceIncident } from '@/components/status/service-card';
import { StatusOverview } from '@/components/status/status-overview';
import { Button } from '@/components/ui/button';

// Dados de exemplo - Na implementação real seriam carregados de uma API
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'API Principal',
    description: 'API central de serviços Tappy',
    status: 'operational',
    uptime: 99.98,
    lastIncident: '2025-01-15T08:30:00Z',
    category: 'core',
    incidents: [
      {
        id: 'inc1',
        date: '2025-01-15T08:30:00Z',
        title: 'Lentidão de resposta',
        description: 'Alguns endpoints estavam experimentando tempos de resposta mais longos que o normal devido a um aumento de tráfego.',
        status: 'degraded',
        updatedAt: '2025-01-15T10:45:00Z',
        resolved: true,
        resolutionTime: '2h 15min'
      }
    ]
  },
  {
    id: '2',
    name: 'Tappy Link',
    description: 'Serviço de bio links e redirecionamento',
    status: 'operational',
    uptime: 99.96,
    category: 'product',
    incidents: []
  },
  {
    id: '3',
    name: 'Tappy Whats',
    description: 'Plataforma de integração e automação WhatsApp',
    status: 'operational',
    uptime: 99.92,
    lastIncident: '2025-02-22T14:15:00Z',
    category: 'product',
    incidents: [
      {
        id: 'inc2',
        date: '2025-02-22T14:15:00Z',
        title: 'Dificuldade na sincronização de mensagens',
        description: 'Alguns usuários experimentaram atrasos na sincronização de mensagens entre dispositivos.',
        status: 'degraded',
        updatedAt: '2025-02-22T16:30:00Z',
        resolved: true,
        resolutionTime: '2h 15min'
      }
    ]
  },
  {
    id: '4',
    name: 'Tappy Imob',
    description: 'Sistema de gestão imobiliária',
    status: 'degraded',
    uptime: 98.75,
    lastIncident: '2025-05-01T09:45:00Z',
    category: 'product',
    incidents: [
      {
        id: 'inc3',
        date: '2025-05-01T09:45:00Z',
        title: 'Processamento de imagens lento',
        description: 'O módulo de uploads e processamento de imagens está operando com capacidade reduzida.',
        status: 'degraded',
        updatedAt: '2025-05-02T10:30:00Z',
        resolved: false
      }
    ]
  },
  {
    id: '5',
    name: 'Sistema de Pagamentos',
    description: 'Processamento de pagamentos e faturas',
    status: 'operational',
    uptime: 99.99,
    category: 'payment',
    incidents: []
  },
  {
    id: '6',
    name: 'Autenticação',
    description: 'Serviços de login e autenticação',
    status: 'operational',
    uptime: 99.95,
    category: 'security',
    incidents: []
  },
  {
    id: '7',
    name: 'Banco de Dados Principal',
    description: 'Armazenamento persistente de dados',
    status: 'maintenance',
    uptime: 99.90,
    lastIncident: '2025-05-02T08:00:00Z',
    category: 'infrastructure',
    incidents: [
      {
        id: 'inc4',
        date: '2025-05-02T08:00:00Z',
        title: 'Manutenção programada',
        description: 'Atualização de versão e ajustes de performance no banco de dados.',
        status: 'maintenance',
        updatedAt: '2025-05-02T08:00:00Z',
        resolved: false
      }
    ]
  },
  {
    id: '8',
    name: 'CDN e Armazenamento',
    description: 'Rede de distribuição e storage',
    status: 'operational',
    uptime: 99.98,
    category: 'infrastructure',
    incidents: []
  },
  {
    id: '9',
    name: 'Painel Administrativo',
    description: 'Interface de gestão para administradores',
    status: 'operational',
    uptime: 99.97,
    category: 'admin',
    incidents: []
  },
  {
    id: '10',
    name: 'Monitoramento em Tempo Real',
    description: 'Sistema de logs e alertas',
    status: 'operational',
    uptime: 99.94,
    category: 'monitoring',
    incidents: []
  }
];

// Categorias de serviços
const SERVICE_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'core', label: 'Core' },
  { id: 'product', label: 'Produtos' },
  { id: 'infrastructure', label: 'Infraestrutura' },
  { id: 'security', label: 'Segurança' },
  { id: 'payment', label: 'Pagamentos' },
  { id: 'admin', label: 'Admin' },
  { id: 'monitoring', label: 'Monitoramento' }
];

export default function StatusPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredServices, setFilteredServices] = useState<Service[]>(MOCK_SERVICES);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  
  // Filtragem por categoria
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredServices(MOCK_SERVICES);
    } else {
      setFilteredServices(MOCK_SERVICES.filter(service => service.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Handler para expandir/colapsar um serviço
  const toggleServiceExpand = (serviceId: string) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };
  
  // Simulação de inscrição em notificações
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui seria a integração com a API de notificações
    if (email) {
      // Simular um processamento
      setTimeout(() => {
        setIsSubscribed(true);
        setEmail('');
      }, 1000);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Status da Plataforma Tappy
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Monitoramento em tempo real da disponibilidade dos nossos serviços
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full border-gray-200 dark:border-gray-700"
              >
                <Rss className="h-4 w-4" />
                <span>RSS</span>
              </Button>
            </div>
          </div>
          
          {/* Visão geral do status */}
          <StatusOverview 
            services={MOCK_SERVICES}
            lastUpdated={new Date().toISOString()}
          />
        </section>
        
        {/* Lista de serviços */}
        <section className="container mx-auto px-4 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Server className="mr-2 h-5 w-5 text-tappyGreen" />
              Serviços e Componentes
            </h2>
            
            <div className="mt-4 md:mt-0">
              <Tabs defaultValue="all" onValueChange={setActiveCategory}>
                <TabsList className="bg-white/20 dark:bg-gray-800/20 p-1 rounded-xl overflow-x-auto flex-nowrap">
                  {SERVICE_CATEGORIES.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="rounded-lg whitespace-nowrap data-[state=active]:bg-tappyGreen data-[state=active]:text-black"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="space-y-4 mb-12">
            {filteredServices.map((service, index) => (
              <ServiceCard 
                key={service.id}
                service={service}
                expanded={expandedService === service.id}
                onClick={() => toggleServiceExpand(service.id)}
                index={index}
              />
            ))}
          </div>
          
          {/* Inscrever-se em notificações */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start md:items-center flex-col md:flex-row">
              <div className="md:mr-6 mb-4 md:mb-0">
                <div className="bg-tappyGreen/10 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-tappyGreen" />
                </div>
              </div>
              
              <div className="flex-grow">
                {isSubscribed ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Inscrição realizada com sucesso!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Você receberá notificações sobre atualizações de status dos nossos serviços.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Inscreva-se para receber notificações
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Seja notificado quando houver alterações no status dos nossos serviços.
                    </p>
                    
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                      <input 
                        type="email"
                        placeholder="Seu e-mail"
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tappyGreen focus:border-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button 
                        type="submit"
                        className="bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium"
                      >
                        Inscrever-se
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
