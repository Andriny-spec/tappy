import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// Função auxiliar para gerar slug único para tags
async function generateUniqueTagSlug(name: string, existingId?: string): Promise<string> {
  let slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
  
  // Verificar se o slug já existe
  const existingTag = await prisma.blogTag.findFirst({
    where: {
      slug,
      id: existingId ? { not: existingId } : undefined
    }
  });
  
  // Se o slug já existir, adicione um sufixo numérico
  if (existingTag) {
    let counter = 1;
    let newSlug = `${slug}-${counter}`;
    
    while (await prisma.blogTag.findFirst({ where: { slug: newSlug } })) {
      counter++;
      newSlug = `${slug}-${counter}`;
    }
    
    return newSlug;
  }
  
  return slug;
}

// GET - Listar todas as tags
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const withPostCount = searchParams.get('withPostCount') === 'true';
    
    if (withPostCount) {
      // Buscar tags com contagem de posts
      const tags = await prisma.blogTag.findMany({
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
        tags: tags.map(tag => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          createdAt: tag.createdAt,
          updatedAt: tag.updatedAt,
          postCount: tag._count.posts
        }))
      });
    } else {
      // Buscar tags sem contagem
      const tags = await prisma.blogTag.findMany({
        orderBy: {
          name: 'asc'
        }
      });
      
      return NextResponse.json({ tags });
    }
  } catch (error) {
    console.error('Erro ao listar tags:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar tags do blog' },
      { status: 500 }
    );
  }
}

// POST - Criar uma nova tag
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !(session.user as any).isAdmin) {
      return NextResponse.json(
        { error: 'Acesso não autorizado' },
        { status: 401 }
      );
    }
    
    const { name } = await req.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'Nome da tag é obrigatório' },
        { status: 400 }
      );
    }
    
    // Verificar se a tag já existe pelo nome
    const existingTag = await prisma.blogTag.findFirst({
      where: { name }
    });
    
    if (existingTag) {
      return NextResponse.json(
        { error: 'Já existe uma tag com este nome' },
        { status: 400 }
      );
    }
    
    // Gerar slug único
    const slug = await generateUniqueTagSlug(name);
    
    // Criar a tag
    const tag = await prisma.blogTag.create({
      data: {
        name,
        slug
      }
    });
    
    // Revalidar caminho do blog
    revalidatePath('/blog');
    
    return NextResponse.json({ tag }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tag:', error);
    return NextResponse.json(
      { error: 'Erro ao criar tag do blog' },
      { status: 500 }
    );
  }
}
