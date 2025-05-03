"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, HelpCircle, Check, MessageCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// Definições de tipos
interface FAQ {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  category: FAQCategory;
  tags: string[];
  isPopular?: boolean;
}

type FAQCategory = 'geral' | 'produtos' | 'integracao' | 'conta' | 'pagamentos' | 'suporte';

// Dados de exemplo para as perguntas frequentes
const FAQ_DATA: FAQ[] = [
  {
    id: 'faq-1',
    question: 'O que é a Tappy e quais serviços oferece?',
    answer: (
      <div className="space-y-4">
        <p>
          A Tappy é uma plataforma de soluções digitais que oferece diversos serviços para otimizar a gestão e comunicação do seu negócio:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Tappy Whats:</strong> Solução completa para automação de WhatsApp Business</li>
          <li><strong>Tappy Imob:</strong> Sistema de gestão imobiliária com integração a portais</li>
          <li><strong>Tappy ID:</strong> Sistema de autenticação integrado para todas as plataformas</li>
          <li><strong>Tappy Link:</strong> Criação de links personalizados e estatísticas</li>
        </ul>
        <p>
          Todos os produtos são integrados entre si e oferecem soluções completas para diferentes necessidades de negócio.
        </p>
      </div>
    ),
    category: 'geral',
    tags: ['tappy', 'produtos', 'serviços'],
    isPopular: true
  },
  {
    id: 'faq-2',
    question: 'Como funciona a integração do WhatsApp Business com a Tappy?',
    answer: (
      <div className="space-y-4">
        <p>
          A integração do WhatsApp Business com a Tappy Whats é feita seguindo estes passos:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Cadastro na plataforma Tappy Whats</li>
          <li>Verificação do número de telefone comercial</li>
          <li>Conexão com a API oficial do WhatsApp Business</li>
          <li>Configuração do atendimento, chatbots e automações</li>
          <li>Treinamento da equipe (opcional)</li>
        </ol>
        <p>
          Todo o processo é guiado pela nossa equipe de suporte e leva em média 24-48 horas para estar completamente operacional.
        </p>
      </div>
    ),
    category: 'produtos',
    tags: ['whatsapp', 'integração', 'tappy whats'],
    isPopular: true
  },
  {
    id: 'faq-3',
    question: 'Quais são os planos e preços disponíveis?',
    answer: (
      <div className="space-y-4">
        <p>
          A Tappy oferece diferentes planos para cada produto, adaptados ao tamanho e necessidades do seu negócio:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Plano Starter:</strong> Para pequenos negócios começando a jornada digital</li>
          <li><strong>Plano Pro:</strong> Para empresas com volume médio de interações</li>
          <li><strong>Plano Enterprise:</strong> Para grandes empresas com necessidades avançadas</li>
          <li><strong>Plano Personalizado:</strong> Soluções sob medida para casos específicos</li>
        </ul>
        <p>
          Para consultar os valores atualizados, entre em contato com nossa equipe comercial ou acesse a página de preços no site.
        </p>
      </div>
    ),
    category: 'pagamentos',
    tags: ['preços', 'planos', 'assinatura'],
    isPopular: true
  },
  {
    id: 'faq-4',
    question: 'Como posso sincronizar meus imóveis com portais usando o Tappy Imob?',
    answer: (
      <div className="space-y-4">
        <p>
          A sincronização de imóveis com portais através do Tappy Imob é simples:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Acesse seu painel Tappy Imob</li>
          <li>Na seção "Integrações", selecione os portais desejados</li>
          <li>Configure as credenciais de cada portal (fornecidas por eles)</li>
          <li>Defina as regras de sincronização (automática ou manual)</li>
          <li>Selecione quais imóveis deseja sincronizar</li>
        </ol>
        <p>
          Uma vez configurado, o sistema sincronizará automaticamente seus imóveis conforme as regras definidas, mantendo todas as informações atualizadas em tempo real.
        </p>
      </div>
    ),
    category: 'produtos',
    tags: ['imobiliária', 'tappy imob', 'sincronização', 'portais'],
    isPopular: false
  },
  {
    id: 'faq-5',
    question: 'Como faço para cancelar minha assinatura?',
    answer: (
      <div className="space-y-4">
        <p>
          Para cancelar sua assinatura em qualquer produto Tappy:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Acesse seu painel administrativo</li>
          <li>Navegue até "Configurações" {'>'} "Assinatura"</li>
          <li>Clique em "Cancelar assinatura"</li>
          <li>Preencha o formulário de feedback (opcional)</li>
          <li>Confirme o cancelamento</li>
        </ol>
        <p>
          Importante: O cancelamento será efetivado ao final do ciclo de cobrança atual. Você continuará tendo acesso ao serviço até o último dia do período já pago.
        </p>
        <p className="text-gray-600 dark:text-gray-400 italic text-sm">
          Se preferir, você também pode entrar em contato com nosso suporte para auxiliar no processo de cancelamento.
        </p>
      </div>
    ),
    category: 'conta',
    tags: ['cancelamento', 'assinatura'],
    isPopular: true
  }
];

