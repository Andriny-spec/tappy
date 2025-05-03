"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { RotatingCard } from "@/components/para-empresas/rotating-card";
import { AnimatedCounter } from "@/components/para-empresas/animated-counter";
import { TestimonialCard } from "@/components/para-empresas/testimonial-card";
import { InteractiveTimeline } from "@/components/para-empresas/interactive-timeline";
import { FloatingCTA } from "@/components/para-empresas/floating-cta";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Componente decorativo 3D abstrato
const AbstractDecoration = () => (
  <div className="absolute inset-0 z-0 opacity-20">
    <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-tappyGreen/20 blur-3xl animate-pulse-slow"></div>
    <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-tappyGreen/15 blur-3xl animate-pulse-slow animation-delay-2000"></div>
    <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-tappyGreen/10 blur-3xl animate-pulse-slow animation-delay-1000"></div>
  </div>
);

export default function ParaEmpresas() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Timeline items para o processo de implementação
  const timelineItems = [
    {
      id: 1,
      title: "Consulta Inicial",
      description: "Entendemos suas necessidades e objetivos de negócio para personalizar a solução ideal.",
      duration: "2-3 dias",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Configuração Personalizada",
      description: "Configuramos a plataforma Tappy com as funcionalidades específicas para o seu negócio.",
      duration: "1 semana",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Integração com Sistemas",
      description: "Integramos a Tappy com seus sistemas existentes para um fluxo de trabalho unificado.",
      duration: "1-2 semanas",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Treinamento da Equipe",
      description: "Treinamos sua equipe para utilizar todas as funcionalidades da plataforma Tappy de forma eficiente.",
      duration: "3-5 dias",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Lançamento e Suporte",
      description: "Acompanhamos o lançamento do sistema e fornecemos suporte contínuo para garantir o sucesso.",
      duration: "Contínuo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
    },
  ];

  // Testimoniais de clientes
  const testimonials = [
    {
      quote: "A Tappy revolucionou a forma como nos conectamos com os clientes. Nossa taxa de conversão aumentou 35% no primeiro trimestre após a implementação.",
      author: "Carlos Silva",
      role: "Diretor de Marketing",
      company: "TechnoVision",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Conseguimos integrar todos nossos sistemas de comunicação com clientes em uma única plataforma. O suporte da equipe Tappy foi excepcional durante todo o processo.",
      author: "Mariana Santos",
      role: "CEO",
      company: "InnovateBR",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "O retorno sobre o investimento foi muito mais rápido do que esperávamos. A Tappy não é um custo, é um investimento que se paga rapidamente.",
      author: "Roberto Mendes",
      role: "CFO",
      company: "Global Construtora",
      avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg"
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate the statistics section
      gsap.from(".stat-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);
  
  return (
    <>
      <Navbar />
      
      {/* Floating CTA */}
      <FloatingCTA delay={5000} />
      
      <main className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950">
        {/* Hero Section */}
        <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
          <AbstractDecoration />
          
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
                <span className="inline-block py-1.5 px-4 mb-6 rounded-full text-sm font-medium bg-tappyGreen/10 text-tappyGreen">
                  Soluções corporativas
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 !leading-tight">
                  Transforme sua empresa com a{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    Tappy
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg">
                  Nossas soluções empresariais inovadoras ajudam a otimizar processos, aumentar vendas e melhorar a experiência do cliente.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-black rounded-full px-8">
                    Agendar demonstração
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-300 dark:border-gray-700 hover:border-tappyGreen hover:text-tappyGreen">
                    Conhecer planos
                  </Button>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Confiado por empresas líderes:</p>
                  <div className="flex flex-wrap items-center gap-8">
                    {["Brand 1", "Brand 2", "Brand 3", "Brand 4"].map((brand, index) => (
                      <div key={index} className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
                        <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{brand}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative">
                  {/* Animated SVG Dashboard */}
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-[4/3] w-full bg-white dark:bg-gray-900 flex items-center justify-center relative p-6">
                      {/* Dashboard Animation Container */}
                      <div className="w-full h-full relative">
                        {/* Dashboard Header */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-tappyGreen/90 to-tappyGreen/70 rounded-t-lg flex items-center px-4">
                          <div className="flex space-x-2">
                            <motion.div 
                              className="w-3 h-3 rounded-full bg-white/30"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                              className="w-3 h-3 rounded-full bg-white/30"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                            />
                            <motion.div 
                              className="w-3 h-3 rounded-full bg-white/30"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            />
                          </div>
                          <div className="flex-1 flex justify-center">
                            <div className="text-white font-medium text-sm">Dashboard Tappy</div>
                          </div>
                        </div>
                        
                        {/* Dashboard Sidebar */}
                        <div className="absolute top-12 left-0 bottom-0 w-16 bg-gray-100 dark:bg-gray-800 flex flex-col items-center py-4 space-y-6">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div 
                              key={i}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 1 ? 'bg-tappyGreen text-white' : 'bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-300'}`}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {i === 1 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                              ) : i === 2 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                              ) : i === 3 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                              ) : i === 4 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                              )}
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Dashboard Content Area */}
                        <div className="absolute top-12 left-16 right-0 bottom-0 bg-white dark:bg-gray-900 p-4">
                          {/* Stats Row */}
                          <div className="flex space-x-4 mb-4">
                            {[
                              { label: "Clientes", value: "1,245", growth: "+12.5%" },
                              { label: "Vendas", value: "R$ 42,530", growth: "+8.2%" },
                              { label: "Conversão", value: "28.6%", growth: "+3.1%" },
                            ].map((stat, i) => (
                              <motion.div 
                                key={i} 
                                className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 relative overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                              >
                                <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full bg-tappyGreen/10"></div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                                <p className="text-lg font-bold">{stat.value}</p>
                                <p className="text-xs text-tappyGreen">{stat.growth}</p>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Chart Area */}
                          <motion.div 
                            className="h-40 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4 relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <div className="absolute inset-0 p-4">
                              <div className="relative h-full">
                                {/* Chart Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between">
                                  {[0, 1, 2, 3].map(i => (
                                    <div key={i} className="w-full h-px bg-gray-200 dark:bg-gray-700" />
                                  ))}
                                </div>
                                
                                {/* Chart Data */}
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between h-full">
                                  {[35, 58, 42, 65, 48, 70, 85, 75, 60, 90, 80, 95].map((h, i) => (
                                    <motion.div
                                      key={i}
                                      className="w-1/12 mx-px bg-gradient-to-t from-tappyGreen to-tappyGreen/70"
                                      initial={{ height: 0 }}
                                      animate={{ height: `${h}%` }}
                                      transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                          
                          {/* Table Area */}
                          <motion.div 
                            className="h-32 bg-gray-50 dark:bg-gray-800 rounded-lg relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <div className="absolute inset-0 p-4">
                              <div className="pb-2 mb-2 border-b border-gray-200 dark:border-gray-700 flex justify-between">
                                <div className="w-1/3 text-xs font-medium text-gray-500 dark:text-gray-400">Cliente</div>
                                <div className="w-1/3 text-xs font-medium text-gray-500 dark:text-gray-400">Status</div>
                                <div className="w-1/3 text-xs font-medium text-gray-500 dark:text-gray-400 text-right">Valor</div>
                              </div>
                              
                              {[
                                { name: "Empresa ABC", status: "Concluído", value: "R$ 2.500" },
                                { name: "Tech Solutions", status: "Em progresso", value: "R$ 1.800" },
                                { name: "Global Industries", status: "Aguardando", value: "R$ 5.400" },
                              ].map((row, i) => (
                                <motion.div 
                                  key={i} 
                                  className="py-2 flex justify-between"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                                >
                                  <div className="w-1/3 text-xs font-medium">{row.name}</div>
                                  <div className="w-1/3 text-xs">
                                    <span className={`inline-block rounded-full w-1.5 h-1.5 mr-1 ${
                                      row.status === "Concluído" ? "bg-green-500" : 
                                      row.status === "Em progresso" ? "bg-blue-500" : "bg-yellow-500"
                                    }`} />
                                    {row.status}
                                  </div>
                                  <div className="w-1/3 text-xs text-right font-medium">{row.value}</div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Live data indicators */}
                        <motion.div 
                          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-tappyGreen"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-tappyGreen/20 rounded-full blur-2xl"></div>
                  <div className="absolute -top-6 -left-6 w-40 h-40 bg-tappyGreen/10 rounded-full blur-2xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50 relative stats-section overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,252,174,0.05),transparent_70%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Resultados{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  impressionantes
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Nossas soluções geram impacto real nos negócios dos nossos clientes.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="stat-item">
                <AnimatedCounter
                  end={250}
                  suffix="+"
                  title="Empresas"
                  description="Atendidas em todo Brasil"
                />
              </div>
              <div className="stat-item">
                <AnimatedCounter
                  end={35}
                  suffix="%"
                  title="Aumento de Vendas"
                  description="Média nos primeiros 3 meses"
                />
              </div>
              <div className="stat-item">
                <AnimatedCounter
                  end={1500}
                  suffix="+"
                  title="Usuários Ativos"
                  description="Usando nossa plataforma"
                />
              </div>
              <div className="stat-item">
                <AnimatedCounter
                  end={98}
                  suffix="%"
                  title="Satisfação"
                  description="Dos nossos clientes"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Soluções Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Soluções para{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  cada necessidade
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Escolha as ferramentas ideais para transformar a comunicação e gestão da sua empresa.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
              <RotatingCard 
                title="Tappy Link"
                description="Cartões digitais inteligentes com NFC para sua equipe compartilhar contatos e informações instantaneamente."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                }
              />
              
              <RotatingCard 
                title="Tappy Whats"
                description="CRM completo integrado ao WhatsApp com múltiplos atendentes, automações e IA para atendimento de qualidade."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
              />
              
              <RotatingCard 
                title="Tappy Imob"
                description="Software completo para gestão imobiliária com integração WhatsApp, portais e ferramentas de automação de marketing."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(3,252,174,0.05),transparent_70%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                O que nossos{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  clientes dizem
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Histórias de sucesso de empresas que transformaram seus negócios com a Tappy.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                  avatarUrl={testimonial.avatarUrl}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Implementation Process Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Processo de{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  implementação
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Uma jornada simples e eficiente para adotar nossas soluções na sua empresa.
              </motion.p>
            </div>
            
            <InteractiveTimeline items={timelineItems} />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,252,174,0.2),transparent_70%)]" />
          
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
                  revolucionar
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
                Entre em contato hoje mesmo para uma demonstração personalizada e descubra como a Tappy pode transformar sua empresa.
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
