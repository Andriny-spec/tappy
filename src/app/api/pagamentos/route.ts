import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Obter parâmetros da URL
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const periodo = searchParams.get('periodo');
    const search = searchParams.get('search');
    
    // Construir filtros para a consulta
    const filters: any = {};
    
    // Filtrar por status se especificado
    if (status && status !== 'todos') {
      filters.status = {
        equals: status.toUpperCase(),
      };
    }
    
    // Filtrar por período
    if (periodo) {
      const date = new Date();
      switch (periodo) {
        case 'ultimo-mes':
          date.setMonth(date.getMonth() - 1);
          break;
        case 'ultimos-3-meses':
          date.setMonth(date.getMonth() - 3);
          break;
        case 'ultimos-6-meses':
          date.setMonth(date.getMonth() - 6);
          break;
        case 'ultimo-ano':
          date.setFullYear(date.getFullYear() - 1);
          break;
        default:
          // Não aplicar filtro de data para 'todos'
          break;
      }
      
      if (periodo !== 'todos') {
        filters.createdAt = {
          gte: date,
        };
      }
    }
    
    // Filtrar por termo de pesquisa
    if (search) {
      filters.OR = [
        {
          user: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            email: {
              contains: search,
              mode: 'insensitive'
            }
          }
        },
        {
          plan: {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        }
      ];
    }
    
    // Buscar pagamentos com filtros
    const payments = await prisma.payment.findMany({
      where: filters,
      include: {
        user: true,
        plan: {
          include: {
            platform: true
          }
        },
        subscriber: {
          include: {
            platform: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Calcular métricas
    const totalApprovedPayments = await prisma.payment.aggregate({
      where: {
        status: 'APROVADO'
      },
      _sum: {
        amount: true
      }
    });
    
    const averageTicket = await prisma.payment.aggregate({
      where: {
        status: 'APROVADO'
      },
      _avg: {
        amount: true
      }
    });
    
    // Mapear dados para o formato esperado pela UI
    const formattedPayments = payments.map(payment => {
      // Determinar a plataforma a partir do subscriber ou do plano
      const plataforma = payment.subscriber?.platform?.name || 
                         payment.plan?.platform?.name || 
                         'Sem plataforma';
      
      // Determinar o tipoPeriodo (vamos assumir que seja "Mensal" ou "Anual" com base no nome do plano)
      let tipoPeriodo = 'Mensal';
      if (payment.plan?.name?.toLowerCase().includes('anual') || 
          payment.plan?.name?.toLowerCase().includes('annual')) {
        tipoPeriodo = 'Anual';
      }
      
      return {
        id: payment.id,
        cliente: payment.user?.name || 'Sem nome',
        email: payment.user?.email || 'Sem email',
        data: payment.createdAt.toISOString(),
        valor: payment.amount.toString(),
        metodo: payment.paymentMethod,
        plano: payment.plan?.name || 'Sem plano',
        tipoPeriodo: tipoPeriodo,
        plataforma: plataforma,
        status: payment.status
      };
    });
    
    return NextResponse.json({ 
      payments: formattedPayments,
      metrics: {
        totalReceived: totalApprovedPayments._sum.amount || 0,
        averageTicket: averageTicket._avg.amount || 0
      }
    });
    
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar pagamentos' }, { status: 500 });
  }
}