// Continuamos com mais perguntas frequentes
const MORE_FAQS: FAQ[] = [
  {
    id: 'faq-6',
    question: 'Posso migrar meus dados de outro sistema para o Tappy?',
    answer: (
      <div className="space-y-4">
        <p>
          Sim, a Tappy oferece serviços de migração de dados para todos os produtos:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Migração de banco de dados de clientes</li>
          <li>Importação de histórico de conversas (quando disponível)</li>
          <li>Transferência de imóveis e portfólio</li>
          <li>Migração de configurações e automações</li>
        </ul>
        <p>
          Nossa equipe técnica analisa caso a caso e desenvolve um plano de migração personalizado, minimizando o impacto na operação do seu negócio durante a transição.
        </p>
      </div>
    ),
    category: 'integracao',
    tags: ['migração', 'dados', 'importação'],
    isPopular: false
  },
  {
    id: 'faq-7',
    question: 'Como posso entrar em contato com o suporte técnico?',
    answer: (
      <div className="space-y-4">
        <p>
          Você pode entrar em contato com nosso suporte técnico através de vários canais:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Chat ao vivo:</strong> Disponível no painel administrativo, 24/7</li>
          <li><strong>E-mail:</strong> suporte@tappy.com.br</li>
          <li><strong>WhatsApp:</strong> +55 (11) 91234-5678</li>
          <li><strong>Central de ajuda:</strong> help.tappy.com.br</li>
          <li><strong>Telefone:</strong> 0800 123 4567 (dias úteis, 8h às 20h)</li>
        </ul>
        <p>
          Para clientes com planos Enterprise, disponibilizamos um gerente de contas dedicado e canais prioritários de atendimento.
        </p>
      </div>
    ),
    category: 'suporte',
    tags: ['suporte', 'contato', 'ajuda'],
    isPopular: true
  },
  {
    id: 'faq-8',
    question: 'Quantos usuários posso adicionar em cada plano?',
    answer: (
      <div className="space-y-4">
        <p>
          O número de usuários varia conforme o plano contratado:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Plano Starter:</strong> Até 3 usuários</li>
          <li><strong>Plano Pro:</strong> Até 10 usuários</li>
          <li><strong>Plano Enterprise:</strong> Usuários ilimitados</li>
        </ul>
        <p>
          Caso você precise de mais usuários em planos específicos, temos pacotes adicionais que podem ser contratados separadamente.
        </p>
      </div>
    ),
    category: 'conta',
    tags: ['usuários', 'limites', 'planos'],
    isPopular: false
  },
  {
    id: 'faq-9',
    question: 'A Tappy oferece API para desenvolvedores?',
    answer: (
      <div className="space-y-4">
        <p>
          Sim, a Tappy disponibiliza APIs completas para desenvolvedores em todos os produtos:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>APIs RESTful com documentação detalhada</li>
          <li>Webhooks para eventos em tempo real</li>
          <li>SDKs para as principais linguagens (Node.js, Python, PHP, Java)</li>
          <li>Ambiente de sandbox para testes</li>
        </ul>
        <p>
          Para acessar a documentação completa e começar a integrar, visite <a href="/api-docs" className="text-tappyGreen hover:underline">portal.tappy.dev</a>
        </p>
      </div>
    ),
    category: 'integracao',
    tags: ['api', 'desenvolvimento', 'integração'],
    isPopular: false
  },
  {
    id: 'faq-10',
    question: 'Como são tratados os dados de LGPD?',
    answer: (
      <div className="space-y-4">
        <p>
          A Tappy está em total conformidade com a Lei Geral de Proteção de Dados (LGPD):
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Todos os dados são armazenados com criptografia</li>
          <li>Implementamos políticas rígidas de acesso e controle</li>
          <li>Oferecemos ferramentas para que você gerencie consentimentos</li>
          <li>Possuímos DPO (Data Protection Officer) dedicado</li>
          <li>Realizamos auditorias regulares de segurança</li>
        </ul>
        <p>
          Nossa política de privacidade detalhada está disponível em <a href="/privacidade" className="text-tappyGreen hover:underline">tappy.com.br/privacidade</a>
        </p>
      </div>
    ),
    category: 'geral',
    tags: ['privacidade', 'lgpd', 'dados', 'segurança'],
    isPopular: true
  }
];

// Combinando todas as perguntas
const ALL_FAQS = [...FAQ_DATA, ...MORE_FAQS];

