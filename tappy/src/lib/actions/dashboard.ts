import { prisma } from '@/lib/prisma';

export async function getDashboardMetrics() {
  try {
    // Buscar plataformas
    const platforms = await prisma.platform.findMany();

    // Buscar métricas consolidadas por plataforma
    const metrics = await Promise.all(
      platforms.map(async (platform) => {
        // Calcular total de assinantes ativos
        const activeSubscribersCount = await prisma.subscriber.count({
          where: {
            platformId: platform.id,
            status: 'Ativo',
          },
        });

        // Calcular revenue total
        const totalRevenue = await prisma.payment.aggregate({
          where: {
            plan: {
              platformId: platform.id,
            },
            status: 'Aprovado',
          },
          _sum: {
            amount: true,
          },
        });

        // Calcular reembolsos
        const totalRefunds = await prisma.payment.aggregate({
          where: {
            plan: {
              platformId: platform.id,
            },
            status: 'Reembolsado',
          },
          _sum: {
            amount: true,
          },
        });

        // Calcular visualizações e cliques
        const views = await prisma.eventTrack.count({
          where: {
            platformId: platform.id,
            eventType: 'view',
          },
        });

        const clicks = await prisma.eventTrack.count({
          where: {
            platformId: platform.id,
            eventType: 'click',
          },
        });

        // Calcular taxa de conversão
        const conversionRate = views > 0 ? (activeSubscribersCount / views) * 100 : 0;

        // Dispositivos (simplificado para demonstração)
        const webViews = await prisma.eventTrack.count({
          where: {
            platformId: platform.id,
            eventType: 'view',
            metadata: {
              path: ['device'],
              equals: 'web',
            },
          },
        });

        const mobileViews = await prisma.eventTrack.count({
          where: {
            platformId: platform.id,
            eventType: 'view',
            metadata: {
              path: ['device'],
              equals: 'mobile',
            },
          },
        });

        // Métricas do mês anterior (simuladas - em produção usaríamos o prisma para filtrar por data)
        const lastMonthGrowth = Math.random() * 20 - 5; // Valor entre -5% e +15%

        return {
          id: platform.id,
          name: platform.name,
          slug: platform.slug,
          description: platform.description || '',
          subscribers: activeSubscribersCount,
          revenue: totalRevenue._sum.amount || 0,
          refunds: totalRefunds._sum.amount || 0,
          views,
          clicks,
          conversionRate: conversionRate.toFixed(1),
          webViews,
          mobileViews,
          growth: lastMonthGrowth.toFixed(1),
          isPositiveGrowth: lastMonthGrowth > 0,
        };
      })
    );

    // Calcular totais para os cards principais
    const totalViews = metrics.reduce((acc, curr) => acc + curr.views, 0);
    const totalClicks = metrics.reduce((acc, curr) => acc + curr.clicks, 0);
    const totalSubscribers = metrics.reduce((acc, curr) => acc + curr.subscribers, 0);
    const totalRevenue = metrics.reduce((acc, curr) => acc + curr.revenue, 0);

    // Calcular crescimento geral (simplificado para demonstração)
    const viewsGrowth = 14.2;
    const clicksGrowth = 21.5;
    const subscribersGrowth = 7.3;
    const revenueGrowth = -2.5;

    return {
      platforms: metrics,
      totals: {
        views: totalViews,
        clicks: totalClicks,
        subscribers: totalSubscribers,
        revenue: totalRevenue,
        viewsGrowth,
        clicksGrowth,
        subscribersGrowth,
        revenueGrowth,
      }
    };
  } catch (error) {
    console.error('Erro ao buscar métricas do dashboard:', error);
    return {
      platforms: [],
      totals: {
        views: 0,
        clicks: 0,
        subscribers: 0,
        revenue: 0,
        viewsGrowth: 0,
        clicksGrowth: 0,
        subscribersGrowth: 0,
        revenueGrowth: 0,
      }
    };
  }
}

export async function getActivePlatforms() {
  return prisma.platform.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function getActivePlansForPlatform(platformId: string) {
  return prisma.plan.findMany({
    where: {
      platformId,
      isActive: true
    },
    orderBy: {
      displayOrder: 'asc'
    }
  });
}

export async function getAllActivePlans() {
  return prisma.plan.findMany({
    where: {
      isActive: true
    },
    include: {
      platform: true
    },
    orderBy: {
      displayOrder: 'asc'
    }
  });
}
