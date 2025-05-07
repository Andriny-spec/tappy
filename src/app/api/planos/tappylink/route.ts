import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API pública para retornar planos do TappyLink 
 * Endpoint: /api/planos/tappylink
 */
export async function GET() {
  try {
    // Buscar a plataforma TappyLink
    const tappyLink = await prisma.platform.findFirst({
      where: {
        OR: [
          { slug: 'tappylink' },
          { name: { contains: 'Tappy Link', mode: 'insensitive' } }
        ]
      }
    });

    if (!tappyLink) {
      return NextResponse.json({ error: 'Plataforma TappyLink não encontrada' }, { status: 404 });
    }

    // Buscar os planos da plataforma TappyLink
    const plans = await prisma.plan.findMany({
      where: {
        platformId: tappyLink.id,
        isActive: true
      },
      orderBy: {
        price: 'asc'
      }
    });

    // Formatar a resposta
    const formattedPlans = plans.map(plan => ({
      id: plan.id,
      title: plan.name,
      price: {
        monthly: Number(plan.price),
        yearly: Number(plan.price) * 10 // Anual = 10x o valor mensal (2 meses grátis)
      },
      description: plan.shortDescription || plan.description || '',
      features: plan.features ? plan.features.map(feature => ({
        title: feature,
        included: true
      })) : [],
      popularPlan: plan.isHighlighted || plan.name.toLowerCase().includes('profissional'),
      checkoutLink: plan.checkoutLink || `https://link.tappy.id/checkout/${plan.id}`
    }));

    // Retornar os planos como um produto
    return NextResponse.json([{
      id: tappyLink.id,
      name: tappyLink.name,
      slug: tappyLink.slug,
      icon: '/icons/tappylink.svg',
      color: 'blue',
      gradientColors: {
        from: 'from-blue-500',
        to: 'to-blue-700'
      },
      secondaryColor: 'bg-blue-100 text-blue-700',
      plans: formattedPlans
    }]);

  } catch (error) {
    console.error('Erro ao buscar planos do TappyLink:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar planos' },
      { status: 500 }
    );
  }
}
