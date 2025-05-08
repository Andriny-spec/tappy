import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar todos os planos ativos
    const planos = await prisma.plan.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        platformId: true,
        description: true,
        price: true,
        interval: true,
        features: true,
        checkoutLink: true,
        platform: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: [
        { platformId: 'asc' },
        { displayOrder: 'asc' }
      ]
    });

    // Adicionar checkoutLink padrão para planos que não possuem
    const planosComCheckout = planos.map(plano => {
      if (!plano.checkoutLink) {
        const platform = plano.platform?.slug || '';
        
        // Gerar checkoutLink com base na plataforma
        if (platform === 'tappylink') {
          plano.checkoutLink = `https://link.tappy.id/checkout/${plano.id}`;
        } else if (platform === 'tappyimob') {
          plano.checkoutLink = `https://tappy.id/checkout?planId=${plano.id}&type=IMOBILIARIA&origin=tappyimob-site`;
        } else if (platform === 'tappywhats') {
          plano.checkoutLink = `https://whats.tappy.id/checkout/${plano.id}`;
        } else {
          plano.checkoutLink = `https://tappy.id/checkout/${plano.id}`;
        }
      }
      return plano;
    });

    return NextResponse.json({ planos: planosComCheckout });
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar planos' },
      { status: 500 }
    );
  }
}
