import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// Função auxiliar para gerar slug único para categorias
async function generateUniqueCategorySlug(name: string, existingId?: string): Promise<string> {
  let slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
  
  // Verificar se o slug já existe
  const existingCategory = await prisma.blogCategory.findFirst({
    where: {
      slug,
      id: existingId ? { not: existingId } : undefined
    }
  });
  
  // Se o slug já existir, adicione um sufixo numérico
  if (existingCategory) {
    let counter = 1;
    let newSlug = `${slug}-${counter}`;
    
    while (await prisma.blogCategory.findFirst({ where: { slug: newSlug } })) {
      counter++;
      newSlug = `${slug}-${counter}`;
    }
    
    return newSlug;
  }
  
  return slug;
}

// GET - Listar todas as categorias
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const withPostCount = searchParams.get('withPostCount') === 'true';
    
    if (withPostCount) {
      // Buscar categorias com contagem de posts
      const categories = await prisma.blogCategory.findMany({
        orderBy: {
          name: 'asc'
        },
        include: {
          _count: {
            select: {
              posts: true
            }
          }
        }
      });
      
      return NextResponse.json({
        categories: categories.map(category => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          postCount: category._count.posts
        }))
      });
    } else {
      // Buscar categorias sem contagem
      const categories = await prisma.blogCategory.findMany({
        orderBy: {
          name: 'asc'
        }
      });
      
      return NextResponse.json({ categories });
    }
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar categorias do blog' },
      { status: 500 }
    );
  }
}

// POST - Criar uma nova categoria
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !(session.user as any).isAdmin) {
      return NextResponse.json(
        { error: 'Acesso não autorizado' },
        { status: 401 }
      );
    }
    
    const { name, description } = await req.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'Nome da categoria é obrigatório' },
        { status: 400 }
      );
    }
    
    // Gerar slug único
    const slug = await generateUniqueCategorySlug(name);
    
    // Criar a categoria
    const category = await prisma.blogCategory.create({
      data: {
        name,
        slug,
        description
      }
    });
    
    // Revalidar caminho do blog
    revalidatePath('/blog');
    
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json(
      { error: 'Erro ao criar categoria do blog' },
      { status: 500 }
    );
  }
}
