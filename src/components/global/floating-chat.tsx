"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Users, Info, HelpCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ChatOption {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  action: () => void;
}

const chatOptions: ChatOption[] = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: "Atendimento Guiado",
    description: "Fale com um especialista sobre nossos produtos",
    color: "from-tappyGreen to-tappyGreen/80",
    action: () => window.location.href = '/suporte'
  },
  {
    icon: <Info className="w-5 h-5" />,
    title: "Nossos Planos",
    description: "Conheça nossas opções e escolha o ideal para você",
    color: "from-tappyGreen to-tappyGreen/70",
    action: () => window.location.href = '/planos'
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    title: "Central de Ajuda",
    description: "Encontre respostas para suas dúvidas",
    color: "from-tappyGreen to-tappyGreen/60",
    action: () => window.location.href = '/central-de-ajuda'
  }
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ChatOption | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Parar animação de pulso após interação
  useEffect(() => {
    if (hasInteracted) {
      setIsPulsing(false);
    }
  }, [hasInteracted]);

  // Pulsar o botão periodicamente se não houve interação
  useEffect(() => {
    if (!hasInteracted) {
      const pulseInterval = setInterval(() => {
        setIsPulsing(true);
        const timeout = setTimeout(() => {
          setIsPulsing(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }, 10000);
      
      return () => clearInterval(pulseInterval);
    }
  }, [hasInteracted]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
    setSelectedOption(null);
  };

  const handleOptionClick = (option: ChatOption) => {
    setSelectedOption(option);
    setTimeout(() => {
      option.action();
      setIsOpen(false);
      setSelectedOption(null);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botão de Chat */}
      <motion.button
        className={`rounded-full w-14 h-14 flex items-center justify-center text-white shadow-lg ${
          isOpen ? "bg-gray-700" : "bg-tappyGreen hover:bg-tappyGreen/90"
        }`}
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isPulsing ? { 
          scale: [1, 1.1, 1],
          boxShadow: [
            "0 4px 6px rgba(0, 0, 0, 0.1)", 
            "0 10px 15px rgba(37, 199, 103, 0.3)", 
            "0 4px 6px rgba(0, 0, 0, 0.1)"
          ] 
        } : {}}
        transition={{ duration: 1, repeat: isPulsing ? 1 : 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      {/* Modal de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 bg-gradient-to-r from-tappyGreen to-tappyGreen/80 text-black">
              <h3 className="font-semibold text-lg">Como podemos ajudar?</h3>
              <p className="text-sm text-black/80">Escolha uma opção abaixo</p>
            </div>

            <div className="p-3 max-h-80 overflow-y-auto">
              {chatOptions.map((option, index) => (
                <motion.div
                  key={index}
                  className="mb-3 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className={`w-full p-4 rounded-lg text-left bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-tappyGreen/20 hover:border-tappyGreen hover:shadow-md transition-all cursor-pointer relative overflow-hidden group`}
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-5 h-5 text-tappyGreen" />
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-tappyGreen/10 p-2 rounded-full mr-3">
                        <div className="text-tappyGreen">{option.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{option.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{option.description}</p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-tappyGreen/5 dark:bg-tappyGreen/20 text-center">
              <p className="text-xs text-tappyGreen dark:text-tappyGreen/90">
                Atendimento disponível 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
