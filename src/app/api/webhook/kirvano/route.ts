import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // Verificar se o corpo da requisição existe
    if (!req.body) {
      return NextResponse.json(
        { error: 'Nenhum dado recebido' },
        { status: 400 }
      );
    }

    // Obter os dados do webhook
    const payload = await req.text();
    const webhookData = JSON.parse(payload);

    // Verificar a assinatura do webhook (quando implementada no Kirvano)
    const signature = req.headers.get('x-kirvano-signature');
    const isValid = await validateWebhookSignature(signature, payload);

    if (!isValid) {
      console.error('Webhook: Assinatura inválida');
      return NextResponse.json(
        { error: 'Assinatura inválida' },
        { status: 401 }
      );
    }

    // Processar o evento baseado no tipo
    const eventType = webhookData.event || '';
    console.log(`Webhook Kirvano recebido: ${eventType}`);

    if (eventType === 'payment.created') {
      await handlePaymentCreated(webhookData);
    } else if (eventType === 'payment.approved') {
      await handlePaymentApproved(webhookData);
    } else if (eventType === 'payment.failed') {
      await handlePaymentFailed(webhookData);
    } else if (eventType === 'payment.refunded') {
      await handlePaymentRefunded(webhookData);
    } else if (eventType === 'subscription.created') {
      await handleSubscriptionCreated(webhookData);
    } else if (eventType === 'subscription.canceled') {
      await handleSubscriptionCanceled(webhookData);
    } else {
      console.log(`Evento não processado: ${eventType}`);
    }

    // Responder com sucesso
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar webhook Kirvano:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Validar a assinatura do webhook
async function validateWebhookSignature(
  signature: string | null,
  payload: string
): Promise<boolean> {
  if (!signature) {
    // Temporariamente retornar true se não houver assinatura
    // Em produção, seria melhor recusar se não houver assinatura
    return true;
  }

  try {
    // Buscar a chave secreta do webhook no banco de dados
    const paymentConfig = await prisma.paymentConfig.findFirst({
      where: { isActive: true },
    });

    if (!paymentConfig?.webhookSecret) {
      console.warn('Webhook secret não configurado');
      return false;
    }

    // Calcular o HMAC usando a chave secreta
    const hmac = crypto
      .createHmac('sha256', paymentConfig.webhookSecret)
      .update(payload)
      .digest('hex');

    // Comparar a assinatura calculada com a recebida
    return crypto.timingSafeEqual(
      Buffer.from(hmac),
      Buffer.from(signature)
    );
  } catch (error) {
    console.error('Erro ao validar assinatura do webhook:', error);
    return false;
  }
}

