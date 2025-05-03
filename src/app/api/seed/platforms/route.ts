import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// @ts-ignore - Ignorar problemas de tipagem com o Prisma, já que usamos regenerate

// Este endpoint é apenas para desenvolvimento, para popular o banco com dados iniciais
export async function POST(req: NextRequest) {
  try {
    // Verificar se já existem plataformas
    // @ts-ignore
    const existingPlatforms = await prisma.platform.count();
    
    if (existingPlatforms > 0) {
      return NextResponse.json(
        { message: 'Plataformas já existem no banco de dados' },
        { status: 200 }
      );
    }

    // Criar plataformas
    const platforms = await Promise.all([
      // @ts-ignore
      prisma.platform.create({
        data: {
          name: 'Tappy ID',
          slug: 'id',
          url: 'https://link.tappy.id',
          description: 'Plataforma de cartões virtuais',
        },
      }),
      // @ts-ignore
      prisma.platform.create({
        data: {
          name: 'Tappy WhatsApp',
          slug: 'whats',
          url: 'https://whats.tappy.id',
          description: 'Plataforma de gestão de WhatsApp',
        },
      }),
      // @ts-ignore
      prisma.platform.create({
        data: {
          name: 'Tappy Imob',
          slug: 'imob',
          url: 'https://imob.tappy.id',
          description: 'CRM para imobiliárias',
        },
      }),
    ]);

    // Criar planos para Tappy ID
    await Promise.all([
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Start',
          platformId: platforms[0].id,
          description: 'Para profissionais autônomos que precisam de um cartão digital profissional',
          shortDescription: 'Ideal para profissionais autônomos',
          features: ['1 cartão virtual', 'Personalização básica', 'Analytics básicos'],
          benefits: ['Fácil de usar', 'Cartão digital profissional', 'Compartilhamento com QR Code'],
          price: 29.90,
          additionalUserPrice: 19.0,
          interval: 'mensal',
          maxUsers: 1,
          maxItems: 1,
          hasReports: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          color: '#25D366',
          displayOrder: 1,
        },
      }),
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Essential',
          platformId: platforms[0].id,
          description: 'Para pequenos negócios que precisam de múltiplos cartões e ferramentas de gestão',
          shortDescription: 'Ideal para pequenos negócios',
          features: ['5 cartões virtuais', 'Personalização avançada', 'Analytics completos', 'Suporte prioritário'],
          benefits: ['Suporte prioritário', 'Analytics detalhado', 'Personalização de marca'],
          price: 49.90,
          additionalUserPrice: 19.0,
          interval: 'mensal',
          maxUsers: 5,
          maxItems: 5,
          hasReports: true,
          hasClientPortal: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          hasTeamManagement: true,
          isHighlighted: true,
          color: '#4E5BA6',
          displayOrder: 2,
        },
      }),
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Business',
          platformId: platforms[0].id,
          description: 'Para empresas que necessitam de funcionalidades mais avançadas e integrações',
          shortDescription: 'Solução completa para empresas',
          features: ['Cartões ilimitados', 'Personalização total', 'Analytics avançados', 'API acesso', 'Suporte VIP'],
          benefits: ['Integração com outras ferramentas', 'API para desenvolvedores', 'Domínio personalizado'],
          price: 99.90,
          additionalUserPrice: 19.0,
          interval: 'mensal',
          maxUsers: 10,
          maxItems: 20,
          hasReports: true,
          hasClientPortal: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          hasTeamManagement: true,
          hasAI: true,
          hasMultiChannel: true,
          color: '#FF6B6B',
          displayOrder: 3,
        },
      }),
    ]);

    // Criar planos para Tappy WhatsApp
    await Promise.all([
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Start',
          platformId: platforms[1].id,
          description: 'Para profissionais que precisam automatizar o atendimento no WhatsApp',
          shortDescription: 'Ideal para profissionais autônomos',
          features: ['1 número', 'Até 500 mensagens/mês', 'Chatbot básico'],
          benefits: ['Atendimento automatizado', 'Respostas rápidas', 'Mensagens programadas'],
          price: 39.90,
          interval: 'mensal',
          maxUsers: 1,
          maxItems: null,
          maxTokens: 500,
          hasReports: true,
          hasLeadManagement: true,
          color: '#25D366',
          displayOrder: 1,
        },
      }),
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Business',
          platformId: platforms[1].id,
          description: 'Para empresas que precisam de uma solução completa de atendimento via WhatsApp',
          shortDescription: 'Solução completa para empresas',
          features: ['3 números', 'Mensagens ilimitadas', 'Chatbot avançado', 'Integração com CRM', 'Suporte prioritário'],
          benefits: ['Multiple atendentes', 'IA para atendimento', 'Integração com sistema de vendas'],
          price: 149.90,
          additionalUserPrice: 39.0,
          interval: 'mensal',
          maxUsers: 5,
          maxItems: null,
          maxTokens: 2000,
          hasReports: true,
          hasClientPortal: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          hasTeamManagement: true,
          hasAI: true,
          hasMultiChannel: true,
          isHighlighted: true,
          isFeatured: true,
          color: '#4E5BA6',
          displayOrder: 2,
        },
      }),
    ]);

    // Criar planos para Tappy Imob
    await Promise.all([
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Start',
          platformId: platforms[2].id,
          description: 'Para corretores de imóveis autônomos',
          shortDescription: 'Ideal para corretores autônomos',
          features: ['50 imóveis', 'Site', 'Integração com portais', 'Sistema de gestão imobiliária'],
          benefits: ['Gestão de imóveis', 'Integração com portais', 'Relatórios de desempenho'],
          price: 99.90,
          additionalUserPrice: 19.0,
          interval: 'mensal',
          maxUsers: 1,
          maxItems: 50,
          hasReports: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          color: '#25D366',
          displayOrder: 1,
        },
      }),
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Essential',
          platformId: platforms[2].id,
          description: 'Para pequenas imobiliárias',
          shortDescription: 'Ideal para pequenas imobiliárias',
          features: ['500 imóveis', 'Site', 'Integração com portais', 'Sistema de gestão imobiliária', 'Gestão de equipes'],
          benefits: ['Gestão de equipe', 'Integração com IA', 'Portal do cliente'],
          price: 199.90,
          additionalUserPrice: 39.0,
          interval: 'mensal',
          maxUsers: 5,
          maxItems: 500,
          maxTokens: 500,
          hasReports: true,
          hasClientPortal: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          hasTeamManagement: true,
          hasAI: true,
          hasRentalManagement: true,
          isHighlighted: true,
          color: '#4E5BA6',
          displayOrder: 2,
        },
      }),
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Advanced',
          platformId: platforms[2].id,
          description: 'Para imobiliárias de médio porte',
          shortDescription: 'Para imobiliárias em crescimento',
          features: ['5000 imóveis', 'Site', 'Integração com portais', 'Sistema de gestão imobiliária', 'Gestão de equipes'],
          benefits: ['Grande volume de imóveis', 'Integração com IA avançada', 'Portal do cliente personalizável'],
          price: 399.90,
          additionalUserPrice: 39.0,
          interval: 'mensal',
          maxUsers: 10,
          maxItems: 5000,
          maxTokens: 2000,
          hasReports: true,
          hasClientPortal: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          hasTeamManagement: true,
          hasAI: true,
          hasRentalManagement: true,
          hasMultiChannel: true,
          color: '#FF6B6B',
          displayOrder: 3,
        },
      }),
      // @ts-ignore
      prisma.plan.create({
        data: {
          name: 'Enterprise',
          platformId: platforms[2].id,
          description: 'Para grandes imobiliárias e redes',
          shortDescription: 'Solução completa para grandes imobiliárias',
          features: ['Imóveis ilimitados', 'Site', 'Integração com portais', 'Sistema de gestão imobiliária', 'Gestão de equipes'],
          benefits: ['Recursos ilimitados', 'Integração personalizada', 'Acesso API completo'],
          price: 799.90,
          additionalUserPrice: 39.0,
          interval: 'mensal',
          maxUsers: 20,
          isUnlimited: true,
          maxTokens: 20000,
          hasReports: true,
          hasClientPortal: true,
          hasLeadManagement: true,
          hasSalesTools: true,
          hasTeamManagement: true,
          hasAI: true,
          hasRentalManagement: true,
          hasMultiChannel: true,
          isFeatured: true,
          color: '#8A4FFF',
          displayOrder: 4,
        },
      }),
    ]);

    // Configuração inicial de pagamento
    // @ts-ignore
    await prisma.paymentConfig.create({
      data: {
        kirvanoApiKey: 'sua_api_key_aqui',
        kirvanoMerchantId: 'seu_merchant_id_aqui',
        webhookSecret: 'seu_webhook_secret_aqui',
      },
    });

    // Configuração do site
    // @ts-ignore
    await prisma.siteConfig.create({
      data: {
        siteName: 'Tappy',
        siteUrl: 'https://tappy.id',
        primaryColor: '#25D366',
        secondaryColor: '#128C7E',
      },
    });

    return NextResponse.json(
      { 
        message: 'Dados iniciais criados com sucesso',
        platformsCreated: platforms.length,
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar dados iniciais:', error);
    return NextResponse.json(
      { error: 'Erro ao criar dados iniciais' },
      { status: 500 }
    );
  }
}
