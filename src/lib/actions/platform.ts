'use server';

import { prisma } from '@/lib/prisma';

/**
 * Busca todas as plataformas disponíveis
 */
export async function getAllPlatforms() {
  try {
    const platforms = await prisma.platform.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    return {
      platforms,
      error: null
    };
  } catch (error) {
    console.error('Erro ao buscar plataformas:', error);
    return {
      platforms: [],
      error: 'Falha ao carregar as plataformas. Por favor, tente novamente.'
    };
  }
}

/**
 * Busca uma plataforma pelo slug
 */
export async function getPlatformBySlug(slug: string) {
  try {
    const platform = await prisma.platform.findUnique({
      where: {
        slug
      }
    });
    
    return {
      platform,
      error: null
    };
  } catch (error) {
    console.error(`Erro ao buscar plataforma com slug ${slug}:`, error);
    return {
      platform: null,
      error: 'Falha ao carregar a plataforma. Por favor, tente novamente.'
    };
  }
}
