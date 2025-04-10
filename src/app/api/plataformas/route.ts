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

    // Buscar todas as plataformas
    const plataformas = await prisma.platform.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        url: true,
        description: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json({ plataformas });
  } catch (error) {
    console.error('Erro ao buscar plataformas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar plataformas' },
      { status: 500 }
    );
  }
}
