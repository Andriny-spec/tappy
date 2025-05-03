import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Criar instância direta do PrismaClient para evitar problemas com tipagem
const prisma = new PrismaClient();

// Função auxiliar para gerar slug único
async function generateUniqueSlug(title: string, existingId?: string): Promise<string> {
  // Criar slug básico
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Verificar se o slug já existe
  let counter = 0;
  
  // Loop até encontrar um slug único
  while (true) {
    const existingPost = await prisma.blogPost.findFirst({
      where: {
        slug,
        ...(existingId ? { id: { not: existingId } } : {})
      }
    });
    
    if (!existingPost) {
      return slug;
    }
    
    // Adicionar contador ao slug e tentar novamente
    counter++;
    slug = `${title.toLowerCase().replace(/\s+/g, '-')}-${counter}`;
  }
}

// GET - Buscar post por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Usar await para parâmetros dinâmicos em Next.js 15+
    const id = (await params).id;
    
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        category: true,
        tags: true
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ post: post });
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return NextResponse.json({ error: 'Erro ao buscar post' }, { status: 500 });
  }
}

// PATCH - Atualizar post por ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Obter ID e dados - usando forma correta para Next.js 15+ com await
    const id = (await params).id;
    const data = await req.json();
    
    console.log(`PATCH: Atualizando post ID ${id}`);
    const { title, excerpt, content, coverImage, status, categoryId, tags, seoScore } = data;
    
    // Verificar se o post existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
      include: { tags: true }
    });
    
    if (!existingPost) {
      console.log(`Post ID ${id} não encontrado`);
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    
    // Gerar slug único se o título foi alterado
    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      slug = await generateUniqueSlug(title, id);
    }
    
    // Detectar se está sendo publicado
    const isPublishing = status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED';
    
    // Processar tags
    let tagsConnect: { id: string }[] = [];
    if (tags && Array.isArray(tags)) {
      // Remover tags existentes
      await prisma.blogPost.update({
        where: { id },
        data: {
          tags: {
            disconnect: existingPost.tags.map(tag => ({ id: tag.id }))
          }
        }
      });
      
      // Processar novas tags
      if (tags.length > 0) {
        for (const tag of tags) {
          // Definir tipo explicitamente para resolver erro de tipo implícito 'any'
          const tagName = typeof tag === 'string' ? tag : (tag as { name?: string; id?: string }).name || '';
          if (!tagName) continue;
          
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
          
          // Upsert da tag
          const tagRecord = await prisma.blogTag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName, slug: tagSlug }
          });
          
          tagsConnect.push({ id: tagRecord.id });
        }
      }
    }
    
    // Preparar dados para atualização
    const updateData: any = {};
    
    // Só incluir campos enviados no PATCH
    if (title !== undefined) updateData.title = title;
    if (slug !== existingPost.slug) updateData.slug = slug;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (status !== undefined) updateData.status = status;
    if (seoScore !== undefined) updateData.seoScore = seoScore;
    if (isPublishing) updateData.publishedAt = new Date();
      // Tratamento especial para categoria
    if (categoryId !== undefined) {
      // Para garantir que não haja violação de chave estrangeira, vamos verificar
      // se a categoria realmente existe antes de associar
      if (categoryId && categoryId !== '') {
        try {
          // Primeiro tenta encontrar categoria existente - por ID, slug ou nome
          let category = await prisma.blogCategory.findFirst({
            where: {
              OR: [
                { id: categoryId },
                { slug: categoryId.toString().toLowerCase().replace(/\s+/g, '-') },
                { name: { equals: categoryId.toString(), mode: 'insensitive' } }
              ]
            }
          });
          
          // Se não encontrou, tenta uma busca parcial pelo nome
          if (!category) {
            category = await prisma.blogCategory.findFirst({
              where: {
                name: { contains: categoryId.toString(), mode: 'insensitive' }
              }
            });
          }
          
          // Se ainda não encontrou, cria automaticamente a categoria
          if (!category) {
            // Cria um slug baseado no nome da categoria
            const slug = categoryId.toString()
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/--+/g, '-')
              .trim();
            
            try {
              // Tenta criar a categoria
              category = await prisma.blogCategory.create({
                data: {
                  name: categoryId.toString(),
                  slug,
                  description: `Categoria ${categoryId.toString()} criada automaticamente`
                }
              });
              console.log(`Categoria criada automaticamente: ${category.name} (${category.id})`);
            } catch (err) {
              console.error('Erro ao criar categoria automaticamente:', err);
            }
          }
          
          // Log do resultado final
          if (category) {
            console.log(`Categoria encontrada/criada: ${category.name} (${category.id})`);
            updateData.categoryId = category.id;
          } else {
            console.log(`Não foi possível encontrar ou criar categoria: ${categoryId}`);
            updateData.categoryId = null;
          }
        } catch (error) {
          console.error('Erro ao processar categoria:', error);
          updateData.categoryId = null;
        }
      } else {
        // Categoria vazia ou null
        updateData.categoryId = null;
      }
    }
    
    // Conectar tags se houver
    if (tagsConnect.length > 0) {
      // Remover duplicatas de tags verificando por IDs únicos
      const uniqueTagsMap = new Map<string, { id: string }>();
      tagsConnect.forEach(tag => uniqueTagsMap.set(tag.id, tag));
      const uniqueTags = Array.from(uniqueTagsMap.values());
      
      updateData.tags = {
        connect: uniqueTags
      };
      console.log(`Conectando ${uniqueTags.length} tags únicas ao post`);
    }
    
    console.log('Dados de atualização:', JSON.stringify(updateData, null, 2));
    
    // Atualizar o post
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { id: true, name: true } },
        category: true,
        tags: true
      }
    });
    
    // Revalidar páginas do blog
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    
    // Retornar com estrutura esperada pelo frontend (wrapper 'post')
    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return NextResponse.json({ error: 'Erro ao atualizar post' }, { status: 500 });
  }
}

// DELETE - Excluir post por ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Usar ID com await para parâmetros dinâmicos em Next.js 15+
    const id = (await params).id;
    
    // Verificar se o post existe
    const post = await prisma.blogPost.findUnique({
      where: { id }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    
    // Excluir o post
    await prisma.blogPost.delete({
      where: { id }
    });
    
    // Revalidar páginas do blog
    revalidatePath('/blog');
    
    // Retornar no mesmo formato que as outras rotas para manter consistência
    return NextResponse.json({ 
      success: true, 
      message: 'Post excluído com sucesso',
      post: { id } // Incluir o ID do post excluído para referência
    });
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return NextResponse.json({ error: 'Erro ao excluir post' }, { status: 500 });
  }
}
