import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API pública para retornar planos do TappyWhats
 * Endpoint: /api/planos/tappywhats
 */
export async function GET() {
  try {
    // Buscar a plataforma TappyWhats
    const tappyWhats = await prisma.platform.findFirst({
      where: {
        OR: [
          { slug: 'tappywhats' },
          { id: 'tappy-whats' },
          { name: { contains: 'Tappy WhatsApp', mode: 'insensitive' } }
        ]
      }
    });

    if (!tappyWhats) {
      return NextResponse.json({ error: 'Plataforma TappyWhats não encontrada' }, { status: 404 });
    }

    // Buscar os planos da plataforma TappyWhats
    const plans = await prisma.plan.findMany({
      where: {
        platformId: tappyWhats.id,
        isActive: true
      },
      orderBy: {
        price: 'asc'
      }
    });

    // Formatar a resposta
    const formattedPlans = plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      platformId: tappyWhats.id,
      description: plan.shortDescription || plan.description || '',
      price: Number(plan.price),
      interval: 'monthly',
      features: plan.features || [],
      platform: {
        name: tappyWhats.name,
        slug: tappyWhats.slug
      }
    }));

    return NextResponse.json(formattedPlans, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar planos do TappyWhats:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar planos do TappyWhats' },
      { status: 500 }
    );
  }
}
