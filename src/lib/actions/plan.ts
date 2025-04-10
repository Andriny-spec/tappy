'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { PlanFormValues, PlanSchema } from '@/lib/schemas/plan-schema';

/**
 * Busca todos os planos
 */
export async function getAllPlans() {
  try {
    const plans = await prisma.plan.findMany({
      include: {
        platform: true,
        _count: {
          select: {
            subscribers: true
          }
        }
      },
      orderBy: [
        { platformId: 'asc' },
        { displayOrder: 'asc' }
      ]
    });

    return {
      plans,
      error: null
    };
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return {
      plans: [],
      error: 'Falha ao carregar os planos. Por favor, tente novamente.'
    };
  }
}

/**
 * Busca planos por plataforma
 */
export async function getPlansByPlatform(platformId: string) {
  try {
    const plans = await prisma.plan.findMany({
      where: {
        platformId
      },
      include: {
        _count: {
          select: {
            subscribers: true
          }
        }
      },
      orderBy: {
        displayOrder: 'asc'
      }
    });

    return {
      plans,
      error: null
    };
  } catch (error) {
    console.error(`Erro ao buscar planos da plataforma ${platformId}:`, error);
    return {
      plans: [],
      error: 'Falha ao carregar os planos desta plataforma. Por favor, tente novamente.'
    };
  }
}

/**
 * Busca um plano pelo ID
 */
export async function getPlanById(id: string) {
  try {
    const plan = await prisma.plan.findUnique({
      where: { id },
      include: {
        platform: true,
        _count: {
          select: {
            subscribers: true
          }
        }
      }
    });

    if (!plan) {
      return {
        plan: null,
        error: 'Plano não encontrado'
      };
    }

    return {
      plan,
      error: null
    };
  } catch (error) {
    console.error(`Erro ao buscar o plano ${id}:`, error);
    return {
      plan: null,
      error: 'Falha ao carregar o plano. Por favor, tente novamente.'
    };
  }
}

/**
 * Cria um novo plano
 */
export async function createPlan(data: PlanFormValues) {
  try {
    const validatedData = PlanSchema.parse(data);
    
    // Remover o id se estiver presente, pois será gerado pelo Prisma
    // @ts-ignore - Sabemos que o id pode existir no objeto mesmo não sendo necessário para criação
    const { id, ...planData } = validatedData;
    
    const newPlan = await prisma.plan.create({
      data: planData
    });

    revalidatePath('/dashboard/planos');
    
    return {
      plan: newPlan,
      error: null
    };
  } catch (error) {
    console.error('Erro ao criar plano:', error);
    if (error instanceof Error && 'errors' in (error as any)) {
      return {
        plan: null,
        error: 'Dados inválidos: ' + (error as any).errors.map((e: any) => e.message).join(', ')
      };
    }
    return {
      plan: null,
      error: 'Falha ao criar o plano. Por favor, tente novamente.'
    };
  }
}

/**
 * Atualiza um plano existente
 */
export async function updatePlan(id: string, data: PlanFormValues) {
  try {
    const validatedData = PlanSchema.parse(data);
    
    // Remover o id do objeto de dados, pois já estamos usando na cláusula where
    // @ts-ignore - Sabemos que o id pode existir no objeto
    const { id: _, ...planData } = validatedData;
    
    const updatedPlan = await prisma.plan.update({
      where: { id },
      data: planData
    });

    revalidatePath('/dashboard/planos');
    
    return {
      plan: updatedPlan,
      error: null
    };
  } catch (error) {
    console.error(`Erro ao atualizar o plano ${id}:`, error);
    if (error instanceof Error && 'errors' in (error as any)) {
      return {
        plan: null,
        error: 'Dados inválidos: ' + (error as any).errors.map((e: any) => e.message).join(', ')
      };
    }
    return {
      plan: null,
      error: 'Falha ao atualizar o plano. Por favor, tente novamente.'
    };
  }
}

/**
 * Exclui um plano pelo ID
 */
