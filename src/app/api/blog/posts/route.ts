import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

// Função auxiliar para gerar slug único
async function generateUniqueSlug(title: string, existingId?: string): Promise<string> {
  // Gerar slug básico
  let baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  let slug = baseSlug;
  let counter = 0;
  
  while (true) {
    // Verificar se o slug já existe
    const existingPost = await prisma.blogPost.findFirst({
      where: {
        slug,
        id: existingId ? { not: existingId } : undefined
      }
    });
    
    if (!existingPost) {
      return slug;
    }
    
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

// GET - Listar todos os posts
export async function GET(req: NextRequest) {
  try {
    console.log('API: Iniciando GET /api/blog/posts');
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    
    console.log('API: Parâmetros de busca:', { page, limit, category, tag, search, status });
    
    const skip = (page - 1) * limit;
    
    // Construir filtros
    const where: any = {};
  
  // Filtrar por status se fornecido
  if (status) {
    where.status = status;
  }
  
  // Filtrando por categoria
  if (category) {
    where.categoryId = category;
  }
  
  // Filtrando por tag
  if (tag) {
    where.tags = {
      some: {
        id: tag
      }
    };
  }
  
  // Pesquisa por texto no título ou conteúdo
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        content: {
          contains: search,
          mode: 'insensitive'
        }
      }
    ];
  }
  
  console.log('API: Condições where:', where);
    
    // Buscar todos os posts, sem filtros
    console.log('API: Buscando todos os posts no banco');
    
    // Primeiro, vamos verificar se existem posts no banco
    const count = await prisma.blogPost.count();
    console.log(`API: Total de posts no banco (sem filtros): ${count}`);
    
    // Buscar posts com filtros
    const posts = await prisma.blogPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc' // Ordenar por data de criação em vez de publicação
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        },
        category: true,
        tags: true
      }
    });
    
    console.log(`API: Encontrados ${posts.length} posts após aplicar filtros`);
    
    // Contar total para paginação
    const totalPosts = await prisma.blogPost.count({ where });
    
    // Formatar a resposta
    const formattedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      status: post.status,
      createdAt: post.createdAt,
      publishedAt: post.publishedAt,
      author: post.author,
      category: post.category,
      tags: post.tags,
      seoScore: post.seoScore || 0 // Adicionar o seoScore
    }));
    
    const response = {
      posts: formattedPosts,
      total: totalPosts,
      page,
      limit,
      totalPages: Math.ceil(totalPosts / limit)
    };
    
    console.log(`API: Retornando resposta com ${formattedPosts.length} posts formatados`);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts do blog' },
      { status: 500 }
    );
  }
}

// POST - Criar um novo post
export async function POST(req: NextRequest) {
  try {
    // Comentado temporariamente para testes
    // const session = await getServerSession(authOptions);
    // 
    // if (!session || !(session.user as any).isAdmin) {
    //   return NextResponse.json(
    //     { error: 'Acesso não autorizado' },
    //     { status: 401 }
    //   );
    // }
    
    const data = await req.json();
    const { 
      title, 
      slug: providedSlug, 
      excerpt, 
      content, 
      coverImage, 
      status, 
      categoryId, 
      tags,
      seoScore
    } = data;
    
    // Validações básicas
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Gerar slug único se não for fornecido
    const slug = providedSlug ? await generateUniqueSlug(providedSlug) : await generateUniqueSlug(title);
    
    // Buscar um admin para associar ao post (temporário para teste)
    const adminUser = await prisma.admin.findFirst();
    
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Não há administradores disponíveis para criar posts' },
        { status: 400 }
      );
    }
    
    // Preparar objeto com as relações de categoria e tags
    let categoryRelation = {};
    if (categoryId) {
      const categoryExists = await prisma.blogCategory.findUnique({
        where: { id: categoryId }
      });
      
      if (categoryExists) {
        categoryRelation = { categoryId };
      }
    }
    
    // Processar tags
    let tagsRelation = {};
    if (tags && Array.isArray(tags) && tags.length > 0) {
      // Verificar se tags existem e criar as que não existem
      const tagPromises = tags.map(async (tag: {name?: string} | string) => {
        const tagName = tag.name || tag;
        const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
        
        // Procurar ou criar a tag
        return await prisma.blogTag.upsert({
          where: { name: tagName },
          update: {},
          create: {
            name: tagName,
            slug: tagSlug
          }
        });
      });
      
      const createdTags = await Promise.all(tagPromises);
      
      tagsRelation = {
        tags: {
          connect: createdTags.map(tag => ({ id: tag.id }))
        }
      };
    }
    
    // Criar o post
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        seoScore: seoScore || 0,
        // Usar o primeiro admin encontrado
        authorId: adminUser.id,
        // Incluir categoria e tags se existirem
        ...categoryRelation,
        ...tagsRelation
      },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        },
        category: true,
        tags: true
      }
    });
    
    // Revalidar caminho do blog para atualizar SSG
    revalidatePath('/blog');
    revalidatePath(`/blog/${newPost.slug}`);
    
    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json(
      { error: 'Erro ao criar post do blog' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir um post
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Extrair ID da rota
    const postId = params?.id;
    if (!postId) {
      // Se não for uma rota com ID, tentar extrair da URL
      const url = new URL(req.url);
      const pathParts = url.pathname.split('/');
      // O último elemento deve ser o ID
      const idFromPath = pathParts[pathParts.length - 1];
      
      if (!idFromPath || idFromPath === 'posts') {
        return NextResponse.json(
          { error: 'ID do post não fornecido' },
          { status: 400 }
        );
      }
    }
    
    // Verificar se o post existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId }
    });
    
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    // Excluir o post
    await prisma.blogPost.delete({
      where: { id: postId }
    });
    
    // Revalidar caminhos para atualizar SSG
    revalidatePath('/blog');
    revalidatePath(`/blog/${existingPost.slug}`);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir post do blog' },
      { status: 500 }
    );
  }
}

