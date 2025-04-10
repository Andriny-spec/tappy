import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Senha para o admin: Tappy2025@
  const password = "Tappy2025@";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@tappy.id' },
    update: {},
    create: {
      name: 'Administrador Tappy',
      email: 'admin@tappy.id',
      password: hashedPassword,
      rules: ['admin', 'super'],
    },
  });

  console.log('Admin criado com sucesso:', admin.email);
  console.log('Senha do admin:', password);

  // Criar plataformas
  const tappyLink = await prisma.platform.upsert({
    where: { slug: 'tappylink' },
    update: {},
    create: {
      name: 'Tappy Link',
      slug: 'tappylink',
      url: 'https://link.tappy.id',
      description: 'Plataforma de identidade digital e cartões digitais',
    },
  });

  const tappyWhats = await prisma.platform.upsert({
    where: { slug: 'tappywhats' },
    update: {},
    create: {
      name: 'Tappy WhatsApp',
      slug: 'tappywhats',
      url: 'https://whats.tappy.id',
      description: 'Plataforma de marketing e atendimento via WhatsApp',
    },
  });

  const tappyImob = await prisma.platform.upsert({
    where: { slug: 'tappyimob' },
    update: {},
    create: {
      name: 'Tappy Imob',
      slug: 'tappyimob',
      url: 'https://imob.tappy.id',
      description: 'Plataforma para corretores e imobiliárias',
    },
  });

  console.log('Plataformas criadas com sucesso!');
  
  // Criar planos para as plataformas
  const planoTappyLinkBasico = await prisma.plan.upsert({
    where: { id: 'tappylink-basico' },
    update: {},
    create: {
      id: 'tappylink-basico',
      name: 'Tappy Link Básico',
      platformId: tappyLink.id,
      description: 'Plano básico para Tappy Link',
      features: ['Cartão digital', 'Site personalizado', 'QR Code ilimitado'],
      price: 49.90,
      interval: 'month',
      isActive: true,
      displayOrder: 1,
      benefits: ['Suporte via chat', 'Atualização gratuita'],
      maxUsers: 1,
      hasReports: true,
    },
  });

  const planoTappyLinkPremium = await prisma.plan.upsert({
    where: { id: 'tappylink-premium' },
    update: {},
    create: {
      id: 'tappylink-premium',
      name: 'Tappy Link Premium',
      platformId: tappyLink.id,
      description: 'Plano premium para Tappy Link',
      features: ['Cartão digital', 'Site personalizado', 'QR Code ilimitado', 'Domínio próprio', 'Analytics avançado'],
      price: 97.00,
      interval: 'month',
      isActive: true,
      isHighlighted: true,
      displayOrder: 2,
      benefits: ['Suporte prioritário', 'Atualização gratuita', 'Design personalizado'],
      maxUsers: 3,
      hasReports: true,
      hasAI: true,
    },
  });

  const planoTappyWhatsPro = await prisma.plan.upsert({
    where: { id: 'tappywhats-pro' },
    update: {},
    create: {
      id: 'tappywhats-pro',
      name: 'Tappy WhatsApp Pro',
      platformId: tappyWhats.id,
      description: 'Plano profissional para Tappy WhatsApp',
      features: ['Automação de mensagens', 'Chatbot', 'Campanhas', 'Multiusuários'],
      price: 59.90,
      interval: 'month',
      isActive: true,
      displayOrder: 1,
      benefits: ['Conexão com API oficial', 'Suporte prioritário'],
      maxUsers: 2,
      hasMultiChannel: true,
    },
  });

  const planoTappyImobCompleto = await prisma.plan.upsert({
    where: { id: 'tappyimob-completo' },
    update: {},
    create: {
      id: 'tappyimob-completo',
      name: 'Tappy Imob Completo',
      platformId: tappyImob.id,
      description: 'Plano completo para Tappy Imob',
      features: ['CRM Imobiliário', 'Site de imóveis', 'Gerenciamento de leads', 'Marketing digital'],
      price: 127.00,
      interval: 'month',
      isActive: true,
      isHighlighted: true,
      displayOrder: 1,
      benefits: ['Integração com portais', 'Aplicativo exclusivo', 'Suporte VIP'],
      hasLeadManagement: true,
      hasRentalManagement: true,
      hasReports: true,
      hasSalesTools: true,
    },
  });

  console.log('Planos criados com sucesso!');

  // Criar usuários e assinantes
  const usuarios = [
    {
      name: 'Carlos Silva',
      email: 'carlos.silva@gmail.com',
      phone: '11987654321',
      planId: planoTappyLinkPremium.id,
      platformId: tappyLink.id,
      status: 'active',
      startDate: new Date('2025-01-15'),
    },
    {
      name: 'Ana Rodrigues',
      email: 'ana.rodrigues@hotmail.com',
      phone: '21976543210',
      planId: planoTappyWhatsPro.id,
      platformId: tappyWhats.id,
      status: 'active',
      startDate: new Date('2025-02-03'),
    },
    {
      name: 'Marcelo Alves',
      email: 'marcelo.alves@gmail.com',
      phone: '31965432109',
      planId: planoTappyImobCompleto.id,
      platformId: tappyImob.id,
      status: 'active',
      startDate: new Date('2025-02-22'),
    },
    {
      name: 'Juliana Mendes',
      email: 'juliana.mendes@outlook.com',
      phone: '11954321098',
      planId: planoTappyLinkPremium.id,
      platformId: tappyLink.id,
      status: 'canceled',
      startDate: new Date('2025-03-10'),
      cancelDate: new Date('2025-04-05'),
      cancelReason: 'Mudança para outro serviço',
    },
    {
      name: 'Roberto Santos',
      email: 'roberto.santos@gmail.com',
      phone: '47943210987',
      planId: planoTappyWhatsPro.id,
      platformId: tappyWhats.id,
      status: 'overdue',
      startDate: new Date('2025-03-17'),
    },
    // Adicionar 10 usuários adicionais
    {
      name: 'Paulo Oliveira',
      email: 'paulo.oliveira@gmail.com',
      phone: '11932165478',
      planId: planoTappyLinkBasico.id, 
      platformId: tappyLink.id,
      status: 'active',
      startDate: new Date('2025-01-20'),
    },
    {
      name: 'Fernanda Lima',
      email: 'fernanda.lima@outlook.com',
      phone: '21987451236',
      planId: planoTappyLinkBasico.id,
      platformId: tappyLink.id,
      status: 'active',
      startDate: new Date('2025-02-10'),
    },
    {
      name: 'Ricardo Nunes',
      email: 'ricardo.nunes@gmail.com',
      phone: '47963258741',
      planId: planoTappyWhatsPro.id,
      platformId: tappyWhats.id,
      status: 'active',
      startDate: new Date('2025-02-15'),
    },
    {
      name: 'Mariana Costa',
      email: 'mariana.costa@hotmail.com',
      phone: '31974125896',
      planId: planoTappyLinkBasico.id,
      platformId: tappyLink.id,
      status: 'overdue',
      startDate: new Date('2025-01-25'),
    },
    {
      name: 'Eduardo Pereira',
      email: 'eduardo.pereira@gmail.com',
      phone: '11985214763',
      planId: planoTappyImobCompleto.id,
      platformId: tappyImob.id,
      status: 'active',
      startDate: new Date('2025-03-05'),
    },
    {
      name: 'Patrícia Gomes',
      email: 'patricia.gomes@outlook.com',
      phone: '21963258741',
      planId: planoTappyLinkPremium.id,
      platformId: tappyLink.id,
      status: 'canceled',
      startDate: new Date('2025-02-20'),
      cancelDate: new Date('2025-03-25'),
      cancelReason: 'Motivos financeiros',
    },
    {
      name: 'Luiz Fernando',
      email: 'luiz.fernando@gmail.com',
      phone: '31987456321',
      planId: planoTappyWhatsPro.id,
      platformId: tappyWhats.id,
      status: 'active',
      startDate: new Date('2025-03-12'),
    },
    {
      name: 'Camila Ribeiro',
      email: 'camila.ribeiro@hotmail.com',
      phone: '47912365478',
      planId: planoTappyLinkBasico.id,
      platformId: tappyLink.id,
      status: 'active',
      startDate: new Date('2025-03-20'),
    },
    {
      name: 'Rafael Souza',
      email: 'rafael.souza@gmail.com',
      phone: '11974123658',
      planId: planoTappyImobCompleto.id,
      platformId: tappyImob.id,
      status: 'active',
      startDate: new Date('2025-01-30'),
    },
    {
      name: 'Carla Martins',
      email: 'carla.martins@outlook.com',
      phone: '21985214796',
      planId: planoTappyLinkPremium.id,
      platformId: tappyLink.id,
      status: 'active',
      startDate: new Date('2025-02-28'),
    }
  ];

  for (const usuario of usuarios) {
    // Criar usuário
    const user = await prisma.user.upsert({
      where: { email: usuario.email },
      update: {
        name: usuario.name,
        phone: usuario.phone,
      },
      create: {
        name: usuario.name,
        email: usuario.email,
        phone: usuario.phone,
      },
    });

    // Criar assinante
    const subscriber = await prisma.subscriber.upsert({
      where: { id: `${user.id}-${usuario.platformId}` },
      update: {
        status: usuario.status,
        cancelDate: usuario.cancelDate,
        cancelReason: usuario.cancelReason,
      },
      create: {
        id: `${user.id}-${usuario.platformId}`,
        userId: user.id,
        planId: usuario.planId,
        platformId: usuario.platformId,
        status: usuario.status,
        startDate: usuario.startDate,
        cancelDate: usuario.cancelDate,
        cancelReason: usuario.cancelReason,
      },
    });

    // Criar um pagamento para cada assinante ativo ou com atraso
    if (usuario.status === 'active' || usuario.status === 'overdue') {
      await prisma.payment.upsert({
        where: { id: `payment-${subscriber.id}` },
        update: {
          status: usuario.status === 'active' ? 'paid' : 'overdue',
          paymentDate: usuario.status === 'active' ? usuario.startDate : null,
        },
        create: {
          id: `payment-${subscriber.id}`,
          userId: user.id,
          subscriberId: subscriber.id,
          planId: usuario.planId,
          amount: usuario.planId === planoTappyLinkBasico.id ? 49.90 :
                usuario.planId === planoTappyLinkPremium.id ? 97.00 :
                usuario.planId === planoTappyWhatsPro.id ? 59.90 :
                usuario.planId === planoTappyImobCompleto.id ? 127.00 : 0,
          status: usuario.status === 'active' ? 'paid' : 'overdue',
          paymentMethod: ['pix', 'credit_card', 'debit_card'][Math.floor(Math.random() * 3)],
          paymentDate: usuario.status === 'active' ? usuario.startDate : null,
        },
      });
    }
  }

  console.log('Usuários, assinantes e pagamentos criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
