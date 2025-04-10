"use client";

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { FloatingCard } from "@/components/ui-aceternity/floating-card";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TappyWhatsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  // Estado para controlar o destaque do card selecionado
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Valores para animações de movimento
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-5, 5], [1, -1]);
  const rotateY = useTransform(x, [-5, 5], [-1, 1]);
  
  // Efeito para movimento suave do card flutuante
  useEffect(() => {
    let intervalX: NodeJS.Timeout;
    let intervalY: NodeJS.Timeout;
    
    if (inView) {
      intervalX = setInterval(() => {
        x.set(Math.random() * 10 - 5);
      }, 3000);
      
      intervalY = setInterval(() => {
        y.set(Math.random() * 10 - 5);
      }, 4000);
    }
    
    return () => {
      clearInterval(intervalX);
      clearInterval(intervalY);
    };
  }, [inView, x, y]);
  
  // Efeito para alternar automaticamente o recurso destacado
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <section ref={ref} id="tappy-whats" className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Background accent */}
      <motion.div 
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-tappyBlue/10 blur-3xl" 
      />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            <Badge className="mb-3 bg-tappyBlue/10 text-tappyBlue border-tappyBlue/20 px-3 py-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 h-3 w-3"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>Recomendado</span>
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyBlue to-tappyBlue/80">Tappy Whats</span>
              <span className="block text-foreground">CRM completo para WhatsApp</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Gerencie seus atendimentos, automatize respostas e aumente suas vendas com nosso CRM integrado ao WhatsApp.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <motion.div
                animate={{
                  scale: activeFeature === 0 ? 1.03 : 1,
                  borderColor: activeFeature === 0 ? "rgba(0, 123, 255, 0.5)" : "rgba(0, 123, 255, 0)"
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div 
                  className={cn(
                    "absolute -inset-px rounded-lg transition-all duration-300", 
                    activeFeature === 0 ? "bg-gradient-to-r from-tappyBlue/30 to-tappyGreen/30 blur-md opacity-70" : "opacity-0"
                  )} 
                />
                <Card 
                  className="bg-background/50 border-border/50 relative overflow-hidden cursor-pointer transition-all duration-300" 
                  onClick={() => setActiveFeature(0)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <motion.span 
                        animate={{ 
                          scale: activeFeature === 0 ? [1, 1.2, 1] : 1 
                        }}
                        transition={{ duration: 1.5, repeat: activeFeature === 0 ? Infinity : 0, repeatDelay: 1 }}
                        className="mr-2 inline-flex bg-tappyBlue/20 p-1 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-tappyBlue"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                          <path d="M19 5v1a7 7 0 0 1-14 0V5" />
                          <path d="M12 14v7" />
                          <path d="M8 18h8" />
                        </svg>
                      </motion.span>
                      Chatbot Inteligente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Automatize respostas e atendimentos com chatbot baseado em IA.
                    </p>
                  </CardContent>
                  {activeFeature === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 flex items-center space-x-1"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <span className="h-2 w-2 bg-tappyBlue rounded-full animate-pulse"></span>
                        <span className="h-2 w-2 bg-tappyBlue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                        <span className="h-2 w-2 bg-tappyBlue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                      <span className="text-xs text-muted-foreground">Assistente pensando...</span>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
              
              <motion.div
                animate={{
                  scale: activeFeature === 1 ? 1.03 : 1,
                  borderColor: activeFeature === 1 ? "rgba(0, 123, 255, 0.5)" : "rgba(0, 123, 255, 0)"
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div 
                  className={cn(
                    "absolute -inset-px rounded-lg transition-all duration-300", 
                    activeFeature === 1 ? "bg-gradient-to-r from-tappyBlue/30 to-tappyGreen/30 blur-md opacity-70" : "opacity-0"
                  )} 
                />
                <Card 
                  className="bg-background/50 border-border/50 relative overflow-hidden cursor-pointer transition-all duration-300" 
                  onClick={() => setActiveFeature(1)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <motion.span 
                        animate={{ 
                          y: activeFeature === 1 ? [0, -4, 0] : 0 
                        }}
                        transition={{ duration: 1.5, repeat: activeFeature === 1 ? Infinity : 0, repeatDelay: 1 }}
                        className="mr-2 inline-flex bg-tappyBlue/20 p-1 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-tappyBlue"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </motion.span>
                      Múltiplos Atendentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Gerencie múltiplos atendentes e distribua as conversas automaticamente.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                animate={{
                  scale: activeFeature === 2 ? 1.03 : 1,
                  borderColor: activeFeature === 2 ? "rgba(0, 123, 255, 0.5)" : "rgba(0, 123, 255, 0)"
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div 
                  className={cn(
                    "absolute -inset-px rounded-lg transition-all duration-300", 
                    activeFeature === 2 ? "bg-gradient-to-r from-tappyBlue/30 to-tappyGreen/30 blur-md opacity-70" : "opacity-0"
                  )} 
                />
                <Card 
                  className="bg-background/50 border-border/50 relative overflow-hidden cursor-pointer transition-all duration-300" 
                  onClick={() => setActiveFeature(2)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <motion.span 
                        animate={{ 
                          rotate: activeFeature === 2 ? [0, 10, -10, 0] : 0 
                        }}
                        transition={{ duration: 2, repeat: activeFeature === 2 ? Infinity : 0, repeatDelay: 1 }}
                        className="mr-2 inline-flex bg-tappyBlue/20 p-1 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-tappyBlue"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <line x1="20" x2="20" y1="8" y2="14" />
                          <line x1="23" x2="17" y1="11" y2="11" />
                        </svg>
                      </motion.span>
                      Segmentação de Clientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Organize seus contatos em segmentos e envie mensagens personalizadas.
                    </p>
                  </CardContent>
                  {activeFeature === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-tappyGreen"></div>
                        <span className="text-xs text-muted-foreground">Clientes ativos</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="h-3 w-3 rounded-full bg-tappyBlue"></div>
                        <span className="text-xs text-muted-foreground">Leads qualificados</span>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
              
              <motion.div
                animate={{
                  scale: activeFeature === 3 ? 1.03 : 1,
                  borderColor: activeFeature === 3 ? "rgba(0, 123, 255, 0.5)" : "rgba(0, 123, 255, 0)"
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div 
                  className={cn(
                    "absolute -inset-px rounded-lg transition-all duration-300", 
                    activeFeature === 3 ? "bg-gradient-to-r from-tappyBlue/30 to-tappyGreen/30 blur-md opacity-70" : "opacity-0"
                  )} 
                />
                <Card 
                  className="bg-background/50 border-border/50 relative overflow-hidden cursor-pointer transition-all duration-300" 
                  onClick={() => setActiveFeature(3)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <motion.span 
                        animate={{ 
                          x: activeFeature === 3 ? [0, 3, 0] : 0 
                        }}
                        transition={{ duration: 1, repeat: activeFeature === 3 ? Infinity : 0, repeatDelay: 1 }}
                        className="mr-2 inline-flex bg-tappyBlue/20 p-1 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-tappyBlue"
                        >
                          <path d="M21 8v13H3V8" />
                          <path d="M1 3h22v5H1z" />
                          <path d="M10 12h4" />
                          <path d="M10 16h4" />
                          <path d="M10 20h4" />
                        </svg>
                      </motion.span>
                      Relatórios Detalhados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Acompanhe o desempenho da sua equipe e a satisfação dos clientes.
                    </p>
                  </CardContent>
                  {activeFeature === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="flex space-x-1 items-end h-8">
                        {[40, 65, 45, 80, 60, 75, 90].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className={`w-3 bg-gradient-to-t ${i % 2 === 0 ? 'from-tappyBlue to-tappyGreen' : 'from-tappyGreen to-tappyBlue'} rounded-sm`} 
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            </div>
            
            <div className="pt-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
          
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ x, y, rotateX, rotateY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full max-w-md mx-auto">
              <FloatingCard className="aspect-[9/16] w-full max-w-md mx-auto">
                <div className="w-full h-full flex flex-col items-start justify-start bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
                  {/* Barra de status */}
                  <div className="w-full h-6 bg-black flex items-center justify-between px-3 text-[10px] text-white/80">
                    <div>22:45</div>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <path d="M18 10a6 6 0 0 0-12 0v8h12v-8z" />
                        <path d="M8 10V8a4 4 0 1 1 8 0v2" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <path d="M6.33 20.1C2.23 20.1 2 12.87 2 12c0-.87.23-8.1 4.33-8.1" />
                        <path d="M19.03 7.22a8.73 8.73 0 0 1 0 9.56" />
                        <path d="M16.31 8.9a5.55 5.55 0 0 1 0 6.2" />
                        <path d="M12.56 10.1a1.33 1.33 0 0 1 0 3.8" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <rect width="18" height="11" x="3" y="2" rx="2" />
                        <path d="M8 22h8" />
                        <path d="M12 17v5" />
                      </svg>
                      <div className="flex h-3 items-center">
                        <div className="h-2 w-1 bg-tappyGreen rounded-full"></div>
                        <div className="h-2.5 w-1 bg-tappyGreen rounded-full mx-0.5"></div>
                        <div className="h-3 w-1 bg-tappyGreen rounded-full"></div>
                        <div className="h-2 w-1 bg-white/50 rounded-full ml-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Header com gradiente */}
                  <div className="relative w-full bg-gradient-to-b from-tappyGreen/30 to-transparent">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

                    <div className="relative z-10 p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-tappyGreen to-tappyGreen/70 flex items-center justify-center shadow-lg shadow-tappyGreen/20"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                            />
                          </svg>
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-white font-poppins">Tappy Whats</h3>
                          <div className="flex items-center text-xs text-white/70">
                            <span className="inline-block w-2 h-2 bg-tappyGreen rounded-full mr-1"></span>
                            <span>Online agora</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
                          </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Navegação */}
                    <div className="relative z-10 flex justify-between px-4 border-b border-white/10 pb-3">
                      <div className="relative flex flex-col items-center">
                        <div className="text-white font-medium text-sm">Conversas</div>
                        <div className="absolute -bottom-3 w-full h-0.5 bg-tappyGreen rounded-full"></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-white/50 font-medium text-sm">Listas</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-white/50 font-medium text-sm">Relatórios</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-white/50 font-medium text-sm">Ajustes</div>
                      </div>
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="w-full px-4 py-3 bg-gradient-to-r from-black to-gray-900/80">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-semibold text-white/80">VISÃO GERAL</h4>
                      <div className="text-xs text-tappyGreen flex items-center gap-1">
                        <span>Ver tudo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <div className="text-tappyGreen font-semibold text-base">32</div>
                        <div className="text-xs text-white/60">Conversas ativas</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <div className="text-tappyGreen font-semibold text-base">8</div>
                        <div className="text-xs text-white/60">Atendentes</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <div className="text-tappyGreen font-semibold text-base">94%</div>
                        <div className="text-xs text-white/60">Satisfação</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lista de conversas */}
                  <div className="w-full flex-1 p-3 space-y-2 overflow-auto">
                    <div className="flex items-center py-2 px-3 bg-gradient-to-r from-tappyGreen/20 to-tappyGreen/5 rounded-lg cursor-pointer border border-tappyGreen/20 shadow-sm shadow-tappyGreen/10">
                      <div className="relative mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tappyGreen/40 to-tappyGreen/20 flex items-center justify-center border-2 border-tappyGreen/30">
                          <span className="text-white font-medium">MC</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-tappyGreen flex items-center justify-center text-[10px] text-white font-bold shadow-sm">3</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-white">Maria Costa</p>
                          <span className="text-xs font-medium text-tappyGreen">Agora</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-white/70 truncate">Preciso de ajuda com meu pedido #12345</p>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tappyGreen">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-2 px-3 bg-black/40 rounded-lg cursor-pointer border border-white/10 shadow-sm">
                      <div className="relative mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-blue-500/30">
                          <span className="text-white font-medium">JD</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-white">João da Silva</p>
                          <span className="text-xs text-white/50">09:45</span>
                        </div>
                        <p className="text-sm text-white/60 truncate">Olá, gostaria de saber mais sobre...</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-2 px-3 bg-black/40 rounded-lg cursor-pointer border border-white/10 shadow-sm">
                      <div className="relative mr-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/30">
                          <span className="text-white font-medium">PS</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-white">Pedro Santos</p>
                          <span className="text-xs text-white/50">Ontem</span>
                        </div>
                        <p className="text-sm text-white/60 truncate">Quando ficará pronto o orçamento?</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de status inferior */}
                  <div className="w-full p-3 border-t border-white/10 bg-black/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-tappyGreen flex items-center justify-center shadow-md shadow-tappyGreen/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <path d="M12 5v14"></path>
                          <path d="M5 12h14"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