// Função para renderizar a página de FAQ
export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>(ALL_FAQS);
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  
  // Efeito para filtrar as perguntas com base na busca e categoria
  useEffect(() => {
    let result = ALL_FAQS;
    
    // Filtrar por categoria
    if (activeCategory !== 'all') {
      result = result.filter(faq => faq.category === activeCategory);
    }
    
    // Filtrar por termo de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(query)) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredFAQs(result);
  }, [searchQuery, activeCategory]);
  
  // Encontrar as perguntas populares
  const popularFAQs = ALL_FAQS.filter(faq => faq.isPopular);
  
  // Agrupar categorias para exibição
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'geral', label: 'Geral' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'integracao', label: 'Integração' },
    { id: 'conta', label: 'Conta e Usuários' },
    { id: 'pagamentos', label: 'Pagamentos' },
    { id: 'suporte', label: 'Suporte' },
  ];
  
  // Handler para o formulário de busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // A busca já é feita em tempo real pelo useEffect
  };
  
  // Handler para o accordion
  const handleAccordionChange = (value: string) => {
    setExpandedFAQs(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-b from-gray-900 to-background dark:from-black dark:to-background border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center rounded-full bg-tappyGreen/10 p-2">
                  <HelpCircle className="h-8 w-8 text-tappyGreen" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Dúvidas Frequentes
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Encontre respostas para as perguntas mais comuns sobre os produtos e serviços Tappy
              </p>
              
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar perguntas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg bg-white/10 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-400 rounded-full"
                />
                <Button 
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-tappyGreen text-black hover:bg-tappyGreen/90"
                >
                  Buscar
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
        
        {/* Perguntas Populares */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar com categorias */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Categorias
                  </h2>
                  
                  <Tabs 
                    defaultValue="all" 
                    onValueChange={setActiveCategory}
                    orientation="vertical"
                    className="w-full"
                  >
                    <TabsList className="flex flex-col h-auto bg-transparent space-y-1 p-0">
                      {categories.map((category) => (
                        <TabsTrigger 
                          key={category.id} 
                          value={category.id}
                          className="justify-start h-auto border border-transparent data-[state=active]:border-tappyGreen/20 data-[state=active]:bg-tappyGreen/10 data-[state=active]:text-tappyGreen rounded-lg px-4 py-2 w-full text-left"
                        >
                          {category.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Não encontrou o que procura?
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Nossa equipe está pronta para ajudar com qualquer dúvida que você tenha.
                  </p>
                  
                  <Button 
                    className="w-full gap-2"
                    variant="outline"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Fale conosco</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Conteúdo principal */}
            <div className="lg:col-span-9">
              {/* Perguntas mais populares */}
              {searchQuery === '' && activeCategory === 'all' && (
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mr-3">
                      Perguntas mais populares
                    </h2>
                    <Badge variant="outline" className="bg-tappyGreen/10 text-tappyGreen border-tappyGreen/20">
                      Populares
                    </Badge>
                  </div>
                  
                  <Accordion
                    type="multiple"
                    value={expandedFAQs}
                    onValueChange={handleAccordionChange}
                    className="space-y-4"
                  >
                    {popularFAQs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left text-gray-900 dark:text-white font-medium text-lg">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-5 py-4 bg-gray-50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
              
              {/* Todas as perguntas ou resultado da busca */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchQuery 
                      ? `Resultados da busca (${filteredFAQs.length})` 
                      : (activeCategory !== 'all' 
                        ? `${categories.find(c => c.id === activeCategory)?.label} (${filteredFAQs.length})` 
                        : 'Todas as perguntas')}
                  </h2>
                  
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      onClick={() => setSearchQuery('')}
                      size="sm"
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      Limpar busca
                    </Button>
                  )}
                </div>
                
                {filteredFAQs.length > 0 ? (
                  <Accordion
                    type="multiple"
                    value={expandedFAQs}
                    onValueChange={handleAccordionChange}
                    className="space-y-4"
                  >
                    {filteredFAQs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left text-gray-900 dark:text-white font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-5 py-4 bg-gray-50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Nenhuma pergunta encontrada
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      Não encontramos perguntas correspondentes aos seus critérios. Tente ajustar sua busca ou entre em contato conosco.
                    </p>
                    
                    <Button onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}>
                      Ver todas as perguntas
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Formulário de contato */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-16 p-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4">
                      Ainda tem dúvidas?
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      Nossa equipe está pronta para ajudar. Envie sua pergunta e responderemos o mais rápido possível.
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-tappyGreen mr-2" />
                        <span>Resposta em até 24 horas úteis</span>
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-tappyGreen mr-2" />
                        <span>Atendimento personalizado</span>
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-tappyGreen mr-2" />
                        <span>Experts em todos os produtos</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="md:w-1/3">
                    <Button 
                      size="lg"
                      className="w-full gap-2 bg-tappyGreen hover:bg-tappyGreen/90 text-black font-medium"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Enviar uma pergunta</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