// PATCH - Atualizar um post existente
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Extrair ID da rota (se for /api/blog/posts/[id])
    const postId = params?.id;
    if (!postId) {
      // Se não for uma rota com ID, tentar extrair da URL
      const url = new URL(req.url);
      const pathParts = url.pathname.split('/');
      // O último elemento deve ser o ID
      const idFromPath = pathParts[pathParts.length - 1];
      
      if (!idFromPath || idFromPath === 'posts') {
        return NextResponse.json(
          { error: 'ID do post não fornecido' },
          { status: 400 }
        );
      }
    }
    
    // Verificar se o post existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId },
      include: {
        tags: true
      }
    });
    
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    // Obter os dados da requisição
    const data = await req.json();
    const { 
      title, 
      slug: providedSlug, 
      excerpt, 
      content, 
      coverImage, 
      status, 
      categoryId, 
      tags,
      seoScore
    } = data;
    
    // Gerar novo slug se o título mudou
    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      slug = providedSlug ? 
        await generateUniqueSlug(providedSlug, existingPost.id) : 
        await generateUniqueSlug(title, existingPost.id);
    }
    
    // Preparar objeto com as relações de categoria e tags
    let categoryRelation = {};
    if (categoryId) {
      const categoryExists = await prisma.blogCategory.findUnique({
        where: { id: categoryId }
      });
      
      if (categoryExists) {
        categoryRelation = { categoryId };
      }
    }
    
    // Processar tags
    let tagsRelation = {};
    if (tags && Array.isArray(tags) && tags.length > 0) {
      // Primeiro, desconectar todas as tags existentes
      await prisma.blogPost.update({
        where: { id: postId },
        data: {
          tags: {
            disconnect: existingPost.tags.map(tag => ({ id: tag.id }))
          }
        }
      });
      
      // Verificar se tags existem e criar as que não existem
      const tagPromises = tags.map(async (tag: {name?: string} | string) => {
        const tagName = tag.name || tag;
        const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
        
        // Procurar ou criar a tag
        return await prisma.blogTag.upsert({
          where: { name: tagName },
          update: {},
          create: {
            name: tagName,
            slug: tagSlug
          }
        });
      });
      
      const createdTags = await Promise.all(tagPromises);
      
      tagsRelation = {
        tags: {
          connect: createdTags.map(tag => ({ id: tag.id }))
        }
      };
    }
    
    // Preparar objeto de atualização
    const updateData: any = {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content && { content }),
      ...(coverImage !== undefined && { coverImage }),
      ...(status && { status }),
      ...(seoScore !== undefined && { seoScore }),
      ...(status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED' && { publishedAt: new Date() }),
      ...categoryRelation
    };
    
    // Se há tags para conectar, inclui no objeto de atualização
    if (Object.keys(tagsRelation).length > 0) {
      updateData.tags = tagsRelation.tags;
    }
    
    // Atualizar o post
    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        },
        category: true,
        tags: true
      }
    });
    
    // Revalidar caminho do blog para atualizar SSG
    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedPost.slug}`);
    
    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar post do blog' },
      { status: 500 }
    );
  }
}
