import { NextResponse } from 'next/server';
import { getAllPlans } from '@/lib/actions/plan';
import { getAllPlatforms } from '@/lib/actions/platform';

export async function GET() {
  try {
    // Buscar todos os planos e plataformas
    const plansResponse = await getAllPlans();
    const platformsResponse = await getAllPlatforms();
    
    if (!plansResponse.plans || plansResponse.error) {
      return NextResponse.json({ error: plansResponse.error || 'Falha ao buscar planos' }, { status: 500 });
    }
    
    if (!platformsResponse.platforms || platformsResponse.error) {
      return NextResponse.json({ error: platformsResponse.error || 'Falha ao buscar plataformas' }, { status: 500 });
    }
    
    // Organizar os planos por plataforma
    const productPlans = platformsResponse.platforms.map(platform => {
      // Filtrar os planos ativos da plataforma atual
      const platformPlans = plansResponse.plans
        .filter(plan => plan.platformId === platform.id && plan.isActive)
        .map(plan => ({
          id: plan.id,
          title: plan.name,
          price: {
            monthly: plan.price,
            yearly: plan.price * 0.8 // 20% de desconto para pagamento anual
          },
          description: plan.shortDescription || plan.description || '',
          features: plan.features ? plan.features.map(feature => ({
            title: feature,
            included: true
          })) : [],
          popularPlan: plan.isHighlighted || false,
          checkoutLink: plan.checkoutLink // Incluindo o checkoutLink do banco
        }));

      // Caso a plataforma não tenha planos ativos, não incluir na lista
      if (platformPlans.length === 0) {
        return null;
      }
      
      // Determinar a cor com base no slug da plataforma
      let color = 'tappyGreen';
      let gradientFrom = 'from-tappyGreen';
      let gradientTo = 'to-tappyGreen/70';
      let secondaryColor = 'bg-tappyGreen/10 text-tappyGreen';
      
      if (platform.slug === 'imob') {
        color = 'blue-600';
        gradientFrom = 'from-blue-600';
        gradientTo = 'to-blue-500/70';
        secondaryColor = 'bg-blue-600/10 text-blue-600';
      } else if (platform.slug === 'link') {
        color = 'purple-600';
        gradientFrom = 'from-purple-600';
        gradientTo = 'to-purple-500/70';
        secondaryColor = 'bg-purple-600/10 text-purple-600';
      }
      
      return {
        id: `tappy-${platform.slug}` || platform.id,
        name: `Tappy ${platform.name}`,
        icon: `/icons/${platform.slug || 'default'}.svg`,
        color,
        gradientColors: {
          from: gradientFrom,
          to: gradientTo
        },
        secondaryColor,
        plans: platformPlans
      };
    }).filter(Boolean); // Remover plataformas sem planos
    
    return NextResponse.json(productPlans);
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
