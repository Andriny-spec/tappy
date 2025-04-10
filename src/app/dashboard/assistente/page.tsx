'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { sendMessageToDeepSeek } from '@/lib/services/deepseek-service';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const modelOptions = [
  { value: 'deepseek-chat', label: 'DeepSeek Chat' },
  { value: 'deepseek-coder', label: 'DeepSeek Coder' },
];

export default function AssistentePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou o Assistente Tappy, como posso ajudar você hoje?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lista de sugestões iniciais
  const suggestions = [
    'Como posso aumentar minhas vendas?',
    'Gerar um relatório de desempenho mensal',
    'Quais são as melhores práticas para atendimento?',
    'Ideias para marketing no WhatsApp',
  ];

  // Scroll para o final da conversa quando novas mensagens chegarem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: generateUniqueId(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Preparar o histórico de mensagens para enviar para a API DeepSeek
      const messageHistory = messages
        .concat(userMessage)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Remover a primeira mensagem se for do assistente (mensagem de boas-vindas)
      if (messageHistory.length > 0 && messageHistory[0].role === 'assistant') {
        messageHistory.shift();
      }
      
      // Chamada à API DeepSeek
      const response = await sendMessageToDeepSeek(messageHistory, selectedModel);
      
      // Criar mensagem de resposta
      const assistantMessage: Message = {
        id: generateUniqueId(),
        role: 'assistant',
        content: response.error ? 
          `Erro ao conectar com a API: ${response.error}` : 
          response.content,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Mensagem de erro para o usuário
      setMessages((prev) => [
        ...prev,
        {
          id: generateUniqueId(),
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Assistente Tappy</h1>
          <p className="text-muted-foreground">Seu assistente inteligente para ajudar com suas tarefas</p>
        </div>
        <Badge className="bg-white border-[#25D366] text-[#25D366] border flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          Inteligência Artificial
        </Badge>
      </div>

      <Card className="flex flex-col h-[calc(100vh-200px)]">
        <CardHeader className="px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#25D366]" />
            <CardTitle className="text-lg">Conversa com Assistente</CardTitle>
          </div>
          <CardDescription>
            Use linguagem natural para fazer perguntas ou solicitar ajuda
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex w-max max-w-[80%] rounded-lg p-4',
                message.role === 'user'
                  ? 'ml-auto bg-[#25D366] text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              )}
            >
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full">
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="mt-1 text-xs opacity-50">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-max max-w-[80%] rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="whitespace-pre-wrap">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-[#25D366] animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-[#25D366] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 rounded-full bg-[#25D366] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        
        <CardFooter className="p-4 border-t">
          <div className="flex w-full items-center gap-2">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-10 flex-1"
              rows={1}
            />
            <Button 
              size="icon" 
              className="rounded-full bg-[#25D366] hover:bg-[#128C7E]"
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensagem</span>
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> 
            Pressione Enter para enviar, Shift+Enter para nova linha
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
