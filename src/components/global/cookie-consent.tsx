"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    essential: true, // Sempre ativo
    performance: false,
    analytics: false,
    marketing: false
  });

  // Verificar se o consentimento já foi dado
  useEffect(() => {
    const consentGiven = localStorage.getItem('tappy-cookie-consent');
    if (!consentGiven) {
      // Atrasar o aparecimento para não ser imediato na carga da página
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    setCookiePreferences({
      essential: true,
      performance: true,
      analytics: true,
      marketing: true
    });
    savePreferences({
      essential: true,
      performance: true,
      analytics: true,
      marketing: true
    });
    setIsVisible(false);
  };

  const acceptEssential = () => {
    savePreferences({
      essential: true,
      performance: false,
      analytics: false,
      marketing: false
    });
    setIsVisible(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('tappy-cookie-consent', 'true');
    localStorage.setItem('tappy-cookie-preferences', JSON.stringify(prefs));

    // Aqui você adicionaria a lógica real para configurar cookies baseado nas preferências
    console.log('Preferências de cookies salvas:', prefs);
    
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Não permitir alteração dos cookies essenciais
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {!showSettings ? (
                // Tela principal
                <div className="p-6 md:flex items-start gap-6 relative">
                  {/* Ícone */}
                  <div className="hidden md:flex p-4 md:p-0">
                    <div className="w-14 h-14 rounded-full bg-tappyGreen/10 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-7 h-7 text-tappyGreen" />
                    </div>
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="md:flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 pr-8">
                      Sua privacidade é importante
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. Você pode escolher quais cookies deseja permitir. Para mais informações, consulte nossa <Link href="/cookies" className="text-tappyGreen hover:underline">Política de Cookies</Link>.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        onClick={acceptAll}
                        className="bg-tappyGreen hover:bg-tappyGreen/90 text-black"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Aceitar todos
                      </Button>
                      <Button 
                        onClick={acceptEssential}
                        variant="outline"
                        className="border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-200 dark:border-gray-600"
                      >
                        Apenas essenciais
                      </Button>
                      <Button 
                        onClick={() => setShowSettings(true)}
                        variant="ghost"
                        className="text-gray-700 dark:text-gray-200"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Personalizar
                      </Button>
                    </div>
                  </div>
                  
                  {/* Botão de fechar */}
                  <button 
                    onClick={acceptEssential} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                // Tela de configurações
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Configurações de cookies
                    </h3>
                    <button 
                      onClick={() => setShowSettings(false)} 
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {/* Cookies Essenciais */}
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="mr-3 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Cookies Essenciais</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={cookiePreferences.essential} 
                            disabled={true}
                            className="sr-only" 
                            id="essential-cookies" 
                          />
                          <label 
                            htmlFor="essential-cookies"
                            className="flex items-center cursor-not-allowed"
                          >
                            <div className="relative w-10 h-6 bg-tappyGreen rounded-full">
                              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Necessários para o funcionamento básico do site. O site não pode funcionar corretamente sem esses cookies.
                      </p>
                    </div>
                    
                    {/* Cookies de Desempenho */}
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="mr-3 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Cookies de Desempenho</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={cookiePreferences.performance} 
                            onChange={() => togglePreference('performance')}
                            className="sr-only" 
                            id="performance-cookies" 
                          />
                          <label 
                            htmlFor="performance-cookies"
                            className="flex items-center cursor-pointer"
                          >
                            <div className={`relative w-10 h-6 ${cookiePreferences.performance ? 'bg-tappyGreen' : 'bg-gray-200 dark:bg-gray-700'} rounded-full transition-colors`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${cookiePreferences.performance ? 'left-5' : 'left-1'}`}></div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Ajudam a melhorar o desempenho e funcionalidade do site, mas não são essenciais.
                      </p>
                    </div>
                    
                    {/* Cookies Analíticos */}
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="mr-3 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Cookies Analíticos</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={cookiePreferences.analytics} 
                            onChange={() => togglePreference('analytics')}
                            className="sr-only" 
                            id="analytics-cookies" 
                          />
                          <label 
                            htmlFor="analytics-cookies"
                            className="flex items-center cursor-pointer"
                          >
                            <div className={`relative w-10 h-6 ${cookiePreferences.analytics ? 'bg-tappyGreen' : 'bg-gray-200 dark:bg-gray-700'} rounded-full transition-colors`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${cookiePreferences.analytics ? 'left-5' : 'left-1'}`}></div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Permitem-nos analisar o uso do site e melhorar a experiência do usuário.
                      </p>
                    </div>
                    
                    {/* Cookies de Marketing */}
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="mr-3 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <Cookie className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Cookies de Marketing</h4>
                        </div>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={cookiePreferences.marketing} 
                            onChange={() => togglePreference('marketing')}
                            className="sr-only" 
                            id="marketing-cookies" 
                          />
                          <label 
                            htmlFor="marketing-cookies"
                            className="flex items-center cursor-pointer"
                          >
                            <div className={`relative w-10 h-6 ${cookiePreferences.marketing ? 'bg-tappyGreen' : 'bg-gray-200 dark:bg-gray-700'} rounded-full transition-colors`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${cookiePreferences.marketing ? 'left-5' : 'left-1'}`}></div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Usados para rastrear visitantes em sites para exibir anúncios relevantes para o usuário.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 justify-end">
                    <Button 
                      onClick={() => savePreferences(cookiePreferences)}
                      className="bg-tappyGreen hover:bg-tappyGreen/90 text-black"
                    >
                      Salvar preferências
                    </Button>
                    <Button 
                      onClick={() => setShowSettings(false)}
                      variant="ghost"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
