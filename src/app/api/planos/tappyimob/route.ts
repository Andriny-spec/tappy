import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API pública para retornar planos do TappyImob
 * Endpoint: /api/planos/tappyimob
 */
export async function GET() {
  try {
    // Buscar a plataforma TappyImob
    const tappyImob = await prisma.platform.findFirst({
      where: {
        OR: [
          { slug: 'tappyimob' },
          { id: 'tappy-imob' },
          { name: { contains: 'Tappy Imob', mode: 'insensitive' } }
        ]
      }
    });

    if (!tappyImob) {
      return NextResponse.json({ error: 'Plataforma TappyImob não encontrada' }, { status: 404 });
    }

    // Buscar os planos da plataforma TappyImob
    const plans = await prisma.plan.findMany({
      where: {
        platformId: tappyImob.id,
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
      platformId: tappyImob.id,
      description: plan.shortDescription || plan.description || '',
      price: Number(plan.price),
      interval: 'monthly',
      features: plan.features || [],
      platform: {
        name: tappyImob.name,
        slug: tappyImob.slug
      }
    }));

    return NextResponse.json(formattedPlans, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar planos do TappyImob:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar planos do TappyImob' },
      { status: 500 }
    );
  }
}
