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

    return NextResponse.json({ planos });
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar planos' },
      { status: 500 }
    );
  }
}
