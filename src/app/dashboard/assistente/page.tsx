"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2, Bot, RotateCcw } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Mensagem {
  id: string;
  conteudo: string;
  remetente: "usuario" | "assistente";
  timestamp: Date;
}

export default function AssistentePage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [isCarregando, setIsCarregando] = useState(false);
  const mensagensContainerRef = useRef<HTMLDivElement>(null);

  // Exemplos de perguntas para o assistente
  const exemplos = [
    "Me explique como funciona a plataforma Tappy Whats",
    "Quais são os principais recursos do Tappy Imob?",
    "Como posso integrar meu banco de imóveis no Tappy?",
    "Qual a diferença entre Tappy Link e Tappy ID?"
  ];

  useEffect(() => {
    if (mensagensContainerRef.current) {
      mensagensContainerRef.current.scrollTop = mensagensContainerRef.current.scrollHeight;
    }
  }, [mensagens]);

  // Mensagem de boas-vindas ao carregar a página
  useEffect(() => {
    const mensagemBoasVindas: Mensagem = {
      id: `a-${Date.now()}`,
      conteudo: "Olá! Sou seu assistente Tappy. Como posso ajudar você hoje?",
      remetente: "assistente",
      timestamp: new Date(),
    };
    setMensagens([mensagemBoasVindas]);
  }, []);

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

    try {
      // Preparar o histórico de mensagens para enviar à API
      const historicoFormatado = mensagens.map(msg => ({
        role: msg.remetente === "usuario" ? "user" : "assistant",
        content: msg.conteudo
      }));

      // Implementação do endpoint para usar a API DeepSeek
      const resposta = await fetch("/api/ai/assistente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensagem: mensagemAtual,
          historico: historicoFormatado,
          // Buscamos dados da base de conhecimento do suporte
          baseDeConhecimento: true
        }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        const novaMensagemAssistente: Mensagem = {
          id: `a-${Date.now()}`,
          conteudo: dados.resposta,
          remetente: "assistente",
          timestamp: new Date(),
        };

        setMensagens((prev) => [...prev, novaMensagemAssistente]);
      } else {
        throw new Error(dados.erro || "Erro ao processar a mensagem");
      }
    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro);
      
      // Mensagem de fallback em caso de erro
      const mensagemErro: Mensagem = {
        id: `e-${Date.now()}`,
        conteudo: "Desculpe, tive um problema para processar sua solicitação. Tente novamente mais tarde.",
        remetente: "assistente",
        timestamp: new Date(),
      };
      
      setMensagens((prev) => [...prev, mensagemErro]);
    } finally {
      setIsCarregando(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  const enviarExemplo = (exemplo: string) => {
    setMensagemAtual(exemplo);
  };

  const limparHistorico = () => {
    const mensagemBoasVindas: Mensagem = {
      id: `a-${Date.now()}`,
      conteudo: "Histórico limpo. Como posso ajudar você agora?",
      remetente: "assistente",
      timestamp: new Date(),
    };
    setMensagens([mensagemBoasVindas]);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Card className="border-none shadow-lg backdrop-blur-sm bg-white/80">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8" />
              <div>
                <CardTitle className="text-xl">Assistente Tappy</CardTitle>
                <CardDescription className="text-gray-100">
                  Integrado com a base de conhecimento de suporte
                </CardDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={limparHistorico}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Área de Mensagens */}
          <div 
            ref={mensagensContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4"
            style={{ height: "calc(70vh - 200px)", minHeight: "400px" }}
          >
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
                    {msg.remetente === "assistente" && (
                      <Avatar className="h-10 w-10 border-2 border-emerald-200">
                        <AvatarFallback className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                          TP
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`p-4 rounded-xl shadow-sm ${
                        msg.remetente === "usuario"
                          ? "bg-emerald-500 text-white"
                          : "bg-white border border-gray-100"
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
                    <Avatar className="h-10 w-10 border-2 border-emerald-200">
                      <AvatarFallback className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                        TP
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Pensando...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Exemplos de Perguntas - Mostrar apenas se não tiver mensagens do usuário */}
          {mensagens.length <= 1 && (
            <div className="px-6 mb-6">
              <h4 className="text-gray-600 mb-3 text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Perguntas sugeridas:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exemplos.map((exemplo, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 border border-emerald-100 hover:border-emerald-200 text-left whitespace-normal"
                    onClick={() => enviarExemplo(exemplo)}
                  >
                    {exemplo}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Área de Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-4">
              <Textarea
                value={mensagemAtual}
                onChange={(e) => setMensagemAtual(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="min-h-12 resize-none flex-1"
                disabled={isCarregando}
              />
              <Button
                onClick={enviarMensagem}
                disabled={isCarregando || !mensagemAtual.trim()}
                className="self-end shrink-0 bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
              >
                {isCarregando ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}