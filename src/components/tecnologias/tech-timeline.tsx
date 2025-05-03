"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  highlights?: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: "2020",
    title: "Fundação da Tappy",
    description: "Início da Tappy com foco na criação de soluções inovadoras para comunicação digital. Desenvolvimento da primeira versão do Tappy Link.",
    icon: "/icons/rocket.svg",
    color: "#03fcae",
    highlights: [
      "Criação do primeiro protótipo NFC",
      "Testes iniciais de interfaceamento",
      "Primeiros clientes beta"
    ]
  },
  {
    year: "2021",
    title: "Lançamento do Tappy Whats",
    description: "Desenvolvimento da plataforma de gestão de WhatsApp empresarial com recursos avançados de automação e atendimento multiagente.",
    icon: "/icons/chat.svg",
    color: "#25D366",
    highlights: [
      "APIs de integração WhatsApp",
      "Sistema de filas e atendimento",
      "Automação de processos"
    ]
  },
  {
    year: "2022",
    title: "Evolução tecnológica",
    description: "Implementação de inteligência artificial em nossas plataformas de atendimento e expansão das integrações com sistemas de terceiros.",
    icon: "/icons/ai.svg",
    color: "#8A2BE2",
    highlights: [
      "IA para análise de conversas",
      "Machine Learning para respostas",
      "Integração com mais de 50 plataformas"
    ]
  },
  {
    year: "2023",
    title: "Lançamento do Tappy Imob",
    description: "Criação da plataforma completa para gestão imobiliária, integrando CRM, portais e automação de marketing para imobiliárias.",
    icon: "/icons/building.svg",
    color: "#0066FF",
    highlights: [
      "Sistema de gestão de imóveis",
      "Integração multiportais",
      "Marketing automation para imobiliárias"
    ]
  },
  {
    year: "2024",
    title: "Arquitetura cloud-native",
    description: "Migração completa para arquitetura baseada em microserviços, garantindo escalabilidade, performance e alta disponibilidade.",
    icon: "/icons/cloud.svg",
    color: "#FF6B6B",
    highlights: [
      "Kubernetes e orquestração",
      "Serviços serverless",
      "Monitoramento em tempo real"
    ]
  },
  {
    year: "2025",
    title: "O futuro da Tappy",
    description: "Expandindo fronteiras e estabelecendo novos padrões no mercado de comunicação digital e gestão empresarial.",
    icon: "/icons/future.svg",
    color: "#FFD700",
    highlights: [
      "Tecnologia blockchain",
      "Sistemas Web3",
      "Expansão internacional"
    ]
  }
];

const TechTimelineItem: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  
  useEffect(() => {
    if (!itemRef.current) return;
    
    gsap.from(itemRef.current.querySelector('.timeline-content'), {
      x: isEven ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      }
    });
    
    gsap.from(itemRef.current.querySelector('.timeline-year'), {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      }
    });
    
    // Animate highlights 
    const highlights = itemRef.current.querySelectorAll('.highlight-item');
    gsap.from(highlights, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.4,
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      }
    });
  }, [isEven]);
  
  return (
    <div 
      ref={itemRef}
      className={`relative flex items-center mb-20 ${isEven ? 'justify-start' : 'justify-end'}`}
    >
      {/* Timeline line and dot */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2 z-0"></div>
      <div 
        className="timeline-year absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10"
        style={{ backgroundColor: item.color + '20', border: `2px solid ${item.color}` }}
      >
        <span className="text-sm font-bold" style={{ color: item.color }}>{item.year}</span>
      </div>
      
      {/* Content */}
      <div 
        className={`timeline-content w-full md:w-5/12 ${isEven ? 'md:pr-16' : 'md:pl-16'} relative z-10`}
      >
        <div 
          className="p-6 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl"
          style={{ borderLeftColor: item.color, borderLeftWidth: '4px' }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: item.color + '20' }}
            >
              <div 
                className="w-6 h-6 flex items-center justify-center" 
                style={{ color: item.color }}
              >
                {/* Placeholder for icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          </div>
          
          {item.highlights && (
            <div className="mt-4 pl-16">
              <div className="space-y-2">
                {item.highlights.map((highlight, idx) => (
                  <div key={idx} className="highlight-item flex items-start">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mr-2 mt-2 flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function TechTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Smooth animations
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);
  
  return (
    <div className="relative py-20 md:py-40 overflow-hidden" ref={containerRef}>
      {/* Parallax background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ opacity, y: smoothY, scale: smoothScale }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-tappyGreen/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </motion.div>
      
      {/* Timeline container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Nossa{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
              evolução
            </span>{" "}
            tecnológica
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A Tappy está em constante evolução, incorporando novas tecnologias e aprimorando nossas soluções para oferecer a melhor experiência ao cliente.
          </p>
        </motion.div>
        
        <div className="relative">
          {timelineData.map((item, index) => (
            <TechTimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
