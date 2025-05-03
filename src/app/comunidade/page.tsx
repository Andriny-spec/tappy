"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, MessageSquare, Users, Code, Lightbulb, Heart, MessageCircle, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Card de evento
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  href: string;
  isVirtual?: boolean;
  index?: number;
}

function EventCard({ title, date, location, imageUrl, href, isVirtual = false, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-tappyGreen dark:hover:border-tappyGreen transition-colors"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              {date}
            </span>
            {isVirtual && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tappyGreen text-black">
                Virtual
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-tappyGreen transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center">
          <Globe className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{location}</span>
        </p>
        
        <Link 
          href={href}
          className="inline-flex items-center text-sm text-tappyGreen font-medium hover:underline"
        >
          <span>Ver detalhes</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}

// Card de discussão
interface DiscussionCardProps {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  replies: number;
  views: number;
  date: string;
  tags?: string[];
  href: string;
  index?: number;
}

function DiscussionCard({ title, author, replies, views, date, tags = [], href, index = 0 }: DiscussionCardProps) {
  // Formatar números
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-tappyGreen dark:hover:border-tappyGreen bg-white dark:bg-gray-800 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-grow">
          <Link href={href}>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-tappyGreen dark:hover:text-tappyGreen transition-colors mb-2">
              {title}
            </h3>
          </Link>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mb-3">
            <div className="flex items-center">
              <Image
                src={author.avatar}
                alt={author.name}
                width={20}
                height={20}
                className="rounded-full mr-2"
              />
              <span>{author.name}</span>
            </div>
            
            <div className="flex items-center">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatNumber(replies)} respostas</span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1.5" />
              <span>{formatNumber(views)} visualizações</span>
            </div>
            
            <div className="text-xs">{date}</div>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <Link
          href={href}
          className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 hover:border-tappyGreen dark:hover:border-tappyGreen hover:bg-tappyGreen/5 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-400 hover:text-tappyGreen" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-gray-900 to-background dark:from-black dark:to-background border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Comunidade Tappy
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Conecte-se com outros usuários, compartilhe experiências, participe de eventos e cresça junto com a comunidade Tappy.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="gap-2 bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium"
                  >
                    <Users className="h-4 w-4" />
                    <span>Entrar na comunidade</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-gray-600 text-black hover:text-tappyGreen hover:border-tappyGreen"
                  >
                    <Code className="h-4 w-4" />
                    <span>Documentação para desenvolvedores</span>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-80 rounded-xl overflow-hidden shadow-xl hidden lg:block"
              >
                <Image
                  src="https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Comunidade Tappy"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Usuário"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white"
                    />
                    <Image
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Usuário"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white -ml-2"
                    />
                    <Image
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Usuário"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white -ml-2"
                    />
                    <span className="text-white text-sm ml-1">+500 membros ativos</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Estatísticas */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Users className="h-6 w-6 text-tappyGreen" />, title: "+2.500", description: "Membros ativos" },
              { icon: <MessageSquare className="h-6 w-6 text-tappyGreen" />, title: "+10.000", description: "Discussões" },
              { icon: <Globe className="h-6 w-6 text-tappyGreen" />, title: "+50", description: "Eventos realizados" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-tappyGreen/10 p-3 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Próximos Eventos */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Próximos Eventos
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Participe dos eventos da comunidade e conecte-se com outros usuários
                </p>
              </div>
              
              <Button variant="outline" className="mt-4 md:mt-0">
                Ver todos os eventos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <EventCard
                title="Meetup Tappy Developers: Construindo chatbots avançados"
                date="15 Mai, 2025 • 19h"
                location="São Paulo, SP"
                imageUrl="https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                href="/comunidade/eventos/meetup-developers-sp"
                index={0}
              />
              
              <EventCard
                title="Workshop: Integrações do Tappy Imob com portais"
                date="22 Mai, 2025 • 15h"
                location="Online"
                imageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"
                href="/comunidade/eventos/workshop-tappy-imob"
                isVirtual={true}
                index={1}
              />
              
              <EventCard
                title="Tappy Conference 2025"
                date="5-7 Jun, 2025"
                location="Rio de Janeiro, RJ"
                imageUrl="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                href="/comunidade/eventos/tappy-conference-2025"
                index={2}
              />
            </div>
          </div>
        </section>
        
        {/* Fórum e Discussões */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Discussões Recentes
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Participe das conversas, compartilhe conhecimento e obtenha ajuda
              </p>
            </div>
            
            <Button className="mt-4 md:mt-0 bg-tappyGreen hover:bg-tappyGreen/90 text-black">
              Nova discussão
            </Button>
          </div>
          
          <div className="space-y-4 mb-8">
            <DiscussionCard
              title="Como implementar webhook para status de mensagens no Tappy Whats?"
              author={{
                name: "Carlos Mendes",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              }}
              replies={23}
              views={486}
              date="1 dia atrás"
              tags={["Tappy Whats", "Webhooks", "API"]}
              href="/comunidade/discussoes/implementar-webhook-status"
              index={0}
            />
            
            <DiscussionCard
              title="Melhor estratégia para sincronização de imóveis com múltiplos portais"
              author={{
                name: "Ana Silveira",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              }}
              replies={15}
              views={327}
              date="3 dias atrás"
              tags={["Tappy Imob", "Sincronização", "Portais"]}
              href="/comunidade/discussoes/estrategia-sincronizacao-imoveis"
              index={1}
            />
            
            <DiscussionCard
              title="Tutorial: Autenticação com Tappy ID usando OAuth 2.0"
              author={{
                name: "Rafael Costa",
                avatar: "https://randomuser.me/api/portraits/men/46.jpg"
              }}
              replies={41}
              views={1253}
              date="1 semana atrás"
              tags={["Tutorial", "Tappy ID", "OAuth", "Autenticação"]}
              href="/comunidade/discussoes/tutorial-autenticacao-oauth"
              index={2}
            />
            
            <DiscussionCard
              title="Compartilhando minha experiência com automação de atendimento no mercado imobiliário"
              author={{
                name: "Julia Mendes",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              }}
              replies={37}
              views={845}
              date="1 semana atrás"
              tags={["Case", "Automação", "Imobiliário"]}
              href="/comunidade/discussoes/experiencia-automacao-imobiliario"
              index={3}
            />
          </div>
          
          <div className="text-center">
            <Button variant="outline">
              Ver mais discussões
            </Button>
          </div>
        </section>
        
        {/* Contribua */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Contribua para a comunidade
              </h2>
              
              <p className="text-gray-300 mb-10">
                Ajude a construir uma comunidade mais forte compartilhando conhecimento, criando tutoriais, respondendo dúvidas ou participando de eventos.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="bg-tappyGreen/15 p-3 rounded-full inline-flex mb-4">
                    <Lightbulb className="h-6 w-6 text-tappyGreen" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Compartilhe ideias</h3>
                  <p className="text-gray-300 text-sm">Crie tutoriais, artigos ou compartilhe dicas úteis sobre os produtos Tappy.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="bg-tappyGreen/15 p-3 rounded-full inline-flex mb-4">
                    <MessageCircle className="h-6 w-6 text-tappyGreen" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ajude outros</h3>
                  <p className="text-gray-300 text-sm">Responda dúvidas no fórum e ajude novos usuários a aproveitar melhor as ferramentas.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="bg-tappyGreen/15 p-3 rounded-full inline-flex mb-4">
                    <Heart className="h-6 w-6 text-tappyGreen" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dê feedback</h3>
                  <p className="text-gray-300 text-sm">Seu feedback é valioso para melhorarmos nossos produtos e atendermos melhor às necessidades.</p>
                </div>
              </div>
              
              <Button
                className="mt-10 bg-tappyGreen hover:bg-tappyGreen/90 text-black py-6 px-8 text-lg"
              >
                Comece a contribuir
              </Button>
            </div>
          </div>
        </section>
        
        {/* Recursos */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Recursos para a comunidade
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Code className="h-6 w-6 text-tappyGreen" />,
                title: "API Reference",
                description: "Documentação completa das APIs para desenvolvedores",
                href: "/api-docs"
              },
              {
                icon: <Lightbulb className="h-6 w-6 text-tappyGreen" />,
                title: "Tutoriais",
                description: "Guias passo a passo para todos os produtos Tappy",
                href: "/tutoriais"
              },
              {
                icon: <Users className="h-6 w-6 text-tappyGreen" />,
                title: "Grupos Locais",
                description: "Encontre grupos Tappy na sua região",
                href: "/comunidade/grupos"
              },
              {
                icon: <ExternalLink className="h-6 w-6 text-tappyGreen" />,
                title: "GitHub",
                description: "Exemplos de código e integrações open source",
                href: "https://github.com/tappy"
              }
            ].map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-tappyGreen dark:hover:border-tappyGreen group transition-colors h-full flex flex-col"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-tappyGreen/10 p-3 rounded-full">
                      {resource.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center group-hover:text-tappyGreen transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center text-sm flex-grow">
                    {resource.description}
                  </p>
                  <div className="flex justify-center mt-4">
                    <div className="text-sm text-tappyGreen font-medium flex items-center">
                      <span>Acessar</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Fique conectado
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Inscreva-se para receber atualizações sobre eventos, novas discussões e recursos da comunidade Tappy
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tappyGreen focus:border-transparent"
                  required
                />
                
                <Button 
                  type="submit"
                  className="bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium py-3 px-6"
                >
                  Inscrever-se
                </Button>
              </form>
              
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-4">
                Ao se inscrever, você concorda com nossa <Link href="/privacidade" className="text-tappyGreen hover:underline">Política de Privacidade</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
