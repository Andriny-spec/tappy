import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug da plataforma não fornecido' },
        { status: 400 }
      );
    }

    // Verificar se a plataforma existe
    const plataforma = await prisma.platform.findUnique({
      where: {
        slug: slug
      }
    });

    if (!plataforma) {
      return NextResponse.json(
        { error: 'Plataforma não encontrada' },
        { status: 404 }
      );
    }

    // Buscar planos ativos para a plataforma específica
    const planos = await prisma.plan.findMany({
      where: {
        platformId: plataforma.id,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        shortDescription: true,
        features: true,
        benefits: true,
        price: true,
        interval: true,
        checkoutLink: true,
        isHighlighted: true,
        isFeatured: true,
        maxUsers: true,
        maxItems: true,
        maxStorage: true,
        maxTokens: true,
        hasAI: true,
        hasClientPortal: true,
        hasLeadManagement: true,
        hasMultiChannel: true,
        hasRentalManagement: true,
        hasReports: true,
        hasSalesTools: true,
        hasTeamManagement: true,
        color: true,
        additionalUserPrice: true,
        setupFee: true,
        discount: true,
        displayOrder: true,
        isUnlimited: true
      },
      orderBy: [
        { displayOrder: 'asc' },
        { price: 'asc' }
      ]
    });

    return NextResponse.json({
      plataforma: {
        id: plataforma.id,
        nome: plataforma.name,
        slug: plataforma.slug,
        url: plataforma.url
      },
      planos
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Permitir CORS para que os sites possam acessar
        'Cache-Control': 'max-age=300, s-maxage=300' // Cache por 5 minutos
      }
    });
  } catch (error) {
    console.error('Erro ao buscar planos da plataforma:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar planos da plataforma' },
      { status: 500 }
    );
  }
}
