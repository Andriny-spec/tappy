import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

/**
 * Endpoint para pré-registro de assinantes quando eles iniciam o processo de checkout
 * Cria um assinante com status PENDENTE e gera uma senha temporária
 */
export async function POST(request: Request) {
  try {
    const { email, phone, planId } = await request.json();

    if (!email || !phone || !planId) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Verificar se o plano existe
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
      select: {
        id: true,
        platformId: true
      }
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plano não encontrado' }, { status: 404 });
    }

    // Verificar se já existe um usuário com este email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // Se o usuário já existir, verificamos se ele já tem uma assinatura para este plano
    if (existingUser) {
      const existingSubscription = await prisma.subscriber.findFirst({
        where: {
          userId: existingUser.id,
          planId,
        },
      });

      if (existingSubscription) {
        // Se já houver uma assinatura, apenas retornamos ela sem criar duplicata
        return NextResponse.json({ 
          message: 'Assinante já existe para este plano',
          subscriberId: existingSubscription.id
        }, { status: 200 });
      }

      // Criar nova assinatura para usuário existente
      const newSubscription = await prisma.subscriber.create({
        data: {
          userId: existingUser.id,
          planId: plan.id,
          platformId: plan.platformId,
          status: 'PENDENTE'
        }
      });

      return NextResponse.json({ 
        message: 'Assinatura criada com sucesso',
        subscriberId: newSubscription.id
      }, { status: 201 });
    }

    // Gerar identificador único para o usuário
    const userIdentifier = randomBytes(8).toString('hex');
    
    // Criar usuário e assinante
    const user = await prisma.user.create({
      data: {
        email,
        name: email.split('@')[0], // Nome temporário baseado no email
        phone, // Salvar o telefone do usuário
      }
    });
    
    // Criar assinante associado ao usuário
    const subscriber = await prisma.subscriber.create({
      data: {
        userId: user.id,
        planId: plan.id,
        platformId: plan.platformId,
        status: 'PENDENTE'
      }
    });
    
    // Buscar o valor do plano
    const planDetails = await prisma.plan.findUnique({
      where: { id: plan.id },
      select: { price: true }
    });
    
    // Criar registro de pagamento pendente
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        subscriberId: subscriber.id,
        planId: plan.id,
        amount: planDetails?.price || 0,
        status: 'PENDENTE',
        paymentMethod: 'CARTAO', // Valor padrão
        metadata: {
          checkoutUrl: JSON.stringify({
            email,
            phone,
            timestamp: new Date().toISOString()
          })
        }
      }
    });

    return NextResponse.json({ 
      message: 'Pré-registro realizado com sucesso',
      subscriberId: subscriber.id,
      userId: user.id,
      paymentId: payment.id
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar pré-registro:', error);
    return NextResponse.json({ error: 'Erro ao processar solicitação' }, { status: 500 });
  }
}
