"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Tilt } from "react-tilt";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Componentes neumórficos
const NeumorphicCard = ({ children, className = "", ...props }) => (
  <div
    className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2e2e2e] overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

const GlassmorphicCard = ({ children, className = "", ...props }) => (
  <div
    className={`relative backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-800/50 rounded-2xl shadow-lg overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <Tilt
    options={{
      max: 15,
      scale: 1.05,
      speed: 450,
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-[6px_6px_12px_#d4d4d4,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#1c1c1c,-6px_-6px_12px_#262626] border border-gray-100 dark:border-gray-800"
    >
      <div className="w-16 h-16 rounded-full bg-tappyGreen/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  </Tilt>
);

export default function ParaVoce() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      const cards = document.querySelectorAll(".animate-card");
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".benefits-section",
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
      
      <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        {/* Hero Section */}
        <section ref={ref} className="relative h-[90vh] overflow-hidden flex items-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,252,174,0.1),transparent_70%)]" />
          
          {/* Animated background pattern */}
          <motion.div 
            className="absolute inset-0 opacity-[0.03] bg-[url('/pattern-dots.svg')] bg-repeat"
            style={{ y: backgroundY }}
          />
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.3, x: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="absolute top-1/4 -left-24 w-48 h-48 rounded-full bg-tappyGreen/30 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.2, x: 0 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="absolute bottom-1/4 -right-24 w-64 h-64 rounded-full bg-tappyGreen/20 blur-3xl"
            />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{ y: textY }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    Tappy
                  </span>{" "}
                  Para Você
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                  Seja mais produtivo e conectado com nossas soluções digitais personalizadas para suas necessidades pessoais.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8">
                    Começar agora
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-300 dark:border-gray-700">
                    Conhecer planos
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll para explorar</span>
            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center p-1">
              <motion.div 
                className="w-1.5 h-1.5 bg-tappyGreen rounded-full"
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,252,174,0.1),transparent_70%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Conecte-se com o mundo através da 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70"> Tappy</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Nossas soluções são projetadas para simplificar sua vida digital e ampliar suas possibilidades de conexão.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
                title="Perfil Digital Unificado"
                description="Mantenha todos seus contatos, redes sociais e informações profissionais em um só lugar, acessível com apenas um toque."
              />
              
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Compartilhamento Instantâneo"
                description="Compartilhe seu perfil com qualquer pessoa através de NFC, QR Code ou link personalizado em segundos."
              />
              
              <FeatureCard 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="Privacidade Avançada"
                description="Controle total sobre suas informações, decidindo o que compartilhar e com quem compartilhar a qualquer momento."
              />
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 relative benefits-section overflow-hidden bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    Benefícios
                  </span> Exclusivos
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Descubra as vantagens de usar nossas soluções no seu dia a dia.
                </motion.p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
              {[
                {
                  title: "Análises e Insights",
                  description: "Acompanhe quem visualizou seu perfil e obtenha insights sobre suas conexões.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                },
                {
                  title: "Personalização Total",
                  description: "Adapte seu perfil com temas, cores e layouts que combinam com sua personalidade.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )
                },
                {
                  title: "Integração com Apps",
                  description: "Conecte-se com suas redes sociais e aplicativos favoritos em um único lugar.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                {
                  title: "Atualizações em Tempo Real",
                  description: "Altere informações instantaneamente e veja as mudanças refletidas em todos os dispositivos.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )
                },
                {
                  title: "Suporte 24/7",
                  description: "Nossa equipe está sempre disponível para ajudar com qualquer dúvida ou problema.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )
                },
                {
                  title: "Conexões Empresariais",
                  description: "Ideal para profissionais que buscam expandir sua rede de contatos profissionais.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tappyGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
              ].map((benefit, index) => (
                <NeumorphicCard key={index} className="p-8 animate-card">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </NeumorphicCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(3,252,174,0.15),transparent_70%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <GlassmorphicCard className="max-w-4xl mx-auto p-10 md:p-16">
              <div className="text-center">
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Pronto para começar sua jornada com a{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    Tappy
                  </span>?
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 dark:text-gray-300 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Junte-se aos milhares de usuários que já estão revolucionando suas conexões digitais.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8 py-6 text-lg">
                    Comece gratuitamente
                  </Button>
                </motion.div>
              </div>
            </GlassmorphicCard>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
