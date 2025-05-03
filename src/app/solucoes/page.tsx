"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SolutionSpotlight } from "@/components/solucoes/solution-spotlight";
import { HeroParticleEffect } from "@/components/solucoes/hero-particle-effect";
import { SolutionCardGrid } from "@/components/solucoes/solution-card-grid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Solucoes() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Dados para as soluções principais
  const mainSolutions = [
    {
      title: "Tappy Link",
      subtitle: "Cartões Digitais Inteligentes",
      description: "Transforme sua maneira de compartilhar contatos e informações com a tecnologia NFC que permite transferência em apenas um toque. Cartões digitais personalizados para profissionais e empresas.",
      features: [
        "Compartilhamento de contato com apenas um toque",
        "Personalização completa do perfil e aparência",
        "Página exclusiva com seu branding e identidade",
        "Métricas e análises de visualizações",
        "Integração com CRM e plataformas de marketing"
      ],
      imageSrc: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Conheça o Tappy Link",
      ctaLink: "/solucoes/tappy-link",
      color: "green",
      index: 0
    },
    {
      title: "Tappy Whats",
      subtitle: "CRM Completo para WhatsApp",
      description: "Gerencie todas suas conversas de WhatsApp em uma única plataforma com múltiplos atendentes, automação inteligente, integração com APIs e análises avançadas de conversas.",
      features: [
        "Multi-atendimento com controle de filas",
        "Chatbots personalizados e inteligência artificial",
        "Gatilhos e automação de mensagens",
        "Integração com sistemas de CRM e ERP",
        "Tags, relatórios e métricas completas"
      ],
      imageSrc: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Conheça o Tappy Whats",
      ctaLink: "/solucoes/tappy-whats",
      color: "blue",
      reverse: true,
      index: 1
    },
    {
      title: "Tappy Imob",
      subtitle: "Gestão Imobiliária Completa",
      description: "A solução completa para imobiliárias e corretores, com gestão de imóveis, clientes, processos e marketing integrado. Automatize e escale seu negócio imobiliário.",
      features: [
        "Portal de imóveis completo e personalizável",
        "Gestão completa de leads e funil de vendas",
        "Integração com portais e WhatsApp",
        "Documentação digital e assinatura eletrônica",
        "Dashboard e relatórios personalizados"
      ],
      imageSrc: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "Conheça o Tappy Imob",
      ctaLink: "/solucoes/tappy-imob",
      color: "purple",
      index: 2
    }
  ];
  
  // Dados para os recursos complementares
  const additionalFeatures = [
    {
      title: "Integrações avançadas",
      description: "Conecte nossas soluções com os sistemas que você já utiliza para uma experiência unificada.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      delay: 0.1
    },
    {
      title: "Automação inteligente",
      description: "Automatize processos repetitivos e libere sua equipe para focar no que realmente importa.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      delay: 0.2
    },
    {
      title: "Relatórios e análises",
      description: "Visualize dados importantes em tempo real e tome decisões baseadas em informações precisas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      delay: 0.3
    },
    {
      title: "Segurança e conformidade",
      description: "Proteja seus dados e mantenha-se em conformidade com as regulamentações com nossa infraestrutura segura.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      delay: 0.4
    },
    {
      title: "Suporte especializado",
      description: "Conte com nossa equipe de especialistas para resolver suas dúvidas e ajudar você a aproveitar ao máximo nossas soluções.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      delay: 0.5
    },
    {
      title: "Escalabilidade",
      description: "Nossas soluções crescem com seu negócio, permitindo que você escale sem preocupações técnicas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      delay: 0.6
    }
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animações para os highlights na seção de soluções
      gsap.from(".highlight-item", {
        y: 30, 
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".highlight-section",
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950">
        {/* Hero Section com efeito de partículas */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background gradient principal */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,252,174,0.15),transparent_70%)]" />
          
          {/* Efeito de partículas interativas */}
          <HeroParticleEffect />
          
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
                  Soluções Tappy
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6 !leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    Transforme
                  </span>{" "}
                  a experiência digital da sua empresa
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  Conecte, automatize e escale seu negócio com as soluções da Tappy. 
                  Tecnologia avançada e design intuitivo para revolucionar a comunicação com seus clientes.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8 py-6 text-lg">
                    Conhecer soluções
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-300 dark:border-gray-700">
                    Ver demonstração
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="relative p-2">
                  {/* Hero image com overlay de gradiente */}
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-video w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-tappyGreen/30 via-transparent to-purple-500/20 opacity-50"></div>
                      
                      {/* Elementos flutuantes na imagem */}
                      <motion.div 
                        className="absolute top-1/4 left-1/4 w-16 h-16 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                        animate={{ 
                          y: [0, -15, 0], 
                          rotate: [0, 5, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 5,
                          ease: "easeInOut" 
                        }}
                      />
                      
                      <motion.div 
                        className="absolute bottom-1/3 right-1/4 w-24 h-16 rounded-xl bg-tappyGreen/10 backdrop-blur-sm border border-tappyGreen/20"
                        animate={{ 
                          y: [0, 20, 0], 
                          rotate: [0, -7, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 6, 
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                      
                      <motion.div 
                        className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20"
                        animate={{ 
                          y: [0, 15, 0], 
                          x: [0, -10, 0] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 7,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      />
                      
                      <div className="relative z-10 flex items-center justify-center flex-col">
                        <motion.div 
                          className="text-tappyGreen text-6xl mb-4"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </motion.div>
                        <motion.span 
                          className="text-white/80 text-xl font-light"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                        >
                          Tappy Solutions
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-tappyGreen/10 rounded-full blur-3xl"></div>
                  <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Spotlight Sections - Cada solução com destaque */}
        {mainSolutions.map((solution) => (
          <SolutionSpotlight
            key={solution.title}
            title={solution.title}
            subtitle={solution.subtitle}
            description={solution.description}
            features={solution.features}
            imageSrc={solution.imageSrc}
            ctaText={solution.ctaText}
            ctaLink={solution.ctaLink}
            color={solution.color}
            reverse={solution.reverse}
            index={solution.index}
          />
        ))}
        
        {/* Additional Features Grid */}
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900/30 relative overflow-hidden highlight-section">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,252,174,0.05),transparent_70%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Recursos{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  complementares
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Todas as nossas soluções contam com recursos avançados para potencializar seu negócio
              </motion.p>
            </div>
            
            <SolutionCardGrid features={additionalFeatures} />
          </div>
        </section>
        
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
                Entre em contato com nossa equipe para uma demonstração personalizada e descubra como a Tappy pode ajudar você a crescer.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium rounded-full px-8 py-6 text-lg">
                  Agendar demonstração
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 hover:border-white text-black rounded-full px-8 py-6 text-lg">
                  Falar com um consultor
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
