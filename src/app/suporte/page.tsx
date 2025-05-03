"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, HeadphonesIcon, CreditCard, HelpCircle, Check, Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

// Componentes de Agentes
import { AgenteBase } from "@/components/suporte/agente-base";
import { AgenteVendas } from "@/components/suporte/agente-vendas";
import { AgenteSuporte } from "@/components/suporte/agente-suporte";
import { AgenteDuvidas } from "@/components/suporte/agente-duvidas";
import { AgenteFinanceiro } from "@/components/suporte/agente-financeiro";

export default function SuportePage() {
  const [agenteAtivo, setAgenteAtivo] = useState<string | null>(null);
  const [agenteHover, setAgenteHover] = useState<string | null>(null);
  const [chatAtivo, setChatAtivo] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);
  
  // Função tipada para encontrar agente por id
  const encontrarAgente = (id: string | null) => {
    if (!id) return null;
    return agentes.find((a) => a.id === id) || null;
  };
  
  // Iniciar o chat com animação
  const iniciarChat = () => {
    if (!agenteAtivo) return;
    
    setCarregando(true);
    
    // Simula carregamento para mostrar a animação
    setTimeout(() => {
      setCarregando(false);
      setChatAtivo(true);
    }, 2000); // 2 segundos de animação
  };
  
  // Voltar para a seleção de agentes
  const voltarParaSelecao = () => {
    setChatAtivo(false);
    setAgenteAtivo(null);
  };
  
  const agentes = [
    {
      id: "suporte",
      nome: "Suporte Técnico",
      descricao: "Resolução rápida para problemas técnicos",
      icon: HeadphonesIcon,
      cor: "#25D366",
    },
    {
      id: "vendas",
      nome: "Vendas",
      descricao: "Soluções personalizadas para seu negócio",
      icon: MessageSquare,
      cor: "#25D366",
    },
    {
      id: "duvidas",
      nome: "Tire Dúvidas",
      descricao: "Respostas para todas as suas perguntas",
      icon: HelpCircle,
      cor: "#25D366",
    },
    {
      id: "financeiro",
      nome: "Planos e Preços",
      descricao: "Informações sobre valores e pacotes",
      icon: CreditCard,
      cor: "#25D366",
    },
  ];

  const handleAgenteChange = (value: string) => {
    setAgenteAtivo(value);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Grid de pontos decorativos no fundo */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#25D366 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}
      />

      <div className="relative z-10 h-full min-h-screen">
        <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-full py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#25D366] to-[#128C7E] mb-4">
              Atendimento Inteligente
            </h1>
            <p className="text-lg text-gray-600">
              Selecione o tipo de assistência que você precisa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            {/* Coluna esquerda - Menu de seleção */}
            <motion.div 
              className="lg:col-span-4 xl:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Nossos Agentes</h2>
                
                <RadioGroup 
                  value={agenteAtivo || ""}
                  onValueChange={handleAgenteChange}
                  className="flex flex-col gap-4"
                >
                  {agentes.map((agente, index) => {
                    const isSelected = agenteAtivo === agente.id;
                    
                    return (
                      <div 
                        key={agente.id}
                        className={`relative rounded-xl transition-all duration-300 ${isSelected ? "ring-2 ring-[#25D366]" : "hover:bg-gray-50"}`}
                        onMouseEnter={() => setAgenteHover(agente.id)}
                        onMouseLeave={() => setAgenteHover(null)}
                      >
                        <Label htmlFor={agente.id} className="cursor-pointer">
                          <div className="flex items-start gap-4 p-4">
                            <RadioGroupItem 
                              value={agente.id} 
                              id={agente.id} 
                              className="mt-1"
                            />
                            
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? "bg-[#25D366]/20" : "bg-gray-100"}`}>
                              <agente.icon className={`h-6 w-6 ${isSelected ? "text-[#25D366]" : "text-gray-500"}`} />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className={`font-medium transition-colors ${isSelected ? "text-[#25D366]" : "text-gray-800"}`}>
                                  {agente.nome}
                                </h3>
                                {isSelected && (
                                  <Check className="h-4 w-4 text-[#25D366]" />
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{agente.descricao}</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </motion.div>

            {/* Coluna direita - Conteúdo */}
            <div className="lg:col-span-8 xl:col-span-9 rounded-3xl h-full">
              {agenteAtivo ? (
                // Agente selecionado - mostrar interface de conversa
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <div className="flex items-center justify-center h-full bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl p-10">
                    {chatAtivo && agenteAtivo ? (
                      <div className="w-full h-full">
                        <AnimatePresence mode="wait">
                          {agenteAtivo === "suporte" && (
                            <AgenteSuporte 
                              onVoltar={voltarParaSelecao}
                            />
                          )}
                          
                          {agenteAtivo === "vendas" && (
                            <AgenteVendas 
                              onVoltar={voltarParaSelecao}
                            />
                          )}
                          
                          {agenteAtivo === "duvidas" && (
                            <AgenteDuvidas 
                              onVoltar={voltarParaSelecao}
                            />
                          )}
                          
                          {agenteAtivo === "financeiro" && (
                            <AgenteFinanceiro 
                              onVoltar={voltarParaSelecao}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-6">
                        {(() => {
                          const agenteEncontrado = encontrarAgente(agenteAtivo);
                          const Icone = agenteEncontrado?.icon;
                          return Icone ? <Icone className="h-12 w-12 text-[#25D366]" /> : null;
                        })()}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {encontrarAgente(agenteAtivo)?.nome}
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">
                        {encontrarAgente(agenteAtivo)?.descricao}
                      </p>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Inicie uma conversa com nosso agente de{" "}
                        {encontrarAgente(agenteAtivo)?.nome.toLowerCase()} para
                        obter ajuda personalizada.
                      </p>

                      {!carregando ? (
                        <Button
                          onClick={iniciarChat}
                          className="px-6 py-2 bg-[#25D366] hover:bg-[#20c45e] text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium text-sm mt-4 flex items-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Iniciar Chat
                        </Button>
                      ) : (
                        <div className="mt-8 flex flex-col items-center">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-16 h-16 mb-4"
                          >
                            {/* Animação personalizada baseada no agente */}
                            {agenteAtivo === "suporte" && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                  rotate: [0, 180, 360],
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1.5,
                                  ease: "easeInOut",
                                }}
                              >
                                <HeadphonesIcon className="text-[#25D366] h-10 w-10" />
                              </motion.div>
                            )}

                            {agenteAtivo === "vendas" && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                  y: [0, -10, 0],
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  ease: "easeInOut",
                                }}
                              >
                                <MessageSquare className="text-[#25D366] h-10 w-10" />
                              </motion.div>
                            )}

                            {agenteAtivo === "duvidas" && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                  opacity: [1, 0.5, 1],
                                  scale: [1, 0.9, 1],
                                  rotateY: [0, 180, 360],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 2,
                                  ease: "easeInOut",
                                }}
                              >
                                <HelpCircle className="text-[#25D366] h-10 w-10" />
                              </motion.div>
                            )}

                            {agenteAtivo === "financeiro" && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                  rotate: [0, 10, 0, -10, 0],
                                  scale: [1, 1.1, 1, 1.1, 1],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1.5,
                                  ease: "easeInOut",
                                }}
                              >
                                <CreditCard className="text-[#25D366] h-10 w-10" />
                              </motion.div>
                            )}
                          </motion.div>
                          <p className="text-sm text-gray-500">
                            Conectando ao agente...
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => setAgenteAtivo(null)}
                        className="px-4 py-2 bg-transparent hover:bg-gray-100 rounded-full transition-all text-gray-500 text-xs mt-8 font-medium"
                      >
                        Voltar para seleção
                      </button>
                    </div>
                  )}
                  </div>
                </motion.div>
              ) : (
                // Nenhum agente selecionado - mostrar tela de espera
                <div className="h-full flex items-center justify-center bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={agenteHover || "default"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center p-8 max-w-lg"
                    >
                      {agenteHover ? (
                        // Preview do agente em hover
                        <>
                          <div className="w-20 h-20 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-6">
                            {(() => {
                              const agenteEncontrado = encontrarAgente(agenteHover);
                              const Icone = agenteEncontrado?.icon;
                              return Icone ? <Icone className="h-10 w-10 text-[#25D366]" /> : null;
                            })()}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            {encontrarAgente(agenteHover)?.nome}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {encontrarAgente(agenteHover)?.descricao}
                          </p>
                          <p className="text-gray-600 mb-8">
                            Clique para iniciar uma conversa com nosso especialista em {encontrarAgente(agenteHover)?.nome.toLowerCase()}.                            
                          </p>
                        </>
                      ) : (
                        // Estado default
                        <>
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/30 flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="h-10 w-10 text-[#25D366]" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Selecione um agente
                          </h3>
                          <p className="text-gray-600 mb-8">
                            Escolha uma das opções ao lado para obter assistência personalizada.
                          </p>
                        </>
                      )}
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          Agentes disponíveis 24/7
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