export async function deletePlan(id: string) {
  try {
    // Apenas registra no log quantos assinantes estão usando o plano (para informação)
    const subscribersCount = await prisma.subscriber.count({
      where: { planId: id }
    });
    
    if (subscribersCount > 0) {
      console.log(`Excluindo plano com ${subscribersCount} assinantes ativos. Os assinantes precisarão ser migrados.`);
    }
    
    await prisma.plan.delete({
      where: { id },
      // Força a exclusão, ignorando restrições de chave estrangeira
      // ATENÇÃO: Isso pode causar problemas com assinantes que usam esse plano
    });

    revalidatePath('/dashboard/planos');
    
    return {
      success: true,
      error: null
    };
  } catch (error) {
    console.error(`Erro ao excluir o plano ${id}:`, error);
    return {
      success: false,
      error: 'Falha ao excluir o plano. Por favor, tente novamente.'
    };
  }
}

/**
 * Atualiza o status de um plano (ativo/inativo)
 */
export async function togglePlanStatus(id: string) {
  try {
    const plan = await prisma.plan.findUnique({
      where: { id },
      select: { isActive: true }
    });
    
    if (!plan) {
      return {
        success: false,
        error: 'Plano não encontrado'
      };
    }
    
    const updatedPlan = await prisma.plan.update({
      where: { id },
      data: {
        isActive: !plan.isActive
      }
    });

    revalidatePath('/dashboard/planos');
    
    return {
      success: true,
      plan: updatedPlan,
      error: null
    };
  } catch (error) {
    console.error(`Erro ao atualizar o status do plano ${id}:`, error);
    return {
      success: false,
      plan: null,
      error: 'Falha ao atualizar o status do plano. Por favor, tente novamente.'
    };
  }
}

/**
 * Atualiza o destaque de um plano (destacado/não destacado)
 */
export async function togglePlanHighlight(id: string) {
  try {
    const plan = await prisma.plan.findUnique({
      where: { id },
      select: { isHighlighted: true, platformId: true }
    });
    
    if (!plan) {
      return {
        success: false,
        error: 'Plano não encontrado'
      };
    }
    
    // Se estamos ativando o destaque, primeiro desmarcamos outros planos destacados da mesma plataforma
    if (!plan.isHighlighted) {
      await prisma.plan.updateMany({
        where: {
          platformId: plan.platformId,
          isHighlighted: true
        },
        data: {
          isHighlighted: false
        }
      });
    }
    
    const updatedPlan = await prisma.plan.update({
      where: { id },
      data: {
        isHighlighted: !plan.isHighlighted
      }
    });

    revalidatePath('/dashboard/planos');
    
    return {
      success: true,
      plan: updatedPlan,
      error: null
    };
  } catch (error) {
    console.error(`Erro ao atualizar o destaque do plano ${id}:`, error);
    return {
      success: false,
      plan: null,
      error: 'Falha ao atualizar o destaque do plano. Por favor, tente novamente.'
    };
  }
}

/**
 * Busca estatísticas de planos
 */
export async function getPlanStats() {
  try {
    const totalPlans = await prisma.plan.count();
    
    const activeSubscribers = await prisma.subscriber.count({
      where: {
        status: 'Ativo'
      }
    });
    
    const platforms = await prisma.platform.findMany({
      include: {
        _count: {
          select: {
            plans: true
          }
        }
      }
    });
    
    const popularPlans = await prisma.plan.findMany({
      take: 5,
      include: {
        platform: true,
        _count: {
          select: {
            subscribers: true
          }
        }
      },
      orderBy: {
        subscribers: {
          _count: 'desc'
        }
      }
    });
    
    return {
      totalPlans,
      activeSubscribers,
      platformsCount: platforms.map(p => ({
        id: p.id,
        name: p.name,
        plansCount: p._count.plans
      })),
      popularPlans,
      error: null
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas de planos:', error);
    return {
      error: 'Falha ao carregar as estatísticas. Por favor, tente novamente.'
    };
  }
}
