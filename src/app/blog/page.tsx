import { Metadata } from 'next';
import { Newspaper, Filter, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BlogHero } from '@/components/blog/blog-hero';
import { PostCard } from '@/components/blog/post-card';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { NewsletterCard } from '@/components/blog/newsletter-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Tappy',
  description: 'Artigos e conteúdos sobre marketing, vendas, tecnologia e dicas para utilizar as soluções Tappy da melhor forma.',
};

// Tipos para os dados do blog
type Author = {
  name: string;
  avatar: string;
};

type BlogPostType = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: string;
  views: number;
  featured?: boolean;
};

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  count: number;
};



// Função para buscar posts do blog via Prisma
async function getBlogPosts(): Promise<BlogPostType[]> {
  try {
    // Buscar posts publicados do banco de dados via Prisma
    const blogPosts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED' // Corrigido: usando status em vez de published
      },
      include: {
        category: true,
        tags: true,
        author: {
          select: {
            name: true
            // Removido campo image que não existe no modelo Admin
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });

    // Se não houver posts, retorna array vazio
    if (blogPosts.length === 0) {
      return [];
    }

    // Transformar os dados do Prisma para o formato BlogPostType
    return blogPosts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      coverImage: post.coverImage || '/images/placeholder.jpg',
      category: {
        name: post.category?.name || 'Sem categoria',
        slug: post.category?.slug || 'sem-categoria'
      },
      tags: post.tags?.map(tag => tag.name) || [],
      author: {
        name: post.author?.name || 'Equipe Tappy',
        avatar: post.author?.image || 'https://randomuser.me/api/portraits/lego/1.jpg'
      },
      publishedAt: post.publishedAt?.toISOString() || new Date().toISOString(),
      readTime: `${post.readTimeMinutes || 5} min`,
      views: post.views || 0,
      featured: post.featured || false
    }));
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error);
    return [];
  }
}

// Função para buscar categorias do blog
async function getCategories(): Promise<CategoryType[]> {
  try {
    // Buscar categorias do banco de dados via Prisma, com contagem de posts publicados
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: {
            posts: {
              where: {
                status: 'PUBLISHED'
              }
            }
          }
        }
      }
    });

    // Se não houver categorias, retorna array vazio
    if (categories.length === 0) {
      return [];
    }

    // Transformar os dados do Prisma para o formato CategoryType
    return categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      count: category._count.posts
    }));
  } catch (error) {
    console.error('Erro ao buscar categorias do blog:', error);
    return [];
  }
}

export default async function BlogPage() {
  // Buscar posts e categorias em paralelo
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ]);

  // Extrair post em destaque e restante dos posts
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const otherPosts = posts.length > 0 ? posts.slice(1) : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Banner com Post em Destaque */}
        {featuredPost ? (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="container px-4 md:px-6">
              <BlogHero 
                featuredPost={{
                  id: featuredPost.id,
                  title: featuredPost.title,
                  excerpt: featuredPost.excerpt || '',
                  content: featuredPost.content,
                  coverImage: featuredPost.coverImage || '',
                  category: featuredPost.category?.name || 'Sem categoria',
                  slug: featuredPost.slug,
                  tags: featuredPost.tags || [],
                  author: {
                    name: featuredPost.author?.name || 'Autor desconhecido',
                    avatar: '' // O modelo Admin não tem campo de imagem/avatar
                  },
                  publishedAt: featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toISOString() : new Date().toISOString(),
                  readTime: parseInt(featuredPost.readTime) || 5
                }}
              />
            </div>
          </section>
        ) : null}

        {/* Lista de Posts e Sidebar */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Posts */}
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Artigos Recentes</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filtrar
                    </Button>
                    <Tabs defaultValue="recentes" className="hidden md:flex">
                      <TabsList>
                        <TabsTrigger value="recentes">Recentes</TabsTrigger>
                        <TabsTrigger value="populares">Populares</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* Filtros Mobile */}
                <div className="md:hidden flex flex-col gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        Filtrar
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Tabs defaultValue="recentes" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="recentes" className="flex-1">Recentes</TabsTrigger>
                      <TabsTrigger value="populares" className="flex-1">Populares</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Grade de Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {otherPosts.map((post: BlogPostType) => (
                    <PostCard
                      key={post.id}
                      post={{
                        id: post.id,
                        title: post.title,
                        excerpt: post.excerpt,
                        content: post.content,
                        coverImage: post.coverImage,
                        category: post.category.name,
                        slug: post.slug,
                        tags: post.tags,
                        author: {
                          name: post.author?.name || 'Autor desconhecido',
                          avatar: '' // O modelo Admin não tem campo de imagem/avatar
                        },
                        publishedAt: post.publishedAt,
                        readTime: parseInt(post.readTime) || 5
                      }}
                      variant="default"
                    />
                  ))}
                </div>

                {/* Paginação */}
                <div className="flex justify-center">
                  <Button variant="outline" className="mr-2">Anterior</Button>
                  <Button variant="outline" className="mr-2">1</Button>
                  <Button variant="default" className="mr-2">2</Button>
                  <Button variant="outline" className="mr-2">3</Button>
                  <Button variant="outline">Próxima</Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-8">
                {/* Pesquisa e Categorias */}
                <BlogSidebar 
                  categories={categories.map(cat => ({
                    id: cat.id,
                    name: cat.name,
                    slug: cat.slug,
                    postCount: cat.count
                  }))}
                  popularPosts={posts.slice(0, 4).map(post => ({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    coverImage: post.coverImage,
                    category: post.category.name,
                    tags: post.tags,
                    author: post.author,
                    publishedAt: post.publishedAt,
                    readTime: parseInt(post.readTime) || 5
                  }))}
                  /* Removido o event handler onSearch pois não é possível passar funções 
                     como props de Server Components para Client Components no Next.js */
                />
                
                {/* Newsletter */}
                <NewsletterCard />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
