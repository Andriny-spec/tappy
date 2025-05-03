"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Send, Loader2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export interface Mensagem {
  id: string;
  conteudo: string;
  remetente: "usuario" | "agente";
  timestamp: Date;
}

export interface AgenteBaseProps {
  nome: string;
  descricao: string;
  cor: string;
  icone: string;
  avatarSrc?: string;
  instrucoes: string;
  exemplos: string[];
  onVoltar: () => void;
}

export function AgenteBase({
  nome,
  descricao,
  cor,
  icone,
  avatarSrc,
  instrucoes,
  exemplos,
  onVoltar,
}: AgenteBaseProps) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [isCarregando, setIsCarregando] = useState(false);
  const [mostrarExemplos, setMostrarExemplos] = useState(true);
  const mensagensContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mensagensContainerRef.current) {
      mensagensContainerRef.current.scrollTop = mensagensContainerRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarMensagem = async () => {
    if (!mensagemAtual.trim() || isCarregando) return;

    const novaMensagemUsuario: Mensagem = {
      id: `u-${Date.now()}`,
      conteudo: mensagemAtual,
      remetente: "usuario",
      timestamp: new Date(),
    };

    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setMensagemAtual("");
    setIsCarregando(true);
    setMostrarExemplos(false);

    try {
      // Implementação do endpoint para usar a API Deepseek
      const resposta = await fetch("/api/ai/atendimento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensagem: mensagemAtual,
          historico: mensagens,
          agente: nome,
          instrucoes: instrucoes,
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        const novaMensagemAgente: Mensagem = {
          id: `a-${Date.now()}`,
          conteudo: dados.resposta,
          remetente: "agente",
          timestamp: new Date(),
        };

        setMensagens((prev) => [...prev, novaMensagemAgente]);
      } else {
        throw new Error(dados.erro || "Erro ao processar a mensagem");
      }
    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro);
      
      // Mensagem de fallback em caso de erro
      const mensagemErro: Mensagem = {
        id: `e-${Date.now()}`,
        conteudo: "Desculpe, tive um problema para processar sua solicitação. Tente novamente mais tarde.",
        remetente: "agente",
        timestamp: new Date(),
      };
      
      setMensagens((prev) => [...prev, mensagemErro]);
    } finally {
      setIsCarregando(false);
    }
  };

  const enviarExemplo = (exemplo: string) => {
    setMensagemAtual(exemplo);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col"
    >
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg mb-6">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-10 w-10" 
                onClick={onVoltar}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div 
                className="h-12 w-12 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: `${cor}20` }}
              >
                <Image 
                  src={icone} 
                  alt={nome} 
                  width={24} 
                  height={24} 
                  className="text-transparent"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold" style={{ color: cor }}>
                  {nome}
                </h3>
                <p className="text-gray-600 text-sm">{descricao}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Área de Mensagens */}
      <div 
        ref={mensagensContainerRef}
        className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2"
        style={{ maxHeight: "calc(100vh - 350px)" }}
      >
        {mensagens.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <div 
              className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
              style={{ backgroundColor: `${cor}10` }}
            >
              <Image 
                src={icone} 
                alt={nome} 
                width={40} 
                height={40} 
                className="opacity-70"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Olá! Sou o agente de {nome.split(" ").pop()}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Como posso ajudar você hoje? Faça sua pergunta ou escolha uma das sugestões abaixo.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {mensagens.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.remetente === "usuario" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-3xl ${msg.remetente === "usuario" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.remetente === "agente" && (
                    <Avatar className="h-10 w-10 border-2" style={{ borderColor: `${cor}40` }}>
                      {avatarSrc ? (
                        <AvatarImage src={avatarSrc} alt={nome} />
                      ) : (
                        <AvatarFallback style={{ backgroundColor: cor, color: "white" }}>
                          {nome.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}
                  
                  <div
                    className={`p-4 rounded-xl shadow-sm ${
                      msg.remetente === "usuario"
                        ? "bg-[#25D366] text-white"
                        : "bg-white/90 border border-gray-100"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.conteudo}</div>
                    <div 
                      className={`text-xs mt-1 ${
                        msg.remetente === "usuario" ? "text-white/70 text-right" : "text-gray-400"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  
                  {msg.remetente === "usuario" && (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        EU
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isCarregando && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 max-w-3xl">
                  <Avatar className="h-10 w-10 border-2" style={{ borderColor: `${cor}40` }}>
                    {avatarSrc ? (
                      <AvatarImage src={avatarSrc} alt={nome} />
                    ) : (
                      <AvatarFallback style={{ backgroundColor: cor, color: "white" }}>
                        {nome.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="p-4 rounded-xl bg-white/90 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Digitando...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Exemplos de Perguntas */}
      {mostrarExemplos && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <h4 className="text-gray-600 mb-3 text-sm font-medium">Exemplos de perguntas:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exemplos.map((exemplo, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 border-white/30 hover:border-white/50 backdrop-blur-sm bg-white/50 hover:bg-white/60 text-left whitespace-normal"
                  onClick={() => enviarExemplo(exemplo)}
                >
                  {exemplo}
                </Button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Área de Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
          <div className="p-4">
            <div className="flex gap-4">
              <Textarea
                value={mensagemAtual}
                onChange={(e) => setMensagemAtual(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="min-h-12 resize-none flex-1 bg-white/50"
                disabled={isCarregando}
              />
              <Button
                onClick={enviarMensagem}
                disabled={isCarregando || !mensagemAtual.trim()}
                className="self-end shrink-0"
                style={{ backgroundColor: cor }}
              >
                {isCarregando ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
