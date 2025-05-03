import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(request: Request) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validar dados necessários
    if (!data.id) {
      return NextResponse.json(
        { error: 'ID do assinante é obrigatório' },
        { status: 400 }
      );
    }

    const newStatus = data.active ? 'active' : 'canceled';
    
    // Atualizar status do assinante
    const updatedSubscriber = await prisma.subscriber.update({
      where: { id: data.id },
      data: { 
        status: newStatus,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      subscriber: updatedSubscriber,
      message: `Assinante ${data.active ? 'ativado' : 'desativado'} com sucesso`
    });
    
  } catch (error) {
    console.error('Erro ao atualizar status do assinante:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar status do assinante' },
      { status: 500 }
    );
  }
}

