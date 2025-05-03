"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function AcessibilidadePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Header */}
        <div className="w-full py-12 bg-gradient-to-b from-gray-900 to-background dark:from-black dark:to-background border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center rounded-full bg-tappyGreen/10 p-2">
                  <Eye className="h-8 w-8 text-tappyGreen" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Declaração de Acessibilidade
              </h1>
              
              <p className="text-lg text-gray-300">
                Atualizada em 02 de maio de 2025
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-tappyGreen mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar para a página inicial</span>
            </Link>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm mb-10">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2>Nosso Compromisso com a Acessibilidade</h2>
                <p>
                  A Tappy está comprometida em garantir a acessibilidade digital para pessoas com deficiências. Estamos continuamente melhorando a experiência do usuário para todos e aplicando os padrões de acessibilidade relevantes.
                </p>
                
                <h2>Medidas de Conformidade</h2>
                <p>
                  A Tappy tem como objetivo estar em conformidade com as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.1 de nível AA e trabalha continuamente para garantir que nossos sites e aplicativos sejam acessíveis a todos os usuários. Tomamos as seguintes medidas para garantir a acessibilidade:
                </p>
                <ul>
                  <li>Incluímos a acessibilidade como parte de nossa missão</li>
                  <li>Integramos a acessibilidade em nosso planejamento, desenvolvimento e processos operacionais</li>
                  <li>Designamos recursos para implementar e manter a acessibilidade</li>
                  <li>Treinamos nossa equipe em práticas e ferramentas de acessibilidade</li>
                  <li>Realizamos testes regulares de acessibilidade com ferramentas automatizadas e usuários reais</li>
                </ul>
                
                <h2>Funcionalidades de Acessibilidade</h2>
                <p>
                  Nossos sites e aplicativos incluem as seguintes funcionalidades de acessibilidade:
                </p>
                
                <h3>Navegação</h3>
                <ul>
                  <li>Navegação consistente em todo o site</li>
                  <li>Links descritivos e únicos</li>
                  <li>Suporte a navegação por teclado</li>
                  <li>Suporte a leitor de tela</li>
                  <li>Pular para o conteúdo principal</li>
                </ul>
                
                <h3>Design e Conteúdo</h3>
                <ul>
                  <li>Contraste de cores adequado entre texto e fundo</li>
                  <li>Textos redimensionáveis sem perda de funcionalidade</li>
                  <li>Alternativas de texto para conteúdo não textual</li>
                  <li>Estrutura de cabeçalho clara e hierárquica</li>
                  <li>Suporte ao modo escuro para reduzir a fadiga visual</li>
                </ul>
                
                <h3>Formulários e Interações</h3>
                <ul>
                  <li>Rótulos de formulário associados corretamente aos campos</li>
                  <li>Instruções claras para preenchimento de formulários</li>
                  <li>Validação e feedback de erro compreensíveis</li>
                  <li>Tempo suficiente para completar ações</li>
                  <li>Mecanismos alternativos para interações complexas</li>
                </ul>
                
                <h2>Tecnologias Assistivas Suportadas</h2>
                <p>
                  Nossos sites e aplicativos são projetados para funcionar com as seguintes tecnologias assistivas:
                </p>
                <ul>
                  <li>Leitores de tela (incluindo NVDA, JAWS, VoiceOver e TalkBack)</li>
                  <li>Software de ampliação de tela</li>
                  <li>Software de reconhecimento de voz</li>
                  <li>Dispositivos de entrada alternativos</li>
                  <li>Navegadores com funcionalidades de acessibilidade</li>
                </ul>
                
                <h2>Limitações Conhecidas</h2>
                <p>
                  Apesar de nossos esforços para garantir que nossos sites e aplicativos sejam acessíveis, pode haver algumas limitações:
                </p>
                <ul>
                  <li>Alguns conteúdos de terceiros podem não estar totalmente acessíveis</li>
                  <li>Alguns conteúdos mais antigos podem não atender completamente aos padrões atuais</li>
                  <li>Estamos trabalhando continuamente para resolver quaisquer problemas de acessibilidade identificados</li>
                </ul>
                
                <h2>Avaliação de Conformidade</h2>
                <p>
                  A Tappy avalia regularmente a conformidade de seus sites e aplicativos com os padrões de acessibilidade através de:
                </p>
                <ul>
                  <li>Testes automatizados usando ferramentas especializadas</li>
                  <li>Avaliações manuais por especialistas em acessibilidade</li>
                  <li>Testes com usuários reais que utilizam tecnologias assistivas</li>
                  <li>Auditorias periódicas por consultores externos</li>
                </ul>
                
                <h2>Feedback e Contato</h2>
                <p>
                  Valorizamos seu feedback sobre a acessibilidade de nossos sites e aplicativos. Se você encontrar barreiras de acessibilidade ou tiver sugestões para melhorias, entre em contato conosco:
                </p>
                <ul>
                  <li>E-mail: acessibilidade@tappy.com.br</li>
                  <li>Telefone: (11) 1234-5678</li>
                  <li>Formulário de feedback: <a href="/contato" className="text-tappyGreen hover:underline">tappy.com.br/contato</a></li>
                </ul>
                <p>
                  Nos comprometemos a responder ao seu feedback no prazo de 2 dias úteis e a abordar quaisquer problemas identificados dentro de um prazo razoável.
                </p>
                
                <h2>Compromisso Contínuo</h2>
                <p>
                  A Tappy está comprometida com a melhoria contínua da acessibilidade de seus sites e aplicativos. Revisamos regularmente nossa declaração de acessibilidade e fazemos as atualizações necessárias. Esta declaração foi atualizada pela última vez em 02 de maio de 2025.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-tappyGreen/10 to-tappyGreen/5 rounded-xl p-6 border border-tappyGreen/20 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recursos de Acessibilidade
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tamanho da fonte</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Você pode ajustar o tamanho da fonte usando seu navegador:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• No Chrome/Edge: Ctrl/Cmd + "+" para aumentar, Ctrl/Cmd + "-" para diminuir</li>
                    <li>• No Firefox: Ctrl/Cmd + "+" para aumentar, Ctrl/Cmd + "-" para diminuir</li>
                    <li>• No Safari: Cmd + "+" para aumentar, Cmd + "-" para diminuir</li>
                  </ul>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Navegação por teclado</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Você pode navegar pelo site usando apenas o teclado:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Tab: Avançar para o próximo elemento</li>
                    <li>• Shift + Tab: Retornar ao elemento anterior</li>
                    <li>• Enter: Ativar um link ou botão</li>
                    <li>• Setas: Navegar dentro de menus e listas</li>
                  </ul>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tema escuro</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Nosso site detecta automaticamente suas preferências de tema:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Tema claro ou escuro com base nas configurações do seu sistema</li>
                    <li>• Você pode alternar entre temas usando o botão no cabeçalho</li>
                    <li>• O tema escuro reduz o brilho e a fadiga visual</li>
                  </ul>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Textos alternativos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Oferecemos textos alternativos para conteúdos não textuais:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Todas as imagens possuem descrições alternativas</li>
                    <li>• Vídeos têm legendas e transcrições disponíveis</li>
                    <li>• Ícones têm rótulos acessíveis para leitores de tela</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Encontrou alguma barreira de acessibilidade?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ajude-nos a melhorar reportando problemas de acessibilidade
                </p>
              </div>
              
              <Button className="gap-2 bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                Reportar problema
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
