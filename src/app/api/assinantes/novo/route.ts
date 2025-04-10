import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { prisma } from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: Request) {
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
    if (!data.plataformaId || !data.planoId) {
      return NextResponse.json(
        { error: 'Dados incompletos (plataforma e plano são obrigatórios)' },
        { status: 400 }
      );
    }

    // Verificar se o plano é válido e pertence à plataforma
    const plano = await prisma.plan.findUnique({
      where: {
        id: data.planoId,
        platformId: data.plataformaId
      }
    });

    if (!plano) {
      return NextResponse.json(
        { error: 'Plano inválido ou não pertence à plataforma selecionada' },
        { status: 400 }
      );
    }

    let userId: string;

    // Se for um usuário novo, criar no banco de dados
    if (data.tipo === 'novo') {
      if (!data.novoUsuario?.nome || !data.novoUsuario?.email) {
        return NextResponse.json(
          { error: 'Dados do novo usuário incompletos' },
          { status: 400 }
        );
      }

      // Verificar se o email já existe
      const usuarioExistente = await prisma.user.findUnique({
        where: {
          email: data.novoUsuario.email
        }
      });

      if (usuarioExistente) {
        return NextResponse.json(
          { error: 'Este email já está cadastrado. Use a opção "Usuário Existente".' },
          { status: 400 }
        );
      }

      // Criar novo usuário
      const novoUsuario = await prisma.user.create({
        data: {
          name: data.novoUsuario.nome,
          email: data.novoUsuario.email,
          phone: data.novoUsuario.telefone || null
        }
      });

      userId = novoUsuario.id;
    } 
    // Se for um usuário existente, verificar se ele existe
    else if (data.tipo === 'existente') {
      if (!data.usuarioId) {
        return NextResponse.json(
          { error: 'ID do usuário existente não fornecido' },
          { status: 400 }
        );
      }

      const usuario = await prisma.user.findUnique({
        where: {
          id: data.usuarioId
        }
      });

      if (!usuario) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }

      // Verificar se o usuário já é assinante do mesmo plano/plataforma
      const assinaturaExistente = await prisma.subscriber.findFirst({
        where: {
          userId: data.usuarioId,
          platformId: data.plataformaId,
          planId: data.planoId,
          status: {
            in: ['active', 'overdue']
          }
        }
      });

      if (assinaturaExistente) {
        return NextResponse.json(
          { error: 'Este usuário já possui uma assinatura ativa para este plano/plataforma' },
          { status: 400 }
        );
      }

      userId = data.usuarioId;
    } else {
      return NextResponse.json(
        { error: 'Tipo de assinante inválido' },
        { status: 400 }
      );
    }

    // Criar o assinante
    const assinante = await prisma.subscriber.create({
      data: {
        userId,
        platformId: data.plataformaId,
        planId: data.planoId,
        status: 'active',
        startDate: new Date()
      }
    });

    // Criar registro de pagamento
    const pagamento = await prisma.payment.create({
      data: {
        userId,
        subscriberId: assinante.id,
        planId: data.planoId,
        amount: plano.price,
        currency: 'BRL',
        status: 'paid',
        paymentMethod: 'admin_add',
        paymentDate: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      assinante: {
        id: assinante.id,
        userId,
        planId: assinante.planId,
        platformId: assinante.platformId,
        startDate: assinante.startDate
      }
    });
  } catch (error) {
    console.error('Erro ao criar assinante:', error);
    return NextResponse.json(
      { error: 'Erro ao criar assinante' },
      { status: 500 }
    );
  }
}
