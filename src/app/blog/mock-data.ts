import { BlogPost } from '@/components/blog/post-card';

// Dados simulados (em produção, viriam de uma API/banco)
export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'aumentando-vendas-com-tappy-link',
    title: 'Como aumentar suas vendas em 300% utilizando o Tappy Link',
    excerpt: 'Descubra como empresas estão triplicando suas conversões com estratégias avançadas de link bio personalizado e analytics inteligente.',
    content: '<!-- Conteúdo completo do post -->',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Marketing Digital',
    tags: ['vendas', 'conversão', 'link bio', 'analytics'],
    author: {
      name: 'Ana Silva',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    publishedAt: '2025-03-15T10:00:00Z',
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    slug: 'integracao-tappy-whats-crm',
    title: 'Guia definitivo de integração do Tappy Whats com seu CRM',
    excerpt: 'Um passo a passo completo para integrar o Tappy Whats com os principais sistemas de CRM do mercado e automatizar seu atendimento.',
    content: '<!-- Conteúdo completo do post -->',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Integrações',
    tags: ['whatsapp', 'crm', 'automação', 'integrações'],
    author: {
      name: 'Roberto Alves',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    publishedAt: '2025-03-10T08:30:00Z',
    readTime: 12
  },
  {
    id: '3',
    slug: 'casos-sucesso-tappy-imob',
    title: '5 casos de sucesso de imobiliárias que adotaram o Tappy Imob',
    excerpt: 'Conheça histórias reais de imobiliárias que revolucionaram seus processos de vendas e locação após implementarem o Tappy Imob.',
    content: '<!-- Conteúdo completo do post -->',
    coverImage: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=2073&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Casos de Sucesso',
    tags: ['imobiliárias', 'cases', 'vendas', 'gestão'],
    author: {
      name: 'Carla Mendonça',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    publishedAt: '2025-03-05T14:15:00Z',
    readTime: 10
  },
  {
    id: '4',
    slug: 'novas-funcionalidades-tappy-link-2025',
    title: 'Novas funcionalidades do Tappy Link para 2025',
    excerpt: 'Conheça em primeira mão todas as novidades que estamos preparando para o Tappy Link em 2025 e como elas podem impulsionar seus resultados.',
    content: '<!-- Conteúdo completo do post -->',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Novidades',
    tags: ['features', 'atualizações', 'tappy link', 'novidades'],
    author: {
      name: 'Lucas Ferreira',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
    },
    publishedAt: '2025-02-28T09:45:00Z',
    readTime: 6
  },
  {
    id: '5',
    slug: 'monitoramento-metricas-tappy',
    title: 'Como monitorar métricas essenciais nas plataformas Tappy',
    excerpt: 'Um guia prático para configurar e acompanhar as métricas mais importantes para o seu negócio em todas as soluções Tappy.',
    content: '<!-- Conteúdo completo do post -->',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Analytics',
    tags: ['métricas', 'analytics', 'desempenho', 'dashboard'],
    author: {
      name: 'Mariana Costa',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg'
    },
    publishedAt: '2025-02-22T11:20:00Z',
    readTime: 9
  },
  {
    id: '6',
    slug: 'estrategias-whatsapp-marketing',
    title: '7 estratégias comprovadas de WhatsApp Marketing com Tappy Whats',
    excerpt: 'Descubra as táticas de messaging que estão gerando resultados reais para empresas de todos os tamanhos com Tappy Whats.',
    content: '<!-- Conteúdo completo do post -->',
    coverImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Marketing Digital',
    tags: ['whatsapp', 'messaging', 'estratégias', 'comunicação'],
    author: {
      name: 'Paulo Mendes',
      avatar: 'https://randomuser.me/api/portraits/men/47.jpg'
    },
    publishedAt: '2025-02-18T13:10:00Z',
    readTime: 11
  },
  {
    id: '7',
    slug: 'compliance-lgpd-tappy-solutions',
    title: 'Compliance e LGPD: como a Tappy garante a segurança dos seus dados',
    excerpt: 'Entenda as medidas de segurança e conformidade implementadas nas soluções Tappy para proteger os dados dos seus clientes.',
    content: '<!-- Conteúdo completo do post -->',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Segurança',
    tags: ['lgpd', 'compliance', 'segurança', 'privacidade'],
    author: {
      name: 'Juliana Martins',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    publishedAt: '2025-02-10T15:30:00Z',
    readTime: 8
  }
];
