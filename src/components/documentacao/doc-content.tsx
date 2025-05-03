"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Copy, Check, ExternalLink, ArrowLeft, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DocContentMetadata {
  title: string;
  description: string;
  lastUpdated: string;
  authors?: string[];
  tags?: string[];
  prevDoc?: {
    title: string;
    href: string;
  };
  nextDoc?: {
    title: string;
    href: string;
  };
}

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
}

interface DocContentProps {
  metadata: DocContentMetadata;
  children: React.ReactNode;
  className?: string;
}

// Componente de bloco de código
export function CodeBlock({ language, code, filename }: CodeBlockProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/90">
      {filename && (
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            {filename}
          </div>
          <div className="flex items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">
              {language}
            </div>
            <button
              onClick={handleCopy}
              className="p-1 rounded-md text-gray-500 hover:text-tappyGreen hover:bg-gray-200/50 dark:hover:bg-gray-700/70 transition-colors"
              aria-label="Copiar código"
            >
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
      
      <div className="relative">
        {!filename && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-200/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 hover:text-tappyGreen transition-colors"
            aria-label="Copiar código"
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
        
        <pre className={`p-4 overflow-x-auto language-${language}`}>
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Componente de alerta/callout
export function DocAlert({ 
  type = 'info', 
  title, 
  children 
}: { 
  type?: 'info' | 'warning' | 'success' | 'error', 
  title?: string, 
  children: React.ReactNode 
}) {
  const styles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      icon: <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      icon: <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
    }
  };

  return (
    <div className={`my-6 p-4 rounded-lg ${styles[type].bg} ${styles[type].border} border`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {styles[type].icon}
        </div>
        <div className="ml-3">
          {title && (
            <h3 className={`text-sm font-medium ${styles[type].text}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${styles[type].text} mt-2`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente principal para o conteúdo da documentação
export function DocContent({ metadata, children, className }: DocContentProps) {
  const [feedbackGiven, setFeedbackGiven] = React.useState<'helpful' | 'not-helpful' | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.div 
      className={cn("w-full max-w-3xl mx-auto", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cabeçalho */}
      <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {metadata.title}
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {metadata.description}
        </p>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
          <div>
            Última atualização: {formatDate(metadata.lastUpdated)}
          </div>
          
          {metadata.authors && metadata.authors.length > 0 && (
            <div className="flex items-center">
              <span className="mr-2">Autores:</span>
              <div className="flex -space-x-2">
                {metadata.authors.map((author, index) => (
                  <div 
                    key={index} 
                    className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800"
                    title={author}
                  >
                    {author.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Navegação na seção */}
      <div className="mb-8 py-4 px-5 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm">
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Link href="/documentacao" className="hover:text-tappyGreen">
            Documentação
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white font-medium">
            {metadata.title}
          </span>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
        {children}
      </div>
      
      {/* Feedback do conteúdo */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Esta documentação foi útil?
        </h3>
        
        <div className="flex items-center gap-4">
          <Button
            variant={feedbackGiven === 'helpful' ? 'default' : 'outline'}
            size="sm"
            className={`rounded-full ${feedbackGiven === 'helpful' ? 'bg-tappyGreen text-white hover:bg-tappyGreen/90' : ''}`}
            onClick={() => setFeedbackGiven('helpful')}
            disabled={feedbackGiven !== null}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Sim, foi útil
          </Button>
          
          <Button
            variant={feedbackGiven === 'not-helpful' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
            onClick={() => setFeedbackGiven('not-helpful')}
            disabled={feedbackGiven !== null}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Não foi útil
          </Button>
        </div>
        
        {feedbackGiven && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Obrigado pelo seu feedback! Ele nos ajuda a melhorar nossa documentação.
          </div>
        )}
      </div>
      
      {/* Navegação entre páginas */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
        {metadata.prevDoc && (
          <Link
            href={metadata.prevDoc.href}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-tappyGreen dark:hover:border-tappyGreen group transition-colors"
          >
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Anterior</span>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-tappyGreen transition-colors">
              {metadata.prevDoc.title}
            </h4>
          </Link>
        )}
        
        {metadata.nextDoc && (
          <Link
            href={metadata.nextDoc.href}
            className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-tappyGreen dark:hover:border-tappyGreen group transition-colors ${
              !metadata.prevDoc ? 'md:col-start-2' : ''
            }`}
          >
            <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Próximo</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-tappyGreen transition-colors text-right">
              {metadata.nextDoc.title}
            </h4>
          </Link>
        )}
      </div>
      
      {/* Links externos */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Recursos relacionados
        </h3>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            href="#"
            className="inline-flex items-center text-sm text-tappyGreen hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            <span>Demonstração interativa</span>
          </Link>
          
          <Link 
            href="#"
            className="inline-flex items-center text-sm text-tappyGreen hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            <span>Vídeo tutorial</span>
          </Link>
          
          <Link 
            href="#"
            className="inline-flex items-center text-sm text-tappyGreen hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
