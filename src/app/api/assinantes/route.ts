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

    // Buscar todos os assinantes com relações
    const assinantes = await prisma.subscriber.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true
          }
        },
        plan: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            interval: true,
            features: true
          }
        },
        platform: {
          select: {
            id: true,
            name: true,
            slug: true,
            url: true
          }
        },
        payments: {
          take: 1,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            amount: true,
            status: true,
            paymentMethod: true,
            paymentDate: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Calcular métricas para o resumo
    const totalAssinantes = assinantes.length;
    const assinantesAtivos = assinantes.filter(a => a.status === 'active').length;
    const assinantesCancelados = assinantes.filter(a => a.status === 'canceled').length;
    const assinantesInadimplentes = assinantes.filter(a => a.status === 'overdue').length;
    
    // Calcular assinantes novos no último mês
    const umMesAtras = new Date();
    umMesAtras.setMonth(umMesAtras.getMonth() - 1);
    
    const assinantesNovos = assinantes.filter(
      a => new Date(a.startDate) > umMesAtras
    ).length;

    // Calcular ticket médio
    const pagamentosAtivos = assinantes
      .filter(a => a.status === 'active')
      .flatMap(a => a.payments);
    
    const ticketMedio = pagamentosAtivos.length 
      ? pagamentosAtivos.reduce((acc, val) => acc + val.amount, 0) / pagamentosAtivos.length
      : 0;

    return NextResponse.json({
      assinantes,
      resumo: {
        total: totalAssinantes,
        ativos: assinantesAtivos,
        cancelados: assinantesCancelados,
        inadimplentes: assinantesInadimplentes,
        novos: assinantesNovos,
        ticketMedio
      }
    });
  } catch (error) {
    console.error('Erro ao buscar assinantes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar assinantes' },
      { status: 500 }
    );
  }
}
