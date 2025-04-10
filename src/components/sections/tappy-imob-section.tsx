"use client";

import { motion, useAnimation, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingCard } from "@/components/ui-aceternity/floating-card";

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
      
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
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
                whileInView={{ width: '40%' }}
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
                  <span className="block text-foreground">CRM Imobiliário com I.A.</span>
                </h2>
              </div>
            </div>
            <p className="text-xl text-muted-foreground font-poppins">
              Gerencie imóveis, clientes e vendas com nosso CRM imobiliário completo, potencializado por Inteligência Artificial.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <motion.div
                animate={{
                  scale: activeFeature === 0 ? 1.03 : 1,
                  borderColor: activeFeature === 0 ? "rgba(34, 197, 94, 0.5)" : "rgba(34, 197, 94, 0)"
                }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div 
                  className={cn(
                    "absolute -inset-px rounded-lg transition-all duration-300", 
                    activeFeature === 0 ? "bg-gradient-to-r from-tappyGreen/30 to-black/30 blur-md opacity-70" : "opacity-0"
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
                        className="mr-2 inline-flex bg-tappyGreen/20 p-1 rounded-md"
                      >
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
                          <path d="M21 8v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8" />
                          <path d="M10 19v-4a2 2 0 1 1 4 0v4" />
                          <rect x="2" y="2" width="20" height="6" rx="1" />
                        </svg>
                      </motion.span>
                      IA para Matchmaking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      A IA encontra automaticamente o imóvel perfeito para cada cliente com base em suas preferências.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <div className="pt-6">
              <Button 
                size="lg" 
                className="bg-tappyGreen hover:bg-tappyGreen/90 text-white rounded-full px-8"
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
            <div className="w-full max-w-md mx-auto">
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x, y, rotateX, rotateY }}
                className="w-full"
              >
                <FloatingCard className="aspect-[9/16] w-full max-w-md mx-auto">
                  <div className="w-full h-full flex flex-col items-start justify-start bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
                    <div className="w-full h-6 bg-black flex items-center justify-between px-3 text-[10px] text-white/80">
                      <div>22:45</div>
                      <div className="flex items-center gap-1">
                        <div className="flex h-3 items-center">
                          <div className="h-2 w-1 bg-tappyGreen rounded-full"></div>
                          <div className="h-2.5 w-1 bg-tappyGreen rounded-full mx-0.5"></div>
                          <div className="h-3 w-1 bg-tappyGreen rounded-full"></div>
                        </div>
                      </div>
                    </div>

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
                                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                              />
                            </svg>
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-bold text-white font-poppins">Tappy Imob</h3>
                            <div className="flex items-center text-xs text-white/70">
                              <span className="inline-block w-2 h-2 bg-tappyGreen rounded-full mr-1"></span>
                              <span>67 imóveis ativos</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                        
                    <div className="p-4 w-full overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-white">Imóveis Disponíveis <span className="text-sm font-normal text-tappyGreen">(67)</span></h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div 
                          className="bg-white/5 rounded-lg p-3 hover:bg-white/10 cursor-pointer backdrop-blur-sm border border-white/5 relative overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="absolute -top-6 -right-6 w-12 h-12 bg-tappyGreen rounded-full opacity-20 blur-lg"></div>
                          <div className="h-24 bg-gradient-to-br from-tappyGreen/20 to-black/60 rounded-md mb-2 relative overflow-hidden">
                            <div className="absolute top-2 right-2 bg-tappyGreen text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Novo</div>
                          </div>
                          <h4 className="font-medium text-sm text-white">Casa Vila Nova</h4>
                          <p className="text-xs text-tappyGreen font-bold">R$ 450.000</p>
                        </motion.div>
                        
                        <motion.div 
                          className="bg-white/5 rounded-lg p-3 hover:bg-white/10 cursor-pointer backdrop-blur-sm border border-white/5 relative overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="h-24 bg-gradient-to-br from-black/60 to-gray-800 rounded-md mb-2 relative overflow-hidden">
                            <div className="absolute top-2 right-2 bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded font-medium backdrop-blur-sm">Em alta</div>
                          </div>
                          <h4 className="font-medium text-sm text-white">Apto Centro</h4>
                          <p className="text-xs text-tappyGreen font-bold">R$ 320.000</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
