"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

interface TechCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const techData = [
  {
    title: "Frontend Moderno",
    description: "Utilizamos React e Next.js para criar interfaces rápidas, interativas e otimizadas para SEO, com Tailwind CSS para um design responsivo e consistente.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "#61DAFB"
  },
  {
    title: "Backend Robusto",
    description: "Infraestrutura escalável baseada em Node.js, com arquitetura de microserviços para garantir alta disponibilidade e performance mesmo com grande volume de dados.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    color: "#539E43"
  },
  {
    title: "Banco de Dados NoSQL",
    description: "Utilizamos MongoDB para armazenamento de dados flexível e escalonável, permitindo lidar com estruturas complexas e volumes crescentes de informações.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: "#4DB33D"
  },
  {
    title: "WebSockets em Tempo Real",
    description: "Comunicação bidirecional em tempo real para atualizações instantâneas em chats, notificações e painéis de controle, mantendo todos os dados sincronizados.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "#FFCC00"
  },
  {
    title: "Segurança Avançada",
    description: "Implementamos múltiplas camadas de segurança, com criptografia de ponta a ponta, autenticação em dois fatores e conformidade com normas internacionais.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "#E535AB"
  },
  {
    title: "Inteligência Artificial",
    description: "Algoritmos de machine learning para automatização de tarefas, análise preditiva e personalização da experiência do usuário com base em comportamentos.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "#8A2BE2"
  },
  {
    title: "Cloud Native",
    description: "Infraestrutura totalmente em nuvem, utilizando AWS e tecnologias de conteinerização como Docker e Kubernetes para máxima escalabilidade e disponibilidade.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: "#FF9900"
  },
  {
    title: "APIs Extensíveis",
    description: "APIs RESTful e GraphQL bem documentadas que permitem integrações perfeitas com sistemas existentes e expansão contínua de funcionalidades.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "#FF5733"
  },
];

const TechCard: React.FC<TechCardProps> = ({ title, description, icon, color, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  // Glow effect on mousemove
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animate when in view
  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out"
        }
      );
    }
  }, [isInView, index]);
  
  return (
    <div 
      ref={cardRef}
      className="relative h-full bg-white/[0.01] rounded-2xl p-1 overflow-hidden opacity-0"
      style={{
        boxShadow: `
          inset 0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 0 0 2px rgba(0, 0, 0, 0.05),
          inset 0 20px 20px -20px rgba(255, 255, 255, 0.1),
          0 2px 5px rgba(0, 0, 0, 0.1),
          0 10px 30px rgba(0, 0, 0, 0.15)
        `,
        "--mouse-x": "0px",
        "--mouse-y": "0px",
      } as React.CSSProperties}
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${color}40 0%, transparent 50%)`,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        onMouseOver={(e) => {
          if (e.currentTarget.parentElement) {
            e.currentTarget.style.opacity = "0.4";
          }
        }}
        onMouseOut={(e) => {
          if (e.currentTarget.parentElement) {
            e.currentTarget.style.opacity = "0";
          }
        }}
      />
      
      {/* Card Content */}
      <div className="relative h-full p-6 md:p-8 rounded-xl backdrop-blur-sm bg-gray-900/50 border border-white/5 z-10">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ 
            backgroundColor: `${color}20`, 
            color: color 
          }}
        >
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
        
        {/* Shine effect on edge */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.1) 20%, transparent 50%)`,
          }}
          onMouseOver={(e) => {
            if (e.currentTarget.parentElement) {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.animation = "shine 2s infinite";
            }
          }}
          onMouseOut={(e) => {
            if (e.currentTarget.parentElement) {
              e.currentTarget.style.opacity = "0";
              e.currentTarget.style.animation = "none";
            }
          }}
        />
      </div>
    </div>
  );
};

export function TechCards() {
  return (
    <div className="py-20 relative overflow-hidden">
      <style jsx global>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-tappyGreen/10 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tecnologias{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/70">
              avançadas
            </span>{" "}
            em nossas soluções
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Utilizamos o que há de mais moderno em desenvolvimento para criar produtos robustos, seguros e escaláveis.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {techData.map((tech, index) => (
            <TechCard
              key={index}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              color={tech.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
