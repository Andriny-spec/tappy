import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Buscar post pelo slug
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    
    console.log('API: Iniciando GET /api/blog/posts/by-slug com slug:', slug);
    
    if (!slug) {
      return NextResponse.json({ error: 'O slug é obrigatório' }, { status: 400 });
    }
    
    // Buscar post pelo slug
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: slug
      },
      include: {
        category: true,
        tags: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    
    if (!post) {
      console.log(`API: Post com slug ${slug} não encontrado`);
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    
    console.log(`API: Post encontrado com slug ${slug}`, post.id);
    
    // Atualizar contador de visualizações
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    });
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error);
    return NextResponse.json({ error: 'Erro ao buscar post' }, { status: 500 });
  }
}
