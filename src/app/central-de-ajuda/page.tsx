"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Headphones, 
  Phone, 
  Mail, 
  Send, 
  ChevronRight,
  Book,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Componente de card de artigo
const ArticleCard = ({ title, category, iconName, link }) => {
  const iconMap = {
    'chat': <MessageCircle className="w-5 h-5" />,
    'account': <HelpCircle className="w-5 h-5" />,
    'setup': <Headphones className="w-5 h-5" />,
    'billing': <Phone className="w-5 h-5" />,
    'api': <Mail className="w-5 h-5" />,
    'docs': <FileText className="w-5 h-5" />,
    'guide': <Book className="w-5 h-5" />,
  };
  
  return (
    <Link href={link} className="block">
      <div className="h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all hover:border-tappyGreen/50">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-tappyGreen/10 flex items-center justify-center text-tappyGreen mr-4 flex-shrink-0">
            {iconMap[iconName] || <HelpCircle className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Categorias de ajuda
const helpCategories = [
  {
    title: 'Tappy Whats',
    description: 'Automação e gestão de WhatsApp',
    articles: 24,
    color: 'from-green-500 to-green-700'
  },
  {
    title: 'Tappy Imob',
    description: 'CRM para imobiliárias',
    articles: 18,
    color: 'from-blue-500 to-blue-700'
  },
  {
    title: 'Tappy ID',
    description: 'Gestão de identidade e acesso',
    articles: 12,
    color: 'from-purple-500 to-purple-700'
  },
  {
    title: 'Tappy Link',
    description: 'Encurtador de links inteligente',
    articles: 9,
    color: 'from-orange-500 to-orange-700'
  },
  {
    title: 'Cobrança e Assinaturas',
    description: 'Pagamentos e faturas',
    articles: 15,
    color: 'from-red-500 to-red-700'
  },
  {
    title: 'API e Integrações',
    description: 'Desenvolvimento e integrações',
    articles: 21,
    color: 'from-gray-500 to-gray-700'
  },
];

// Artigos populares
const popularArticles = [
  { title: 'Como configurar o número do WhatsApp no Tappy', category: 'Tappy Whats', iconName: 'setup', link: '/central-de-ajuda/whats/configurar-numero' },
  { title: 'Resolvendo problemas de conexão com a API', category: 'API e Integrações', iconName: 'api', link: '/central-de-ajuda/api/problemas-conexao' },
  { title: 'Como criar automações de atendimento', category: 'Tappy Whats', iconName: 'chat', link: '/central-de-ajuda/whats/automacoes' },
  { title: 'Gerenciando usuários e permissões', category: 'Tappy ID', iconName: 'account', link: '/central-de-ajuda/id/gerenciar-usuarios' },
  { title: 'Alterando planos e forma de pagamento', category: 'Cobrança', iconName: 'billing', link: '/central-de-ajuda/cobranca/alterar-plano' },
  { title: 'Sincronizando leads com seu CRM', category: 'Tappy Imob', iconName: 'setup', link: '/central-de-ajuda/imob/sincronizar-leads' },
];

// FAQ items
const faqItems = [
  {
    question: 'Como posso começar a usar o Tappy Whats?',
    answer: 'Para começar a usar o Tappy Whats, crie uma conta na plataforma, configure seu número do WhatsApp seguindo nosso guia de integração e você estará pronto para enviar mensagens automatizadas em minutos.'
  },
  {
    question: 'O que é o Tappy Imob e como ele pode ajudar minha imobiliária?',
    answer: 'O Tappy Imob é um CRM completo para imobiliárias que automatiza processos de captação, qualificação e nutrição de leads, além de gerenciar todo o ciclo de vendas de imóveis com integrações nativas para portais imobiliários.'
  },
  {
    question: 'Como integrar o Tappy com meu sistema atual?',
    answer: 'Disponibilizamos APIs RESTful completas e SDKs para as principais linguagens de programação. Nossa documentação detalhada na seção de API mostra passo a passo como realizar a integração com seus sistemas existentes.'
  },
  {
    question: 'Posso testar os produtos Tappy antes de contratar?',
    answer: 'Sim! Oferecemos um período de teste gratuito de 14 dias para todos os nossos produtos, com todas as funcionalidades disponíveis para que você possa avaliar completamente antes de decidir.'
  },
  {
    question: 'Como obter suporte para dúvidas técnicas?',
    answer: 'Oferecemos múltiplos canais de suporte, incluindo chat ao vivo, tickets de suporte, e-mail dedicado e até mesmo suporte telefônico para planos empresariais. Nosso tempo médio de resposta é inferior a 2 horas em horário comercial.'
  }
];

export default function CentralAjudaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gradient-to-b from-background via-background to-gray-50/20 dark:to-gray-900/30">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-background py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-black/50"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-tappyGreen/20">
                <HelpCircle className="h-8 w-8 text-tappyGreen" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Como podemos ajudar você?
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Encontre respostas, tutoriais e recursos para suas dúvidas sobre os produtos Tappy
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 py-6 text-base bg-white/10 backdrop-blur-md border-gray-700 text-white placeholder-gray-400 focus:border-tappyGreen focus:ring-tappyGreen/50"
                  placeholder="Pesquisar na Central de Ajuda..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Button className="h-10 bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                    Buscar
                  </Button>
                </div>
              </div>
              
              {searchQuery && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-left">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Sugestões de pesquisa</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/central-de-ajuda/whats/configurar-numero" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <span className="font-medium text-gray-900 dark:text-white">Como configurar o WhatsApp</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/central-de-ajuda/api/problemas-conexao" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <span className="font-medium text-gray-900 dark:text-white">Problemas com a API</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/central-de-ajuda/cobranca/alterar-plano" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                        <span className="font-medium text-gray-900 dark:text-white">Como alterar meu plano</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </section>
        
        {/* Categorias de Produtos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Navegue por produtos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={`/central-de-ajuda/${category.title.toLowerCase().replace(' ', '-')}`} className="block">
                    <div className={`h-full rounded-xl overflow-hidden relative group`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                          <p className="text-white/80">{category.description}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-white/90">{category.articles} artigos</span>
                          <span className="text-white bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Artigos Populares */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30 border-y border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
                Artigos populares
              </h2>
              <Link href="/central-de-ajuda/todos" className="text-tappyGreen hover:text-tappyGreen/80 inline-flex items-center">
                <span>Ver todos os artigos</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  title={article.title}
                  category={article.category}
                  iconName={article.iconName}
                  link={article.link}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                Perguntas frequentes
              </h2>
              
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex justify-between p-6 cursor-pointer list-none">
                        <h3 className="font-medium text-lg text-gray-900 dark:text-white">{item.question}</h3>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform ml-2 flex-shrink-0">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </span>
                      </summary>
                      
                      <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300">
                        <p>{item.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link href="/duvidas-frequentes" className="inline-flex items-center text-tappyGreen hover:text-tappyGreen/80">
                  <span>Ver todas as perguntas frequentes</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Canais de Suporte */}
        <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-tappyGreen/20 to-transparent"></div>
          <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-tappyGreen/10 blur-3xl rounded-full"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Precisa de mais ajuda?
              </h2>
              <p className="text-xl text-gray-300">
                Nossa equipe de suporte está pronta para ajudar você
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-tappyGreen/20 rounded-lg flex items-center justify-center text-tappyGreen mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Chat ao vivo</h3>
                <p className="text-gray-300 mb-4">
                  Converse em tempo real com nossa equipe de suporte.
                </p>
                <Button className="w-full bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                  Iniciar chat
                </Button>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-tappyGreen/20 rounded-lg flex items-center justify-center text-tappyGreen mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">E-mail</h3>
                <p className="text-gray-300 mb-4">
                  Envie sua dúvida para nossa equipe de suporte.
                </p>
                <Button className="w-full bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                  suporte@tappy.com.br
                </Button>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-tappyGreen/20 rounded-lg flex items-center justify-center text-tappyGreen mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Telefone</h3>
                <p className="text-gray-300 mb-4">
                  Fale diretamente com um de nossos especialistas.
                </p>
                <Button className="w-full bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                  (11) 3456-7890
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Centro de Aprendizado */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                Centro de Aprendizado
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                    <Book className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Tutoriais</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Guias passo a passo para todas as funcionalidades dos produtos Tappy.
                  </p>
                  <Link href="/tutoriais" className="inline-flex items-center text-tappyGreen hover:text-tappyGreen/80">
                    <span>Ver tutoriais</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Documentação</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Documentação técnica completa para desenvolvedores e integradores.
                  </p>
                  <Link href="/docs" className="inline-flex items-center text-tappyGreen hover:text-tappyGreen/80">
                    <span>Ver documentação</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-br from-tappyGreen/10 to-tappyGreen/5 border-t border-tappyGreen/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Receba dicas e novidades
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Inscreva-se para receber tutoriais, atualizações e dicas sobre os produtos Tappy
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                  className="flex-1"
                  placeholder="Seu melhor e-mail"
                />
                <Button className="bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                  <Send className="w-4 h-4 mr-2" />
                  <span>Inscrever-se</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
