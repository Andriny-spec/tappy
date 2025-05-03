"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Zap, TrendingUp, Code, Users, HeartHandshake } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import PlanCard from '@/components/planos/plan-card';
import { ProductSelector } from '@/components/planos/product-selector';
import { PeriodToggle } from '@/components/planos/period-toggle';
import { FeaturesComparison } from '@/components/planos/features-comparison';
import { fetchPlans, ProductPlans } from './api';

export default function PlanosPage() {
  // Estados
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductPlans[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [viewMode, setViewMode] = useState<'cards' | 'comparison'>('cards');

  // Efeito para buscar dados da API
  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      try {
        const data = await fetchPlans();
        
        if (data && data.length > 0) {
          setProducts(data);
          setSelectedProduct(data[0].id); // Seleciona o primeiro produto por padrão
        }
      } catch (error) {
        console.error('Failed to load plans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  // Produto selecionado
  const activeProduct = products.find(p => p.id === selectedProduct);

  // Dados para o componente de comparação de features
  const comparisonPlans = activeProduct?.plans.map(plan => ({
    id: plan.id,
    name: plan.title,
    price: selectedPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly
  })) || [];

  // Categorias de recursos para comparação baseadas nos planos ativos
  const generateFeatureCategories = () => {
    if (!activeProduct || !activeProduct.plans || activeProduct.plans.length === 0) {
      return [];
    }
    
    // Extrair todas as features únicas de todos os planos
    const allFeatures = new Set<string>();
    activeProduct.plans.forEach(plan => {
      plan.features.forEach(feature => {
        allFeatures.add(feature.title);
      });
    });
    
    // Mapeamento de planos por ID para fácil acesso
    const planMap: Record<string, any> = {};
    activeProduct.plans.forEach(plan => {
      const featureMap: Record<string, boolean> = {};
      plan.features.forEach(feature => {
        featureMap[feature.title] = feature.included;
      });
      planMap[plan.id] = featureMap;
    });
    
    // Criar categorias de features (simplificado - apenas uma categoria)
    const features = Array.from(allFeatures).map(featureName => {
      const availability: Record<string, any> = {};
      
      activeProduct.plans.forEach(plan => {
        const planFeature = plan.features.find(f => f.title === featureName);
        availability[plan.id] = planFeature ? planFeature.included : false;
      });
      
      return {
        name: featureName,
        description: featureName,
        availability
      };
    });
    
    return [
      {
        title: "Recursos",
        features
      }
    ];
  };
  
  const featureCategories = generateFeatureCategories();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-gray-50/30 dark:to-gray-900/30">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-background border-b border-gray-800">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute bg-[url(/grid-pattern.svg)] bg-repeat inset-0 opacity-20"></div>
          </div>
          <div className="absolute top-0 left-1/3 w-1/3 h-1/2 bg-tappyGreen/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-1/3 h-1/2 bg-tappyGreen/10 rounded-full filter blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Planos e preços para <span className="text-tappyGreen">todos os negócios</span>
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                  Escolha o plano ideal para seu negócio, com recursos poderosos e preços competitivos
                </p>
                
                <div className="mt-6">
                  <PeriodToggle 
                    selectedPeriod={selectedPeriod}
                    onPeriodChange={setSelectedPeriod}
                    discount={20}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Plataformas Tabs Section */}
        <section className="py-5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30 shadow-sm">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center h-12">
                <div className="animate-spin h-6 w-6 border-3 border-tappyGreen border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="inline-flex bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-100 dark:border-gray-800 p-1">
                  {products.map((product) => {
                    const isActive = selectedProduct === product.id;
                    const productColor = product.id === 'tappy-whats' ? 'bg-tappyGreen' : 
                                       product.id === 'tappy-imob' ? 'bg-blue-500' : 'bg-purple-500';
                    
                    return (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
                      >
                        {isActive && (
                          <motion.div
                            className={`absolute inset-0 rounded-full ${productColor}`}
                            layoutId="productTabBackground"
                            transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center justify-center">
                          <img 
                            src="/logo.svg" 
                            alt="Tappy" 
                            className="h-4 w-4 mr-2" 
                          />
                          {product.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center">
                  <div className="inline-flex bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-100 dark:border-gray-800 p-1">
                    <button
                      className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                        viewMode === 'cards'
                          ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={() => setViewMode('cards')}
                    >
                      Planos
                    </button>
                    <button
                      className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                        viewMode === 'comparison'
                          ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={() => setViewMode('comparison')}
                    >
                      Comparar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Planos Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin h-12 w-12 border-4 border-tappyGreen border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <>
                <div className="sm:hidden mb-10 flex justify-center">
                  <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        viewMode === 'cards'
                          ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={() => setViewMode('cards')}
                    >
                      Planos
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        viewMode === 'comparison'
                          ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      onClick={() => setViewMode('comparison')}
                    >
                      Comparar
                    </button>
                  </div>
                </div>
                
                {/* Título da seção com o nome do produto */}
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Planos {activeProduct?.name}
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {activeProduct?.id === 'tappy-whats' && "Automatize seu atendimento no WhatsApp e aumente suas vendas com o Tappy Whats"}
                    {activeProduct?.id === 'tappy-imob' && "Gerencie imóveis, leads e corretores em uma única plataforma com o Tappy Imob"}
                    {activeProduct?.id === 'tappy-link' && "Crie bio pages e links personalizados para promover seu negócio com o Tappy Link"}
                  </p>
                </div>
                
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {activeProduct?.plans.map((plan, index) => (
                      <PlanCard
                        key={plan.id}
                        planId={plan.id}
                        title={plan.title}
                        price={selectedPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                        period={selectedPeriod === 'monthly' ? 'mês' : 'mês (anual)'}
                        description={plan.description}
                        features={plan.features}
                        popular={plan.popularPlan}
                        ctaLink={plan.checkoutLink || '#'}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="max-w-6xl mx-auto">
                    <FeaturesComparison 
                      plans={comparisonPlans}
                      featureCategories={featureCategories}
                      productColor={activeProduct?.color || 'tappyGreen'}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        
        {/* Vantagens Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Por que escolher a Tappy?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Nossa plataforma oferece vantagens exclusivas para impulsionar seu negócio
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-tappyGreen/10 flex items-center justify-center text-tappyGreen mb-5">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Fácil Integração</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Conecte-se com mais de 100 ferramentas e sistemas usando nossos webhooks e APIs prontos para uso.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-tappyGreen/10 flex items-center justify-center text-tappyGreen mb-5">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Segurança Avançada</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Seus dados estão protegidos com criptografia de ponta a ponta e seguimos todos os padrões da LGPD.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-tappyGreen/10 flex items-center justify-center text-tappyGreen mb-5">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Escalabilidade</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cresça com confiança. Nossa plataforma escala com seu negócio, de startups a grandes empresas.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-tappyGreen/10 flex items-center justify-center text-tappyGreen mb-5">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">APIs Robustas</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Personalize sua experiência com nossas APIs bem documentadas e SDKs para todas as linguagens principais.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-tappyGreen/10 flex items-center justify-center text-tappyGreen mb-5">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Suporte Dedicado</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Nossa equipe de suporte está sempre pronta para ajudar, com tempos de resposta rápidos e atendimento personalizado.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-tappyGreen/10 flex items-center justify-center text-tappyGreen mb-5">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">99.9% Uptime</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Garantimos a disponibilidade dos nossos serviços para que seu negócio nunca pare.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Perguntas frequentes
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Tire suas dúvidas sobre nossos planos e serviços
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Como escolher o plano ideal para meu negócio?",
                    answer: "Considere o tamanho da sua empresa, volume de mensagens e recursos necessários. O plano Starter é adequado para pequenos negócios, o Professional para empresas em crescimento, e o Enterprise para grandes operações que necessitam de personalização e escala."
                  },
                  {
                    question: "Posso mudar de plano depois?",
                    answer: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de faturamento, e os valores são ajustados proporcionalmente."
                  },
                  {
                    question: "Existe um período de teste gratuito?",
                    answer: "Sim, oferecemos um período de teste gratuito de 14 dias para todos os nossos planos, sem necessidade de cartão de crédito. Você pode experimentar todos os recursos antes de decidir."
                  },
                  {
                    question: "Quais métodos de pagamento são aceitos?",
                    answer: "Aceitamos cartões de crédito (Visa, Mastercard, American Express), boleto bancário e PIX. Para planos anuais, também oferecemos a possibilidade de pagamento parcelado."
                  },
                  {
                    question: "É possível personalizar os planos?",
                    answer: "Sim, para o plano Enterprise oferecemos personalização completa. Entre em contato com nossa equipe de vendas para discutir suas necessidades específicas e obter uma proposta sob medida."
                  }
                ].map((faq, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <details className="group">
                      <summary className="flex justify-between p-6 cursor-pointer list-none">
                        <h3 className="font-medium text-lg text-gray-900 dark:text-white">{faq.question}</h3>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform ml-2 flex-shrink-0">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </span>
                      </summary>
                      
                      <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Não encontrou a resposta que procurava?
                </p>
                <a 
                  href="/suporte" 
                  className="inline-flex items-center justify-center bg-tappyGreen hover:bg-tappyGreen/90 text-black px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Fale com nosso suporte
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-1/2 h-1/2 bg-tappyGreen/20 blur-3xl rounded-full top-1/4 -left-1/4 opacity-30"></div>
            <div className="absolute w-1/2 h-1/2 bg-tappyGreen/20 blur-3xl rounded-full bottom-1/4 -right-1/4 opacity-30"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Pronto para revolucionar seu negócio?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Comece hoje mesmo com 14 dias de teste grátis. Sem compromisso, sem cartão de crédito.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/cadastro" 
                    className="inline-flex items-center justify-center bg-tappyGreen hover:bg-tappyGreen/90 text-black px-8 py-4 rounded-lg font-medium transition-all text-lg"
                  >
                    Criar conta grátis
                  </a>
                  <a 
                    href="/contato" 
                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium transition-all text-lg"
                  >
                    Falar com consultor
                  </a>
                </div>
                <p className="mt-6 text-sm text-gray-400">
                  Mais de 10.000 empresas confiam na Tappy para suas necessidades de comunicação
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
