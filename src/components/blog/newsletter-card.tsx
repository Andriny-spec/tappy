"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simular envio (aqui seria a integração com a API)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Resetar para o estado inicial após alguns segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl bg-gradient-to-br from-tappyGreen/10 via-white/50 to-white/80 dark:from-tappyGreen/20 dark:via-gray-900/60 dark:to-gray-900/80 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-tappyGreen/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 translate-x-1/3 translate-y-1/3 bg-tappyGreen/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-tappyGreen/20 flex items-center justify-center">
            <Send className="h-6 w-6 text-tappyGreen" />
          </div>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Inscreva-se na nossa newsletter
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Receba as últimas novidades, tutoriais e dicas para maximizar seus resultados com as soluções Tappy.
        </p>
        
        {isSubmitted ? (
          <motion.div 
            className="flex items-center justify-center text-tappyGreen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Check className="h-5 w-5 mr-2" />
            <span className="font-medium">Obrigado por se inscrever!</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-full px-4 border-gray-300 dark:border-gray-700 focus:border-tappyGreen focus:ring-tappyGreen/20"
              />
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="rounded-full bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium min-w-[120px]"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Inscrever-se'
                )}
              </Button>
            </div>
          </form>
        )}
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Nós respeitamos sua privacidade. Cancele a qualquer momento.
        </p>
      </div>
    </motion.div>
  );
}
