"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { TechSphere } from '@/components/tecnologias/tech-sphere';
import { TechTimeline } from '@/components/tecnologias/tech-timeline';
import { TechCards } from '@/components/tecnologias/tech-cards';

export default function Tecnologias() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
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
                  Stack Tecnológico
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6 !leading-tight text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                    Tecnologias
                  </span>{" "}
                  de ponta em cada solução
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-10 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  Desenvolvemos nossas soluções com as tecnologias mais modernas e seguras do mercado,
                  garantindo performance, escalabilidade e uma experiência de usuário excepcional.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8 py-6 text-lg">
                    Explorar stack
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-gray-700 text-black hover:bg-gray-800">
                    Ver documentação
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="lg:w-1/2 h-[500px] md:h-[600px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Sphere 3D visualization */}
                <div className="relative h-full w-full">
                  <TechSphere />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Tech Cards Section - Neomorphic/Glassmorphism design */}
        <TechCards />
        
        {/* Timeline Section with parallax effects */}
        <TechTimeline />
        
        {/* Integration Showcase */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(3,252,174,0.1),transparent_70%)]" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Integrações{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
                  perfeitas
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Nossas APIs e conectores permitem integração com os principais sistemas do mercado
              </motion.p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="h-20 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-white/5 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Quer saber mais sobre nossa{" "}
                <span className="text-tappyGreen">
                  infraestrutura
                </span>?
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Entre em contato com nosso time técnico para mais detalhes sobre integrações, APIs e como podemos personalizar nossas soluções para sua necessidade específica.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium rounded-full px-8 py-6 text-lg">
                  Agendar demonstração técnica
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 hover:border-white text-black rounded-full px-8 py-6 text-lg">
                  Ver documentação técnica
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
