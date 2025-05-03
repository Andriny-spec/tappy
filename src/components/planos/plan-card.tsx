"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, User, Phone, Mail, Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlanFeature } from '@/app/planos/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PlanCardProps {
  planId: string;
  title: string;
  description: string;
  price: number;
  period: string;
  features: PlanFeature[];
  discount?: number;
  ctaText?: string;
  ctaLink?: string;
  popular?: boolean;
  highlighted?: boolean;
  colorClass?: string;
  index?: number;
}

export default function PlanCard({
  planId,
  title,
  description,
  price,
  period,
  features,
  discount,
  ctaText = 'Contratar',
  ctaLink = '#',
  popular = false,
  highlighted = false,
  colorClass = 'bg-tappyGreen hover:bg-tappyGreen/90',
  index = 0
}: PlanCardProps) {
  // Estados para o modal de contratação
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{id: string; title: string; price: number} | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Formatador de moeda
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
  
  // Função para formatar telefone com máscara
  const formatPhone = (value: string) => {
    // Remove todos os caracteres não-numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (00) 00000-0000
    if (numbers.length <= 11) {
      let formatted = numbers;
      
      if (numbers.length > 2) {
        formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
      }
      
      if (numbers.length > 7) {
        formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`;
      }
      
      return formatted;
    }
    
    return value;
  };
  
  // Manipulador para o campo de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };
  
  // Abrir modal de contratação
  const showContractModal = (planId: string, planTitle: string, planPrice: number) => {
    setSelectedPlan({ id: planId, title: planTitle, price: planPrice });
    setModalOpen(true);
  };
  
  // Função para lidar com a contratação
  const handleContract = async () => {
    if (!email || !phone) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setLoading(true);
    
    try {
      // Formatar o telefone (remover mascara)
      const phoneNumberDigits = phone.replace(/\D/g, '');
      
      // Criar pré-registro do assinante no sistema
      const preRegistroResponse = await fetch('/api/assinantes/pre-registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phone: phoneNumberDigits,
          planId
        }),
      });
      
      if (!preRegistroResponse.ok) {
        const errorData = await preRegistroResponse.json();
        console.error('Erro ao criar pré-registro:', errorData);
        throw new Error(errorData.error || 'Erro ao criar conta');
      }
      
      const preRegistroData = await preRegistroResponse.json();
      console.log('Pré-registro criado com sucesso:', preRegistroData);
      
      // Adicionar parâmetros de email e telefone ao link original
      const separator = ctaLink.includes('?') ? '&' : '?';
      const finalUrl = `${ctaLink}${separator}email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phoneNumberDigits)}`;
      
      console.log('Redirecionando para:', finalUrl);
      
      // Mostrar toast e redirecionar
      toast.success('Redirecionando para o pagamento...');
      
      setTimeout(() => {
        window.location.href = finalUrl;
      }, 1000);
    } catch (error) {
      console.error('Erro ao processar a contratação:', error);
      toast.error('Erro ao processar sua solicitação');
      setLoading(false);
    }
  };
  
  // Certificar que as features são renderizadas corretamente
  const preparedFeatures = features.map(feature => {
    if (typeof feature === 'string') {
      return { title: feature, included: true };
    }
    return feature;
  });

  return (
    <>
      <motion.div
        className={`relative flex flex-col h-full overflow-hidden ${
          popular ? "border-2 border-tappyGreen" : "border border-gray-200 dark:border-gray-700"
        } rounded-xl bg-white dark:bg-gray-800 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        {popular && (
          <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
            <div className="font-medium text-xs px-3 py-1 bg-tappyGreen text-white rounded-full shadow-sm">
              Mais popular
            </div>
          </div>
        )}
        
        {/* Header do Card */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatter.format(price)}</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">/{period}</span>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        
        {/* Lista de Recursos */}
        <div className="flex-grow flex flex-col p-6">
          <ul className="space-y-4 mb-6 flex-grow">
            {preparedFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <div 
                  className={`flex items-center justify-center w-5 h-5 rounded-full mr-3 mt-0.5 ${
                    feature.included ? "text-tappyGreen" : "text-gray-300 dark:text-gray-600"
                  }`}
                >
                  {feature.included ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="block w-4 h-4"></span>
                  )}
                </div>
                <span className={`text-sm ${
                  feature.included 
                    ? "text-gray-700 dark:text-gray-300" 
                    : "text-gray-400 dark:text-gray-500 line-through"
                }`}>
                  {feature.title}
                </span>
              </li>
            ))}
          </ul>
          
          {/* CTA Button */}
          <div className="mt-auto">
            <Button 
              onClick={() => showContractModal(planId, title, price)}
              className={`w-full ${
                popular 
                  ? "bg-tappyGreen hover:bg-tappyGreen/90 hover:text-gray-900 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-tappyGreen hover:text-tappyGreen"
              }`}
            >
              <span>{ctaText}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Modal de Contratação */}
      {modalOpen && selectedPlan && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contratar Plano</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para continuar com a assinatura
              </DialogDescription>
              <div className="mt-2">
                <p className="text-sm font-medium">Plano: <span className="font-bold">{selectedPlan.title}</span></p>
                <p className="text-sm font-medium">Valor: <span className="font-bold">{formatter.format(selectedPlan.price)}/{period}</span></p>
                <p className="mt-2 text-sm text-gray-500">Você será redirecionado para nossa página de pagamento.</p>
              </div>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(00) 00000-0000" 
                    className="pl-10"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)} disabled={loading}>Cancelar</Button>
              <Button onClick={handleContract} disabled={loading} className="bg-tappyGreen hover:bg-tappyGreen/90 hover:text-gray-900 text-white">
                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Processando...' : 'Assinar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
