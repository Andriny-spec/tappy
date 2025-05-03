"use client";

import { motion, useAnimation, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TappyImobSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  // Estado para o card ativo
  const [activeFeature, setActiveFeature] = useState(0);
  // Estado para animação do gráfico
  const [chartData] = useState(() => {
    return Array(9).fill(0).map(() => ({
      visits: 20 + Math.random() * 80,
      sales: 20 + Math.random() * 60
    }));
  });
  
  // Mouse move effect para o card 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["15deg", "-15deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-15deg", "15deg"]
  );
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  // Efeito para alternar automaticamente o recurso destacado
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Animação quando o componente entra em view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <div ref={ref} id="tappy-imob" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <motion.div 
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-tappyGreen/20 to-black/20 blur-3xl"
      />
      
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex justify-center order-2 md:order-1">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <div className="relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="absolute h-1 bg-gradient-to-r from-tappyGreen to-tappyGreen/40 bottom-0 left-0 rounded-full"
              />
              <div className="space-y-2">
                <Badge className="bg-tappyGreen/10 text-tappyGreen border-tappyGreen/20 px-3 py-1.5 font-poppins">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m22 11-7-9v5H3v8h12v5l7-9z" />
                  </svg>
                  <span>Lançamento 2025</span>
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyGreen/80">Tappy Imob</span>
                  <span className="block text-foreground">Revolucionando o mercado</span>
                  <span className="block text-foreground">imobiliário com IA</span>
                </h2>
              </div>
            </div>
            <p className="text-xl text-muted-foreground mt-4 font-poppins leading-relaxed">
              Um CRM completo com automação inteligente para imobiliárias e corretores.
              <span className="block font-medium text-tappyGreen mt-2">Potencializado por Inteligência Artificial.</span>
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <Card className="bg-background/50 border-border/50 overflow-hidden hover:border-tappyGreen/30 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="h-1 bg-gradient-to-r from-tappyGreen to-tappyGreen/40"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2 inline-flex bg-tappyGreen/20 p-1.5 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-tappyGreen"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </span>
                    IA Avançada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Algoritmos avançados que analisam o mercado e recomendam as melhores oportunidades.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50 border-border/50 overflow-hidden hover:border-tappyGreen/30 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-500/40"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2 inline-flex bg-blue-500/20 p-1.5 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-blue-500"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </span>
                    Interface Intuitiva
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dashboard completo com visualizações dinâmicas e relatórios personalizados em tempo real.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50 border-border/50 overflow-hidden hover:border-tappyGreen/30 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-500/40"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <span className="mr-2 inline-flex bg-purple-500/20 p-1.5 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-purple-500"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                        <path d="M20 2a10 10 0 0 1 0 10"></path>
                        <path d="M2 12a10 10 0 0 0 10 10"></path>
                        <path d="M12 22a10 10 0 0 0 10-10"></path>
                      </svg>
                    </span>
                    Automação Completa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Processos automatizados de acompanhamento de leads, agendamento e notificações personalizadas.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                Entrar na lista de espera
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col space-y-6 order-1 md:order-2">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            {/* Dashboard animado de CRM com IA */}
            <div 
              className="relative bg-background/50 backdrop-blur-sm border border-border/40 rounded-xl shadow-lg p-4 h-full overflow-hidden" 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                style={{ 
                  perspective: "1000px",
                  rotateX,
                  rotateY
                }}
                className="w-full h-full"
              >
                {/* Dashboard de CRM */}
                <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Efeitos de fundo */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-tappyGreen/20 to-transparent"></div>
                  
                  {/* Barra de navegação do dashboard */}
                  <div className="absolute top-0 left-0 w-full bg-black/40 backdrop-blur-sm border-b border-white/10 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-tappyGreen/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tappyGreen">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <span className="text-white font-semibold">Tappy Imob</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex items-center gap-1 bg-tappyGreen/20 px-2 py-1 rounded text-xs text-tappyGreen"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                        <span>IA Ativa</span>
                      </motion.div>
                      
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                      </div>
                      
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Conteúdo principal */}
                  <div className="absolute top-14 left-0 right-0 bottom-0 p-4 grid grid-cols-12 gap-3">
                    {/* Sidebar */}
                    <div className="col-span-3 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-3 flex flex-col h-full">
                      <div className="text-white text-sm font-medium mb-3">Menu</div>
                      
                      <motion.div 
                        className="flex items-center gap-2 bg-tappyGreen/20 text-tappyGreen rounded-md p-2 mb-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                        <span className="text-xs">Dashboard</span>
                      </motion.div>
                      
                      {[
                        { icon: "home", text: "Imóveis", delay: 0.3 },
                        { icon: "users", text: "Clientes", delay: 0.4 },
                        { icon: "calendar", text: "Agenda", delay: 0.5 },
                        { icon: "message-square", text: "Mensagens", delay: 0.6 },
                        { icon: "bar-chart", text: "Relatórios", delay: 0.7 },
                        { icon: "settings", text: "Configurações", delay: 0.8 },
                      ].map((item, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-center gap-2 text-white/60 hover:text-white rounded-md p-2 mb-2 hover:bg-white/5 transition-all cursor-pointer"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: item.delay }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {item.icon === "home" && <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>}
                            {item.icon === "users" && <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>}
                            {item.icon === "calendar" && <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>}
                            {item.icon === "message-square" && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>}
                            {item.icon === "bar-chart" && <line x1="12" y1="20" x2="12" y2="10"></line>}
                            {item.icon === "settings" && <circle cx="12" cy="12" r="3"></circle>}
                          </svg>
                          <span className="text-xs">{item.text}</span>
                        </motion.div>
                      ))}
                      
                      <div className="mt-auto">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                          className="bg-gradient-to-r from-blue-500/20 to-tappyGreen/20 p-3 rounded-lg border border-white/10"
                        >
                          <div className="text-xs font-medium text-white mb-1">Assistente IA</div>
                          <div className="text-xs text-white/70 mb-2">Seu assistente está ativo e analisando dados</div>
                          <motion.div 
                            className="h-1.5 rounded-full bg-black/30 w-full overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                          >
                            <motion.div 
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-tappyGreen"
                              initial={{ width: "15%" }}
                              animate={{ width: ["15%", "85%", "65%"] }}
                              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Conteúdo principal */}
                    <div className="col-span-9 grid grid-rows-3 gap-3 h-full">
                      {/* Estatísticas */}
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { title: "Imóveis", value: "128", change: "+5", icon: "home", color: "from-blue-500/20 to-blue-500/5" },
                          { title: "Clientes", value: "87", change: "+12", icon: "users", color: "from-tappyGreen/20 to-tappyGreen/5" },
                          { title: "Vendas", value: "R$ 1.2M", change: "+18%", icon: "dollar-sign", color: "from-purple-500/20 to-purple-500/5" },
                          { title: "Conversão", value: "24%", change: "+2.4%", icon: "trending-up", color: "from-yellow-500/20 to-yellow-500/5" },
                        ].map((stat, idx) => (
                          <motion.div
                            key={idx}
                            className={`bg-gradient-to-br ${stat.color} rounded-lg border border-white/10 p-3 flex flex-col`}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="text-xs text-white/60">{stat.title}</div>
                              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                </svg>
                              </div>
                            </div>
                            <div className="text-xl font-semibold text-white">{stat.value}</div>
                            <div className="text-xs text-tappyGreen flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                              </svg>
                              {stat.change} este mês
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Gráfico */}
                      <motion.div 
                        className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-3 row-span-1"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-sm font-medium text-white">Análise de Vendas</div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-tappyGreen"></div>
                              <span className="text-xs text-white/60">Vendas</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <span className="text-xs text-white/60">Visitas</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="h-[85%] w-full flex items-end justify-between">
                          {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"].map((month, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
                              <motion.div 
                                className="w-full flex flex-col items-center gap-1"
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                transition={{ delay: 0.8 + idx * 0.05, duration: 0.5 }}
                              >
                                <motion.div 
                                  className="w-[80%] bg-blue-500/70 rounded-sm"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${chartData[idx].visits}px` }}
                                  transition={{ delay: 0.8 + idx * 0.05, duration: 0.5 }}
                                />
                                <motion.div 
                                  className="w-[80%] bg-tappyGreen/70 rounded-sm"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${chartData[idx].sales}px` }}
                                  transition={{ delay: 0.9 + idx * 0.05, duration: 0.5 }}
                                />
                              </motion.div>
                              <div className="text-[10px] text-white/60">{month}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* Recomendações de IA e Lista recente */}
                      <div className="grid grid-cols-5 gap-3">
                        {/* Recomendações de IA */}
                        <motion.div 
                          className="col-span-3 bg-gradient-to-br from-blue-900/30 to-tappyGreen/20 rounded-lg border border-white/10 p-3"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-tappyGreen/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tappyGreen">
                                  <circle cx="12" cy="12" r="5"></circle>
                                  <line x1="12" y1="1" x2="12" y2="3"></line>
                                  <line x1="12" y1="21" x2="12" y2="23"></line>
                                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                  <line x1="1" y1="12" x2="3" y2="12"></line>
                                  <line x1="21" y1="12" x2="23" y2="12"></line>
                                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                              </div>
                              <div className="text-sm font-medium text-white">Recomendações da IA</div>
                            </div>
                            <motion.div 
                              className="text-[10px] flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 text-white/60"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-tappyGreen animate-pulse"></div>
                              Processando
                            </motion.div>
                          </div>
                          
                          <motion.div 
                            className="flex flex-col gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3 }}
                          >
                            <div className="bg-black/30 rounded-md p-2 border border-white/10">
                              <div className="flex justify-between items-start">
                                <div className="text-xs font-medium text-white">Cliente João Silva busca apartamento</div>
                                <div className="text-[10px] bg-tappyGreen/20 text-tappyGreen rounded-full px-1.5">98% match</div>
                              </div>
                              <div className="text-[10px] text-white/60 mt-1">
                                Combinação perfeita com 3 propriedades em Pinheiros
                              </div>
                            </div>
                            
                            <div className="bg-black/30 rounded-md p-2 border border-white/10">
                              <div className="flex justify-between items-start">
                                <div className="text-xs font-medium text-white">Oportunidade de venda detectada</div>
                                <div className="text-[10px] bg-blue-500/20 text-blue-400 rounded-full px-1.5">87% chance</div>
                              </div>
                              <div className="text-[10px] text-white/60 mt-1">
                                Maria Oliveira está pronta para fechar negócio
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                        
                        {/* Lista recente */}
                        <motion.div 
                          className="col-span-2 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-3"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.1 }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <div className="text-sm font-medium text-white">Atividades Recentes</div>
                          </div>
                          
                          <motion.div 
                            className="flex flex-col gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                          >
                            {[
                              "Carlos agendou visita para Casa Vila Madalena",
                              "Ana marcou reunião com potencial cliente",
                              "Novo imóvel adicionado por Rafael"
                            ].map((activity, idx) => (
                              <motion.div 
                                key={idx}
                                className="flex items-center gap-2 text-white/70 text-[10px]"
                                initial={{ x: 10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.4 + idx * 0.1 }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-tappyGreen/70"></div>
                                <div>{activity}</div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Efeito de brilho animado */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-tappyGreen/5 to-transparent"
                    initial={{ x: -500, opacity: 0 }}
                    animate={{ x: 500, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 3 }}
                  />
                  
                  {/* Notificação popup */}
                  <motion.div 
                    className="absolute top-16 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-lg w-64"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-tappyGreen/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-tappyGreen">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="16" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white mb-1">Análise de IA concluída</div>
                        <div className="text-[10px] text-white/60">
                          3 novos clientes potenciais identificados com base em dados históricos
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
