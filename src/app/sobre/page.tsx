"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { VerticalTimeline } from "@/components/sobre/vertical-timeline";
import { TeamGallery } from "@/components/sobre/team-gallery";
import { GlobalPresence } from "@/components/sobre/global-presence";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SobreNos() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Dados da timeline
  const historyEvents = [
    {
      year: "2018",
      title: "Fundação da Tappy",
      description: "A Tappy nasce com a missão de revolucionar a forma como as pessoas e empresas se conectam digitalmente.",
      highlight: false,
    },
    {
      year: "2019",
      title: "Lançamento do Tappy ID",
      description: "Nossa primeira solução, o cartão digital inteligente com NFC e QR code, é lançado no mercado.",
      highlight: true,
    },
    {
      year: "2020",
      title: "Expansão Digital",
      description: "Em meio à pandemia, aceleramos nossa transformação digital e inauguramos o Tappy Whats para gestão de atendimentos.",
      highlight: false,
    },
    {
      year: "2021",
      title: "Tappy Imob",
      description: "Lançamento do CRM completo para o mercado imobiliário, integrando todas as plataformas Tappy.",
      highlight: true,
    },
    {
      year: "2023",
      title: "Integração com IA",
      description: "Implementação de soluções de inteligência artificial em todas as plataformas Tappy para automação e insights.",
      highlight: false,
    },
    {
      year: "2025",
      title: "Expansão Internacional",
      description: "A Tappy inicia operações em outros países da América Latina, trazendo inovação para novos mercados.",
      highlight: true,
    },
  ];
  
  // Dados da equipe
  const teamMembers = [
    {
      id: 1,
      name: "Marcelo Almeida",
      role: "CEO & Fundador",
      bio: "Visionário em tecnologia com mais de 15 anos de experiência em startups e inovação digital. Formado em Engenharia de Software pela USP e MBA em Stanford.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 2,
      name: "Juliana Santos",
      role: "CTO",
      bio: "Especialista em desenvolvimento de software e arquitetura de sistemas. Apaixonada por criar soluções tecnológicas que transformam negócios.",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      id: 3,
      name: "Rafael Costa",
      role: "Diretor de Produtos",
      bio: "Responsável pelo desenvolvimento e evolução de todos os produtos Tappy. Especialista em UX/UI e metodologias ágeis.",
      imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 4,
      name: "Camila Oliveira",
      role: "Diretora de Marketing",
      bio: "Estrategista de marketing digital com experiência em grandes empresas do setor de tecnologia. Responsável pelo crescimento e posicionamento da marca Tappy.",
      imageUrl: "https://randomuser.me/api/portraits/women/66.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 5,
      name: "André Martins",
      role: "Líder de Desenvolvimento",
      bio: "Engenheiro de software full-stack especializado em arquiteturas escaláveis e desenvolvimento ágil. Mentor de jovens talentos na área.",
      imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      id: 6,
      name: "Fernanda Lima",
      role: "Diretora de Operações",
      bio: "Responsável por garantir a excelência operacional em todos os processos da Tappy, assegurando que clientes tenham a melhor experiência possível.",
      imageUrl: "https://randomuser.me/api/portraits/women/90.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
      },
    },
  ];
  
  // Dados de localização global
  const locations = [
    {
      id: "sao-paulo",
      name: "São Paulo",
      country: "Brasil",
      coordinates: [30, 65], // Posição aproximada no mapa (percentual)
      description: "Nosso escritório central, onde nasceu a Tappy. Sede da equipe de desenvolvimento, produto e administração.",
      employees: 120,
      year: "2018",
    },
    {
      id: "rio",
      name: "Rio de Janeiro",
      country: "Brasil",
      coordinates: [27, 62], // Posição aproximada
      description: "Centro de operações e atendimento ao cliente, especializado em suporte aos usuários de Tappy Imob.",
      employees: 45,
      year: "2020",
    },
    {
      id: "mexico",
      name: "Cidade do México",
      country: "México",
      coordinates: [15, 50], // Posição aproximada
      description: "Primeiro escritório internacional da Tappy, focado em expandir nossa presença na América Latina e adaptar nossos produtos ao mercado local.",
      employees: 25,
      year: "2023",
    },
    {
      id: "lisbon",
      name: "Lisboa",
      country: "Portugal",
      coordinates: [45, 40], // Posição aproximada
      description: "Nossa porta de entrada para o mercado europeu, com foco em parcerias estratégicas e desenvolvimento de negócios.",
      employees: 15,
      year: "2024",
    },
    {
      id: "miami",
      name: "Miami",
      country: "Estados Unidos",
      coordinates: [20, 45], // Posição aproximada
      description: "Escritório estratégico para alcançar o mercado norte-americano e conectar com investidores do Vale do Silício.",
      employees: 10,
      year: "2025",
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate sections
      gsap.utils.toArray(".animate-section").forEach((section: any) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        });
      });
    }
  }, []);
  
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950">
        {/* Hero Section */}
        <section ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,252,174,0.1),transparent_70%)]" />
          
          {/* Animated background pattern */}
          <motion.div 
            className="absolute inset-0 opacity-[0.025] bg-[url('/pattern-dots.svg')] bg-repeat"
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
                  Sobre nós
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 !leading-tight">
                  Revolucionando <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">conexões</span> no mundo digital
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
                  A Tappy nasceu para transformar a forma como pessoas e empresas se conectam e interagem. Conheça nossa história e visão.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8">
                    Nossa visão
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-300 dark:border-gray-700">
                    Junte-se a nós
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Placeholder for hero image - ideally logo or team photo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 rounded-full" />
                  <div className="absolute inset-8 rounded-full bg-white dark:bg-gray-900 shadow-2xl flex items-center justify-center">
                    <div className="w-40 h-40 bg-tappyGreen/20 rounded-full flex items-center justify-center text-tappyGreen text-7xl font-bold">T</div>
                  </div>
                  
                  {/* Animated decorative circles */}
                  <div className="absolute w-16 h-16 bg-tappyGreen/30 rounded-full top-0 right-10 animate-float" />
                  <div className="absolute w-12 h-12 bg-tappyGreen/20 rounded-full bottom-20 left-0 animate-float animation-delay-1000" />
                  <div className="absolute w-20 h-20 bg-tappyGreen/10 rounded-full bottom-10 right-0 animate-float animation-delay-2000" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values Section */}
        <section className="py-20 relative overflow-hidden animate-section">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-[10px_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[10px_10px_30px_rgba(0,0,0,0.2)]">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Transformar a forma como as pessoas e empresas se conectam, utilizando tecnologia de ponta para criar soluções simples, eficientes e acessíveis que potencializam relacionamentos e impulsionam negócios no mundo digital.
                </p>
                <div className="h-1 w-20 bg-tappyGreen rounded-full" />
              </div>
              
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-[10px_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[10px_10px_30px_rgba(0,0,0,0.2)]">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
                <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-tappyGreen mr-2">•</span>
                    <span><strong className="text-foreground">Inovação Constante:</strong> Buscamos continuamente novas soluções e tecnologias.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tappyGreen mr-2">•</span>
                    <span><strong className="text-foreground">Excelência:</strong> Comprometidos com a qualidade em tudo que fazemos.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tappyGreen mr-2">•</span>
                    <span><strong className="text-foreground">Simplicidade:</strong> Tornamos o complexo simples, acessível e funcional.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tappyGreen mr-2">•</span>
                    <span><strong className="text-foreground">Transparência:</strong> Relacionamentos baseados em confiança e clareza.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden animate-section">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(3,252,174,0.08),transparent_70%)]" />
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Nossa{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  Jornada
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Conheça a evolução da Tappy ao longo dos anos.
              </motion.p>
            </div>
            
            <VerticalTimeline events={historyEvents} />
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 relative overflow-hidden animate-section">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Nosso{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  Time
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Conheça as pessoas que estão transformando o futuro das conexões digitais.
              </motion.p>
            </div>
            
            <TeamGallery members={teamMembers} />
          </div>
        </section>
        
        {/* Global Presence Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden animate-section">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(3,252,174,0.08),transparent_70%)]" />
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Presença{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  Global
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                De São Paulo para o mundo, nossa tecnologia está conectando pessoas em diversos países.
              </motion.p>
            </div>
            
            <GlobalPresence locations={locations} />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto p-10 md:p-16 bg-white dark:bg-gray-900 rounded-2xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2e2e2e] relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-tappyGreen/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-tappyGreen/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Faça parte da{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    revolução digital
                  </span>
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Junte-se a nós nessa jornada para transformar a maneira como o mundo se conecta digitalmente.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8 py-6 text-lg">
                    Trabalhe conosco
                  </Button>
                  <Button size="lg" variant="outline" className="border-gray-300 hover:border-tappyGreen hover:text-tappyGreen rounded-full px-8 py-6 text-lg">
                    Contate-nos
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
