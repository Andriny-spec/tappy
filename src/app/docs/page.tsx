"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Book, BookOpen, Code, Globe, Lightbulb, Rocket, Terminal, FileText, ExternalLink, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { DocNavigation, DocSection } from '@/components/documentacao/doc-navigation';
import { cn } from '@/lib/utils';

// Dados de navegação para a documentação
const DOC_SECTIONS: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Introdução',
    icon: <Rocket className="h-4 w-4 text-tappyGreen mr-2" />,
    defaultOpen: true,
    items: [
      { id: 'overview', title: 'Visão Geral', href: '/docs/introducao/visao-geral' },
      { id: 'setup', title: 'Primeiros Passos', href: '/docs/introducao/primeiros-passos', isNew: true },
      { id: 'authentication', title: 'Autenticação', href: '/docs/introducao/autenticacao' },
      { id: 'platforms', title: 'Plataformas Suportadas', href: '/docs/introducao/plataformas' },
    ],
  },
  {
    id: 'tappy-whats',
    title: 'Tappy Whats',
    icon: <Globe className="h-4 w-4 text-tappyGreen mr-2" />,
    items: [
      { id: 'whats-overview', title: 'Visão Geral', href: '/docs/tappy-whats/visao-geral' },
      { id: 'whats-integration', title: 'Integrações', href: '/docs/tappy-whats/integracoes' },
      { id: 'whats-api', title: 'API de Mensagens', href: '/docs/tappy-whats/api-mensagens', isUpdated: true },
      { id: 'whats-chatbot', title: 'Criando Chatbots', href: '/docs/tappy-whats/criando-chatbots' },
    ],
  },
  {
    id: 'tappy-imob',
    title: 'Tappy Imob',
    icon: <FileText className="h-4 w-4 text-tappyGreen mr-2" />,
    items: [
      { id: 'imob-overview', title: 'Visão Geral', href: '/docs/tappy-imob/visao-geral' },
      { id: 'imob-listings', title: 'Gerenciamento de Imóveis', href: '/docs/tappy-imob/gerenciamento-imoveis' },
      { id: 'imob-sync', title: 'Sincronização com Portais', href: '/docs/tappy-imob/sincronizacao-portais' },
      { id: 'imob-crm', title: 'CRM Imobiliário', href: '/docs/tappy-imob/crm' },
    ],
  },
  {
    id: 'tappy-id',
    title: 'Tappy ID',
    icon: <BookOpen className="h-4 w-4 text-tappyGreen mr-2" />,
    items: [
      { id: 'id-overview', title: 'Visão Geral', href: '/docs/tappy-id/visao-geral' },
      { id: 'id-setup', title: 'Configuração', href: '/docs/tappy-id/configuracao' },
      { id: 'id-auth', title: 'Fluxo de Autenticação', href: '/docs/tappy-id/fluxo-autenticacao', isNew: true },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrações',
    icon: <Terminal className="h-4 w-4 text-tappyGreen mr-2" />,
    items: [
      { id: 'webhooks', title: 'Webhooks', href: '/docs/integracoes/webhooks' },
      { id: 'third-party', title: 'Serviços de Terceiros', href: '/docs/integracoes/servicos-terceiros' },
      { id: 'zapier', title: 'Zapier', href: '/docs/integracoes/zapier', isNew: true },
    ],
  },
  {
    id: 'dev-resources',
    title: 'Recursos para Desenvolvedores',
    icon: <Code className="h-4 w-4 text-tappyGreen mr-2" />,
    items: [
      { id: 'sdks', title: 'SDKs', href: '/docs/recursos/sdks' },
      { id: 'samples', title: 'Exemplos de Código', href: '/docs/recursos/exemplos' },
      { id: 'libraries', title: 'Bibliotecas', href: '/docs/recursos/bibliotecas' },
    ],
  },
];

// Interface para cards de destaque
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  delay?: number;
}

