"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { TiltFeatureCard } from '@/components/vantagens/tilt-feature-card';
import { ComparisonSlider } from '@/components/vantagens/comparison-slider';
import { StatsCounter } from '@/components/vantagens/stats-counter';
import { TestimonialCarousel } from '@/components/vantagens/testimonial-carousel';

export default function Vantagens() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Dados dos cartões de vantagens
  const featureCards = [
    {
      title: "Aumento de Produtividade",
      description: "Automatize tarefas repetitivas e libere sua equipe para focar no que realmente importa. Nossas soluções aumentam a produtividade em até 70%.",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      iconBg: "linear-gradient(135deg, #03fcae20 0%, #03fcae50 100%)",
      bgGradient: "linear-gradient(135deg, #03fcae 0%, #03aa74 100%)",
      index: 0
    },
    {
      title: "Redução de Custos",
      description: "Economize recursos com nossas soluções eficientes. Clientes relatam economia média de 40% em custos operacionais após implementação.",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      iconBg: "linear-gradient(135deg, #5e72e420 0%, #5e72e450 100%)",
      bgGradient: "linear-gradient(135deg, #5e72e4 0%, #324cdd 100%)",
      index: 1
    },
    {
      title: "Experiência do Cliente",
      description: "Encante seus clientes com atendimento rápido e personalizado. Nossa plataforma proporciona uma experiência diferenciada que fideliza.",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      iconBg: "linear-gradient(135deg, #fb634120 0%, #fb634150 100%)",
      bgGradient: "linear-gradient(135deg, #fb6340 0%, #f56036 100%)",
      index: 2
    },
    {
      title: "Segurança de Dados",
      description: "Proteção avançada para todas as informações, com criptografia de ponta a ponta e conformidade com as principais normas de segurança.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      iconBg: "linear-gradient(135deg, #11cdef20 0%, #11cdef50 100%)",
      bgGradient: "linear-gradient(135deg, #11cdef 0%, #1171ef 100%)",
      index: 3
    },
    {
      title: "Insights em Tempo Real",
      description: "Monitore métricas importantes e tome decisões baseadas em dados atualizados instantaneamente, sem atrasos.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      iconBg: "linear-gradient(135deg, #f5365c20 0%, #f5365c50 100%)",
      bgGradient: "linear-gradient(135deg, #f5365c 0%, #f3a4b5 100%)",
      index: 4
    },
    {
      title: "Escalabilidade Total",
      description: "Nossas soluções crescem com seu negócio, permitindo expansão sem complicações. Escale de 10 a 10.000 usuários sem problemas.",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      iconBg: "linear-gradient(135deg, #ffd60020 0%, #ffd60050 100%)",
      bgGradient: "linear-gradient(135deg, #ffd600 0%, #f9a825 100%)",
      index: 5
    }
  ];
  
  // Dados para o contador de estatísticas
  const statsData = [
    {
      value: 73,
      label: "Aumento de produtividade",
      suffix: "%",
      color: "#03fcae",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      value: 40,
      label: "Redução de custos operacionais",
      suffix: "%",
      color: "#fb6340",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: 98,
      label: "Satisfação dos clientes",
      suffix: "%",
      color: "#5e72e4",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: 2500,
      label: "Empresas confiam na Tappy",
      suffix: "+",
      color: "#11cdef",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen overflow-x-hidden bg-black">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,252,174,0.15),transparent_70%)]" />
          
          {/* Animated background pattern */}
          <motion.div 
            className="absolute inset-0 opacity-[0.03] bg-[url('/pattern-dots.svg')] bg-repeat"
            style={{ y: backgroundY }}
          />
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-28">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                style={{ y: textY }}
              >
                <motion.span 
                  className="inline-block py-1.5 px-4 mb-6 rounded-full text-sm font-medium bg-tappyGreen/10 text-tappyGreen"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Por que escolher a Tappy
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6 !leading-tight text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    Vantagens
                  </span>{" "}
                  que transformam seu negócio
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-10 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  Descubra como as soluções Tappy podem otimizar processos, reduzir custos e impulsionar 
                  o crescimento da sua empresa com tecnologia de ponta e suporte especializado.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8 py-6 text-lg">
                    Conheça nossas soluções
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-700 text-white hover:bg-gray-800">
                    Agendar demonstração
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="relative p-8">
                  {/* Hero illustration/image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/50 backdrop-blur-sm border border-white/10">
                    {/* Imagem seria aqui - temporariamente preenchida com um design visual */}
                    <div className="aspect-video w-full relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-tappyGreen/30 via-transparent to-purple-500/20 opacity-50"></div>
                      
                      {/* Elementos decorativos */}
                      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-tappyGreen/20 rounded-full blur-3xl"></div>
                      <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                      
                      {/* Elementos flutuantes */}
                      <motion.div 
                        className="absolute top-1/4 left-1/4 w-24 h-24 rounded-xl bg-tappyGreen/20 backdrop-blur-sm border border-tappyGreen/30"
                        animate={{ 
                          y: [0, -20, 0], 
                          rotate: [0, 5, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 7,
                          ease: "easeInOut" 
                        }}
                      />
                      
                      <motion.div 
                        className="absolute bottom-1/3 right-1/4 w-32 h-20 rounded-xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30"
                        animate={{ 
                          y: [0, 20, 0], 
                          rotate: [0, -7, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 8, 
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                      
                      <motion.div 
                        className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30"
                        animate={{ 
                          y: [0, 15, 0], 
                          x: [0, -10, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 6,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      />
                      
                      {/* Conteúdo central */}
                      <div className="text-center space-y-2 relative z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-tappyGreen mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div className="text-3xl text-white font-bold">Vantagens Exclusivas</div>
                        <div className="text-gray-300">Tecnologia de ponta para sua empresa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Feature Cards Section - Tilt Effect */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,252,174,0.1),transparent_70%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Soluções{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  completas
                </span>{" "}
                para seu negócio
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Escolha a Tappy e descubra vantagens exclusivas que farão a diferença no seu dia a dia
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featureCards.map((card, index) => (
                <TiltFeatureCard 
                  key={index}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  iconBg={card.iconBg}
                  bgGradient={card.bgGradient}
                  index={card.index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Counter Section */}
        <StatsCounter 
          stats={statsData}
          title="Resultados comprovados pelos nossos clientes"
          description="Números que mostram o impacto real das nossas soluções em empresas de diferentes setores"
        />
        
        {/* Comparison Sliders */}
        <section className="py-20 bg-gray-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(3,252,174,0.1),transparent_70%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Antes e{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  depois
                </span>{" "}
                da Tappy
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Veja a transformação que nossas soluções podem trazer para o seu negócio
              </p>
            </motion.div>
            
            <div className="space-y-24">
              <ComparisonSlider
                beforeImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                afterImage="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                beforeLabel="Processos manuais"
                afterLabel="Automatizado com Tappy"
                title="Automação de Processos"
                description="Transforme fluxos de trabalho manuais e demorados em processos automáticos e eficientes"
              />
              
              <ComparisonSlider
                beforeImage="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                afterImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                beforeLabel="Sem insights"
                afterLabel="Dados em tempo real"
                title="Visibilidade e Controle"
                description="Abandone planilhas e obtenha métricas e insights em tempo real para tomar decisões melhores"
              />
            </div>
          </div>
        </section>
        
        {/* Testimonial Carousel */}
        <TestimonialCarousel />
        
        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,252,174,0.2),transparent_70%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Pronto para{" "}
                <span className="text-tappyGreen">
                  transformar
                </span>{" "}
                seu negócio?
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Entre em contato e descubra como as soluções Tappy podem impulsionar sua empresa com tecnologia de ponta e suporte especializado.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium rounded-full px-8 py-6 text-lg">
                  Solicitar demonstração
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 hover:border-white text-black rounded-full px-8 py-6 text-lg">
                  Falar com consultor
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
