import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Obter dados do webhook
    const webhookData = await request.json();
    
    console.log('Webhook Kirvano recebido:', JSON.stringify(webhookData, null, 2));
    
    // Verificar se é um webhook válido da Kirvano
    if (!webhookData || !webhookData.event || !webhookData.data) {
      console.error('Webhook inválido recebido');
      return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 });
    }
    
    // Extrair dados relevantes
    const { event, data } = webhookData;
    
    // Processar eventos diferentes (pagamento aprovado, recusado, etc.)
    if (event === 'payment_approved' || event === 'payment_confirmed') {
      await processarPagamentoAprovado(data);
    } else if (event === 'payment_refused') {
      await processarPagamentoRecusado(data);
    } else if (event === 'subscription_canceled') {
      await processarCancelamentoAssinatura(data);
    } else {
      console.log(`Evento desconhecido: ${event}`);
    }
    
    // Responder com sucesso para a Kirvano
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar webhook da Kirvano:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// Processar pagamento aprovado
async function processarPagamentoAprovado(data: any) {
  try {
    const {
      id: externalId,
      payment_method: paymentMethod,
      amount,
      currency,
      metadata,
    } = data;
    
    // Extrair metadados importantes
    // Assumimos que a Kirvano recebe esses metadados no momento da compra
    const { planId, userId, platformId } = metadata || {};
    
    if (!planId || !userId) {
      console.error('Metadados incompletos:', metadata);
      return;
    }
    
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      console.error(`Usuário não encontrado: ${userId}`);
      return;
    }
    
    // Verificar se o plano existe
    const plan = await prisma.plan.findUnique({
      where: { id: planId }
    });
    
    if (!plan) {
      console.error(`Plano não encontrado: ${planId}`);
      return;
    }

    // Verificar se já existe um assinante ativo para este usuário e plataforma
    const existingSubscriber = await prisma.subscriber.findFirst({
      where: {
        userId,
        platformId: plan.platformId,
        status: 'active'
      }
    });

    // Se já existe um assinante, atualizar o plano
    if (existingSubscriber) {
      // Atualizar assinante
      await prisma.subscriber.update({
        where: { id: existingSubscriber.id },
        data: {
          planId,
          status: 'active',
          updatedAt: new Date()
        }
      });
      
      // Registrar o pagamento
      await prisma.payment.create({
        data: {
          userId,
          subscriberId: existingSubscriber.id,
          planId,
          amount: parseFloat(amount) || plan.price,
          currency: currency || 'BRL',
          status: 'completed',
          paymentMethod: paymentMethod || 'kirvano',
          externalId,
          paymentDate: new Date(),
          webhookData: webhookData,
          metadata: metadata
        }
      });
    } else {
      // Criar novo assinante
      const newSubscriber = await prisma.subscriber.create({
        data: {
          userId,
          planId,
          platformId: plan.platformId,
          status: 'active',
          startDate: new Date()
        }
      });
      
      // Registrar o pagamento
      await prisma.payment.create({
        data: {
          userId,
          subscriberId: newSubscriber.id,
          planId,
          amount: parseFloat(amount) || plan.price,
          currency: currency || 'BRL',
          status: 'completed',
          paymentMethod: paymentMethod || 'kirvano',
          externalId,
          paymentDate: new Date(),
          webhookData: webhookData,
          metadata: metadata
        }
      });
    }
    
    console.log(`Pagamento processado com sucesso para o usuário ${userId} e plano ${planId}`);
  } catch (error) {
    console.error('Erro ao processar pagamento aprovado:', error);
  }
}

// Processar pagamento recusado
async function processarPagamentoRecusado(data: any) {
  try {
    const { id: externalId, metadata } = data;
    const { planId, userId } = metadata || {};
    
    if (!planId || !userId) {
      console.error('Metadados incompletos:', metadata);
      return;
    }
    
    // Registrar pagamento recusado
    await prisma.payment.create({
      data: {
        userId,
        subscriberId: metadata.subscriberId || 'unknown',
        planId,
        amount: parseFloat(data.amount) || 0,
        currency: data.currency || 'BRL',
        status: 'failed',
        paymentMethod: data.payment_method || 'kirvano',
        externalId,
        webhookData: data,
        metadata
      }
    });
    
    console.log(`Pagamento recusado registrado para o usuário ${userId} e plano ${planId}`);
  } catch (error) {
    console.error('Erro ao processar pagamento recusado:', error);
  }
}

// Processar cancelamento de assinatura
async function processarCancelamentoAssinatura(data: any) {
  try {
    const { metadata } = data;
    const { subscriberId } = metadata || {};
    
    if (!subscriberId) {
      console.error('ID do assinante não fornecido nos metadados');
      return;
    }
    
    // Buscar assinante
    const subscriber = await prisma.subscriber.findUnique({
      where: { id: subscriberId }
    });
    
    if (!subscriber) {
      console.error(`Assinante não encontrado: ${subscriberId}`);
      return;
    }
    
    // Atualizar status do assinante para cancelado
    await prisma.subscriber.update({
      where: { id: subscriberId },
      data: {
        status: 'canceled',
        cancelDate: new Date(),
        cancelReason: metadata.cancelReason || 'Cancelamento via Kirvano'
      }
    });
    
    console.log(`Assinatura cancelada para o assinante ${subscriberId}`);
  } catch (error) {
    console.error('Erro ao processar cancelamento de assinatura:', error);
  }
}