// Card de recurso em destaque
function FeatureCard({ icon, title, description, href, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:border-tappyGreen dark:hover:border-tappyGreen transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-tappyGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-tappyGreen/10 group-hover:bg-tappyGreen/20 transition-colors" />
      
      <div className="relative">
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-tappyGreen/10 p-3 text-tappyGreen">
          {icon}
        </div>
        
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-tappyGreen transition-colors">
          {title}
        </h3>
        
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        
        <Link href={href} className="inline-flex items-center text-sm font-medium text-tappyGreen hover:underline">
          <span>Saiba mais</span>
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function DocsPage() {
  const [activeSearch, setActiveSearch] = useState<string>('');

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 pb-20">
        {/* Hero da documentação */}
        <section className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center rounded-full bg-tappyGreen/10 p-2">
                  <Book className="h-8 w-8 text-tappyGreen" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Documentação da Plataforma Tappy
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Tudo o que você precisa para começar a usar, integrar e personalizar os produtos Tappy com facilidade
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium"
                >
                  <Rocket className="h-4 w-4" />
                  <span>Primeiros Passos</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Code className="h-4 w-4" />
                  <span>API Reference</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Busca e navegação principal */}
        <section className="container mx-auto px-4 my-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar de navegação */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <DocNavigation 
                  sections={DOC_SECTIONS}
                  activePath={activeSearch}
                />
              </div>
            </div>
            
            {/* Conteúdo central */}
            <div className="lg:col-span-9">
              {/* Cards de produtos em destaque */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <FeatureCard
                  icon={<Globe className="h-6 w-6" />}
                  title="Tappy Whats"
                  description="Conecte-se à API do WhatsApp Business e crie automações inteligentes para seu negócio."
                  href="/docs/tappy-whats/visao-geral"
                  delay={0}
                />
                
                <FeatureCard
                  icon={<FileText className="h-6 w-6" />}
                  title="Tappy Imob"
                  description="Gerencie seus imóveis, sincronize com portais e automatize seu negócio imobiliário."
                  href="/docs/tappy-imob/visao-geral"
                  delay={1}
                />
                
                <FeatureCard
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Tappy ID"
                  description="Autenticação única e segura para toda a plataforma Tappy e suas integrações."
                  href="/docs/tappy-id/visao-geral"
                  delay={2}
                />
                
                <FeatureCard
                  icon={<Lightbulb className="h-6 w-6" />}
                  title="Tappy Link"
                  description="Crie links personalizados e acompanhe estatísticas de acesso em tempo real."
                  href="/docs/tappy-link/visao-geral"
                  delay={3}
                />
              </div>
              
              {/* Guias de início rápido */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Guias de Início Rápido
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Configurando seu primeiro chatbot",
                      href: "/docs/tappy-whats/chatbot-quickstart",
                      time: "5 min"
                    },
                    {
                      title: "Integração com MLS imobiliário",
                      href: "/docs/tappy-imob/mls-quickstart",
                      time: "10 min"
                    },
                    {
                      title: "Autenticação via Tappy ID",
                      href: "/docs/tappy-id/auth-quickstart",
                      time: "3 min"
                    },
                    {
                      title: "Webhooks para notificações",
                      href: "/docs/integracoes/webhooks-quickstart",
                      time: "7 min"
                    },
                    {
                      title: "SDK para Node.js",
                      href: "/docs/recursos/node-sdk-quickstart",
                      time: "8 min"
                    },
                    {
                      title: "Dashboard para gestão",
                      href: "/docs/recursos/dashboard-quickstart",
                      time: "4 min"
                    },
                  ].map((guide, i) => (
                    <Link
                      key={i}
                      href={guide.href}
                      className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-tappyGreen dark:hover:border-tappyGreen bg-white dark:bg-gray-800 group transition-colors"
                    >
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-tappyGreen transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Tempo estimado: {guide.time}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0 ml-4">
                        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-tappyGreen/10 transition-colors">
                          <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-tappyGreen transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
              
              {/* Recursos adicionais */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Recursos Adicionais
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Referência da API
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Documentação completa das APIs Tappy com exemplos e guias passo a passo.
                    </p>
                    <Link 
                      href="/api-docs"
                      className="inline-flex items-center text-sm font-medium text-tappyGreen hover:underline"
                    >
                      <span>Ver documentação</span>
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Tutoriais em Vídeo
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Aprenda visualmente com nossos tutoriais que abordam casos de uso comuns.
                    </p>
                    <Link 
                      href="/tutoriais"
                      className="inline-flex items-center text-sm font-medium text-tappyGreen hover:underline"
                    >
                      <span>Ver tutoriais</span>
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Comunidade
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Conecte-se com outros desenvolvedores, faça perguntas e compartilhe conhecimento.
                    </p>
                    <Link 
                      href="/comunidade"
                      className="inline-flex items-center text-sm font-medium text-tappyGreen hover:underline"
                    >
                      <span>Acessar comunidade</span>
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
