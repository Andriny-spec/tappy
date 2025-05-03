// Tipos de dados para os planos
export interface PlanFeature {
  title: string;
  included: boolean;
}

export interface Plan {
  id: string;
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: PlanFeature[];
  popularPlan: boolean;
  checkoutLink?: string;
}

export interface ProductPlans {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradientColors: {
    from: string;
    to: string;
  };
  secondaryColor: string;
  plans: Plan[];
}

// Função para buscar os planos da API
export async function fetchPlans(): Promise<ProductPlans[]> {
  try {
    // Usar a API local que acabamos de criar
    const response = await fetch('/api/planos/publicos', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    
    // Fallback para garantir que algo será renderizado mesmo que a API falhe
    return [
      {
        id: 'tappy-whats',
        name: 'Tappy Whats',
        icon: '/icons/whatsapp.svg',
        color: 'tappyGreen',
        gradientColors: {
          from: 'from-tappyGreen',
          to: 'to-tappyGreen/70'
        },
        secondaryColor: 'bg-tappyGreen/10 text-tappyGreen',
        plans: [
          {
            id: 'starter',
            title: 'Starter',
            price: {
              monthly: 97,
              yearly: 77.60
            },
            description: 'Ideal para pequenos negócios e profissionais autônomos',
            features: [
              { title: '1 número de WhatsApp', included: true },
              { title: 'Mensagens ilimitadas', included: true },
              { title: 'Chatbot básico', included: true },
              { title: 'Até 5 atendentes', included: true },
              { title: 'Relatórios básicos', included: true },
              { title: 'Atendimento 8x5', included: true },
              { title: 'Integrações avançadas', included: false },
              { title: 'API personalizada', included: false }
            ],
            popularPlan: false
          },
          {
            id: 'professional',
            title: 'Professional',
            price: {
              monthly: 197,
              yearly: 157.60
            },
            description: 'Perfeito para empresas em crescimento e equipes',
            features: [
              { title: '3 números de WhatsApp', included: true },
              { title: 'Mensagens ilimitadas', included: true },
              { title: 'Chatbot avançado', included: true },
              { title: 'Até 15 atendentes', included: true },
              { title: 'Relatórios avançados', included: true },
              { title: 'Atendimento 12x6', included: true },
              { title: 'Integrações avançadas', included: true },
              { title: 'API personalizada', included: false }
            ],
            popularPlan: true
          },
          {
            id: 'enterprise',
            title: 'Enterprise',
            price: {
              monthly: 397,
              yearly: 317.60
            },
            description: 'Solução completa para grandes empresas',
            features: [
              { title: '10 números de WhatsApp', included: true },
              { title: 'Mensagens ilimitadas', included: true },
              { title: 'Chatbot com IA', included: true },
              { title: 'Atendentes ilimitados', included: true },
              { title: 'Relatórios personalizados', included: true },
              { title: 'Atendimento 24x7', included: true },
              { title: 'Integrações avançadas', included: true },
              { title: 'API personalizada', included: true }
            ],
            popularPlan: false
          }
        ]
      },
      {
        id: 'tappy-imob',
        name: 'Tappy Imob',
        icon: '/icons/building.svg',
        color: 'blue-600',
        gradientColors: {
          from: 'from-blue-600',
          to: 'to-blue-500/70'
        },
        secondaryColor: 'bg-blue-600/10 text-blue-600',
        plans: [
          {
            id: 'starter',
            title: 'Básico',
            price: {
              monthly: 147,
              yearly: 117.60
            },
            description: 'CRM básico para corretores independentes',
            features: [
              { title: 'Até 50 imóveis', included: true },
              { title: '1 usuário', included: true },
              { title: 'Cadastro de leads', included: true },
              { title: 'Gestão de imóveis', included: true },
              { title: 'Integração com portais', included: true },
              { title: 'Suporte por email', included: true },
              { title: 'Integração com WhatsApp', included: false },
              { title: 'Automação de marketing', included: false }
            ],
            popularPlan: false
          },
          {
            id: 'professional',
            title: 'Profissional',
            price: {
              monthly: 297,
              yearly: 237.60
            },
            description: 'Para imobiliárias em crescimento',
            features: [
              { title: 'Até 200 imóveis', included: true },
              { title: 'Até 5 usuários', included: true },
              { title: 'Cadastro e segmentação de leads', included: true },
              { title: 'Gestão avançada de imóveis', included: true },
              { title: 'Integração com portais', included: true },
              { title: 'Suporte prioritário', included: true },
              { title: 'Integração com WhatsApp', included: true },
              { title: 'Automação de marketing', included: false }
            ],
            popularPlan: true
          },
          {
            id: 'enterprise',
            title: 'Empresarial',
            price: {
              monthly: 497,
              yearly: 397.60
            },
            description: 'Para grandes imobiliárias e redes',
            features: [
              { title: 'Imóveis ilimitados', included: true },
              { title: 'Usuários ilimitados', included: true },
              { title: 'Cadastro, segmentação e automação', included: true },
              { title: 'Gestão avançada de imóveis', included: true },
              { title: 'Integração com portais premium', included: true },
              { title: 'Suporte 24/7', included: true },
              { title: 'Integração com WhatsApp', included: true },
              { title: 'Automação de marketing', included: true }
            ],
            popularPlan: false
          }
        ]
      },
      {
        id: 'tappy-link',
        name: 'Tappy Link',
        icon: '/icons/link.svg',
        color: 'purple-600',
        gradientColors: {
          from: 'from-purple-600',
          to: 'to-purple-500/70'
        },
        secondaryColor: 'bg-purple-600/10 text-purple-600',
        plans: [
          {
            id: 'free',
            title: 'Free',
            price: {
              monthly: 0,
              yearly: 0
            },
            description: 'Ideal para uso pessoal e teste',
            features: [
              { title: 'Até 5 links', included: true },
              { title: 'Estatísticas básicas', included: true },
              { title: 'Página de bio simples', included: true },
              { title: 'Domínio personalizado', included: false },
              { title: 'Remoção de marca Tappy', included: false },
              { title: 'Integração com Google Analytics', included: false },
              { title: 'Integração com Pixels', included: false },
              { title: 'Suporte prioritário', included: false }
            ],
            popularPlan: false
          },
          {
            id: 'pro',
            title: 'Pro',
            price: {
              monthly: 29,
              yearly: 23.20
            },
            description: 'Para criadores de conteúdo e pequenas empresas',
            features: [
              { title: 'Links ilimitados', included: true },
              { title: 'Estatísticas avançadas', included: true },
              { title: 'Página de bio personalizada', included: true },
              { title: 'Domínio personalizado', included: true },
              { title: 'Remoção de marca Tappy', included: true },
              { title: 'Integração com Google Analytics', included: true },
              { title: 'Integração com Pixels', included: false },
              { title: 'Suporte prioritário', included: false }
            ],
            popularPlan: true
          },
          {
            id: 'business',
            title: 'Business',
            price: {
              monthly: 79,
              yearly: 63.20
            },
            description: 'Para empresas que precisam de recursos avançados',
            features: [
              { title: 'Links ilimitados', included: true },
              { title: 'Estatísticas avançadas e exportação', included: true },
              { title: 'Página de bio premium', included: true },
              { title: 'Múltiplos domínios personalizados', included: true },
              { title: 'Remoção de marca Tappy', included: true },
              { title: 'Integração com Google Analytics', included: true },
              { title: 'Integração com Pixels', included: true },
              { title: 'Suporte prioritário', included: true }
            ],
            popularPlan: false
          }
        ]
      }
    ];
  }
}