// Handlers para cada tipo de evento
async function handlePaymentCreated(data: any) {
  const paymentData = data.data;
  
  if (!paymentData || !paymentData.id) {
    console.error('Dados de pagamento inválidos');
    return;
  }

  try {
    // Extrair metadados
    const metadata = paymentData.metadata || {};
    const userId = metadata.userId;
    const planId = metadata.planId;
    const subscriberId = metadata.subscriberId;

    // Verificar se todos os IDs necessários existem
    if (!userId || !planId || !subscriberId) {
      console.error('Metadados incompletos para o pagamento:', paymentData.id);
      return;
    }

    // Criar ou atualizar o pagamento no banco de dados
    await prisma.payment.upsert({
      where: { 
        externalId: paymentData.id.toString() 
      },
      update: {
        status: 'Pendente',
        amount: parseFloat(paymentData.amount) / 100, // Convertendo de centavos para reais
        paymentMethod: mapPaymentMethod(paymentData.paymentMethod),
        webhookData: paymentData,
        updatedAt: new Date()
      },
      create: {
        externalId: paymentData.id.toString(),
        userId: userId,
        subscriberId: subscriberId,
        planId: planId,
        amount: parseFloat(paymentData.amount) / 100,
        currency: paymentData.currency || 'BRL',
        status: 'Pendente',
        paymentMethod: mapPaymentMethod(paymentData.paymentMethod),
        webhookData: paymentData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    console.log(`Pagamento criado: ${paymentData.id}`);
  } catch (error) {
    console.error('Erro ao processar payment.created:', error);
  }
}

async function handlePaymentApproved(data: any) {
  const paymentData = data.data;
  
  if (!paymentData || !paymentData.id) {
    console.error('Dados de pagamento inválidos');
    return;
  }

  try {
    // Atualizar o status do pagamento para Aprovado
    const payment = await prisma.payment.update({
      where: { externalId: paymentData.id.toString() },
      data: {
        status: 'Aprovado',
        paymentDate: new Date(),
        webhookData: paymentData,
        updatedAt: new Date()
      },
      include: {
        subscriber: true
      }
    });

    // Se o pagamento estiver associado a um assinante, atualizar o status do assinante
    if (payment.subscriber) {
      await prisma.subscriber.update({
        where: { id: payment.subscriberId },
        data: {
          status: 'Ativo',
          // Calcular a data de término com base no intervalo do plano
          // (Isso seria implementado com base no plano)
          updatedAt: new Date()
        }
      });
    }

    // Atualizar métricas
    await updateMetrics(payment, 'sale');

    console.log(`Pagamento aprovado: ${paymentData.id}`);
  } catch (error) {
    console.error('Erro ao processar payment.approved:', error);
  }
}

async function handlePaymentFailed(data: any) {
  const paymentData = data.data;
  
  if (!paymentData || !paymentData.id) {
    console.error('Dados de pagamento inválidos');
    return;
  }

  try {
    // Atualizar o status do pagamento para Falhou
    await prisma.payment.update({
      where: { externalId: paymentData.id.toString() },
      data: {
        status: 'Falhou',
        webhookData: paymentData,
        updatedAt: new Date()
      }
    });

    console.log(`Pagamento falhou: ${paymentData.id}`);
  } catch (error) {
    console.error('Erro ao processar payment.failed:', error);
  }
}

async function handlePaymentRefunded(data: any) {
  const paymentData = data.data;
  
  if (!paymentData || !paymentData.id) {
    console.error('Dados de pagamento inválidos');
    return;
  }

  try {
    // Atualizar o status do pagamento para Reembolsado
    const payment = await prisma.payment.update({
      where: { externalId: paymentData.id.toString() },
      data: {
        status: 'Reembolsado',
        refundDate: new Date(),
        refundReason: paymentData.refundReason || 'Sem motivo especificado',
        webhookData: paymentData,
        updatedAt: new Date()
      }
    });

    // Atualizar métricas para refunds
    await updateMetrics(payment, 'refund');

    console.log(`Pagamento reembolsado: ${paymentData.id}`);
  } catch (error) {
    console.error('Erro ao processar payment.refunded:', error);
  }
}

async function handleSubscriptionCreated(data: any) {
  const subscriptionData = data.data;
  
  if (!subscriptionData || !subscriptionData.id) {
    console.error('Dados de assinatura inválidos');
    return;
  }

  // Implementação para criar ou atualizar assinatura
  try {
    // Extrair metadados
    const metadata = subscriptionData.metadata || {};
    const userId = metadata.userId;
    const planId = metadata.planId;
    const platformId = metadata.platformId;

    // Verificar se todos os IDs necessários existem
    if (!userId || !planId || !platformId) {
      console.error('Metadados incompletos para a assinatura:', subscriptionData.id);
      return;
    }

    // Criar ou atualizar o assinante
    const subscriber = await prisma.subscriber.upsert({
      where: { 
        id: metadata.subscriberId || 'create-new-id'
      },
      update: {
        status: 'Ativo',
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        planId: planId,
        platformId: platformId,
        status: 'Ativo',
        startDate: new Date(),
      }
    });

    // Atualizar métricas para novos assinantes
    await updateNewSubscriberMetrics(subscriber);

    console.log(`Assinatura criada: ${subscriptionData.id}`);
  } catch (error) {
    console.error('Erro ao processar subscription.created:', error);
  }
}

async function handleSubscriptionCanceled(data: any) {
  const subscriptionData = data.data;
  
  if (!subscriptionData || !subscriptionData.id) {
    console.error('Dados de cancelamento inválidos');
    return;
  }

  // Implementação para cancelar assinatura
  try {
    // Extrair metadados
    const metadata = subscriptionData.metadata || {};
    const subscriberId = metadata.subscriberId;

    if (!subscriberId) {
      console.error('ID do assinante não encontrado para cancelamento:', subscriptionData.id);
      return;
    }

    // Atualizar o status do assinante para Cancelado
    const subscriber = await prisma.subscriber.update({
      where: { id: subscriberId },
      data: {
        status: 'Cancelado',
        cancelDate: new Date(),
        cancelReason: subscriptionData.cancelReason || 'Sem motivo especificado',
        updatedAt: new Date()
      },
      include: {
        platform: true
      }
    });

    // Atualizar métricas para cancelamentos
    await updateCanceledSubscriberMetrics(subscriber);

    console.log(`Assinatura cancelada: ${subscriptionData.id}`);
  } catch (error) {
    console.error('Erro ao processar subscription.canceled:', error);
  }
}

// Auxiliares para atualizar métricas
async function updateMetrics(payment: any, type: 'sale' | 'refund') {
  try {
    // Obter a data atual formatada como YYYY-MM-DD para contabilizar métricas diárias
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Buscar a plataforma associada ao plano
    const plan = await prisma.plan.findUnique({
      where: { id: payment.planId },
      include: { platform: true }
    });

    if (!plan || !plan.platform) {
      console.error('Plataforma não encontrada para o pagamento');
      return;
    }

    // Atualizar ou criar registro de métricas para a data
    if (type === 'sale') {
      await prisma.metrics.upsert({
        where: {
          platformId_date: {
            platformId: plan.platformId,
            date: today
          }
        },
        update: {
          sales: { increment: 1 },
          revenue: { increment: payment.amount },
          updatedAt: new Date()
        },
        create: {
          platformId: plan.platformId,
          date: today,
          sales: 1,
          revenue: payment.amount
        }
      });
    } else if (type === 'refund') {
      await prisma.metrics.upsert({
        where: {
          platformId_date: {
            platformId: plan.platformId,
            date: today
          }
        },
        update: {
          refunds: { increment: 1 },
          refundAmount: { increment: payment.amount },
          updatedAt: new Date()
        },
        create: {
          platformId: plan.platformId,
          date: today,
          refunds: 1,
          refundAmount: payment.amount
        }
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar métricas:', error);
  }
}

async function updateNewSubscriberMetrics(subscriber: any) {
  try {
    // Obter a data atual formatada como YYYY-MM-DD para contabilizar métricas diárias
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.metrics.upsert({
      where: {
        platformId_date: {
          platformId: subscriber.platformId,
          date: today
        }
      },
      update: {
        newSubscribers: { increment: 1 },
        updatedAt: new Date()
      },
      create: {
        platformId: subscriber.platformId,
        date: today,
        newSubscribers: 1
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar métricas de novos assinantes:', error);
  }
}

async function updateCanceledSubscriberMetrics(subscriber: any) {
  try {
    // Obter a data atual formatada como YYYY-MM-DD para contabilizar métricas diárias
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.metrics.upsert({
      where: {
        platformId_date: {
          platformId: subscriber.platformId,
          date: today
        }
      },
      update: {
        canceledSubscribers: { increment: 1 },
        updatedAt: new Date()
      },
      create: {
        platformId: subscriber.platformId,
        date: today,
        canceledSubscribers: 1
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar métricas de assinantes cancelados:', error);
  }
}

// Mapear métodos de pagamento do Kirvano para nosso formato
function mapPaymentMethod(method: string): string {
  switch (method?.toLowerCase()) {
    case 'pix':
      return 'PIX';
    case 'credit_card':
      return 'Cartão de Crédito';
    case 'debit_card':
      return 'Cartão de Débito';
    default:
      return method || 'Desconhecido';
  }
}
