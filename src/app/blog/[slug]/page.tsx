"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Heart, ChevronRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BlogPost, PostCard } from '@/components/blog/post-card';
import { NewsletterCard } from '@/components/blog/newsletter-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);

  // Efeito para carregar o post com base no slug
  useEffect(() => {
    const fetchPost = async () => {
      if (params.slug) {
        try {
          const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
          
          // Buscar o post real do banco de dados via API
          const response = await fetch(`/api/blog/posts/by-slug?slug=${slug}`);
          
          if (!response.ok) {
            throw new Error(`Erro ao buscar post: ${response.status}`);
          }
          
          const data = await response.json();
          if (data.post) {
            // Formatar o post para o formato esperado pelo componente
            const formattedPost: BlogPost = {
              id: data.post.id,
              title: data.post.title,
              slug: data.post.slug,
              excerpt: data.post.excerpt || '',
              content: data.post.content,
              coverImage: data.post.coverImage || '',
              category: data.post.category?.name || 'Sem categoria',
              tags: data.post.tags?.map(tag => tag.name || tag) || [],
              author: {
                name: data.post.author?.name || 'Autor desconhecido',
                avatar: ''
              },
              publishedAt: data.post.publishedAt || new Date().toISOString(),
              readTime: '5 min'
            };
            
            setPost(formattedPost);
            
            // Buscar posts relacionados
            const relatedResponse = await fetch('/api/blog/posts?limit=3');
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              const relatedPosts = relatedData.posts
                .filter(p => p.id !== data.post.id)
                .map(p => ({
                  id: p.id,
                  title: p.title,
                  slug: p.slug,
                  excerpt: p.excerpt || '',
                  content: p.content,
                  coverImage: p.coverImage || '',
                  category: p.category?.name || 'Sem categoria',
                  tags: p.tags?.map(tag => tag.name || tag) || [],
                  author: {
                    name: p.author?.name || 'Autor desconhecido',
                    avatar: ''
                  },
                  publishedAt: p.publishedAt || new Date().toISOString(),
                  readTime: '5 min'
                }));
              
              setRelatedPosts(relatedPosts);
            }
            
            // Scroll para o topo ao carregar um novo post
            window.scrollTo(0, 0);
          }
        } catch (error) {
          console.error('Erro ao buscar post:', error);
          toast.error('Não foi possível carregar o artigo. Tente novamente mais tarde.');
        }
      }
    };
    
    fetchPost();
  }, [params.slug]);

  // Handler para compartilhar o post
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || 'Artigo Tappy',
        text: post?.excerpt || '',
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  // Handler para copiar o link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyLinkSuccess(true);
    
    setTimeout(() => {
      setCopyLinkSuccess(false);
    }, 2000);
  };

  // Formatador de data para exibição
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Exibir mensagem se o post não for encontrado
  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-6">Artigo não encontrado</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link href="/blog">
              <Button className="rounded-full bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Hero do artigo */}
        <section 
          className="relative py-16 md:py-24 overflow-hidden border-b border-gray-200 dark:border-gray-800"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        >
          {/* Gradiente overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          
          <div className="container relative z-10 mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Link para voltar ao blog */}
              <Link 
                href="/blog"
                className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-tappyGreen mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o blog
              </Link>
              
              {/* Categoria */}
              <div className="mb-4">
                <Badge className="bg-tappyGreen/90 text-black px-3 py-1 rounded-full">
                  {post.category}
                </Badge>
              </div>
              
              {/* Título do post */}
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Metadados do post */}
              <div className="flex flex-wrap items-center mb-8 gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full mr-3 object-cover border-2 border-white dark:border-gray-800"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-xs">
                      Autor
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center ml-auto mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime} min de leitura</span>
                </div>
              </div>
              
              {/* Imagem de capa */}
              <motion.div 
                className="rounded-xl overflow-hidden shadow-xl mb-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full object-cover h-[300px] md:h-[500px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Conteúdo do artigo */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Botões de ação lateral em desktop */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 flex flex-col items-center space-y-4">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full transition-colors ${
                    isLiked 
                      ? 'bg-rose-100 text-rose-500 dark:bg-rose-900/20 dark:text-rose-400' 
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full transition-colors ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400' 
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:text-blue-500'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                
                <button 
                  onClick={handleShare}
                  className="p-3 rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:text-tappyGreen transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={handleCopyLink}
                  className="p-3 rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:text-tappyGreen transition-colors relative"
                >
                  <Copy className="h-5 w-5" />
                  
                  {/* Tooltip de sucesso */}
                  {copyLinkSuccess && (
                    <motion.div 
                      className="absolute left-full ml-2 whitespace-nowrap px-2 py-1 rounded bg-tappyGreen text-xs font-medium text-black"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Link copiado!
                    </motion.div>
                  )}
                </button>
              </div>
            </div>
            
            {/* Conteúdo principal */}
            <div className="lg:col-span-8">
              <motion.article 
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-tappyGreen prose-a:no-underline hover:prose-a:underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Conteúdo real do post */}
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                  className="blog-content"
                />
                
                {/* Estilos adicionais para melhorar a renderização do conteúdo HTML */}
                <style jsx global>{`
                  .blog-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1.5rem 0;
                  }
                  
                  .blog-content a {
                    color: #25D366;
                    text-decoration: none;
                  }
                  
                  .blog-content a:hover {
                    text-decoration: underline;
                  }
                  
                  .blog-content blockquote {
                    border-left: 4px solid #25D366;
                    padding-left: 1rem;
                    font-style: italic;
                    color: rgba(107, 114, 128, 1);
                  }
                  
                  .blog-content pre {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 0.375rem;
                    padding: 1rem;
                    overflow-x: auto;
                  }
                  
                  .dark .blog-content pre {
                    background: rgba(255, 255, 255, 0.1);
                  }
                `}</style>
                
                <p>
                  Se você ainda não está aproveitando todo o potencial das soluções Tappy, este é o momento ideal para começar. Seu negócio agradecerá, e seus resultados mostrarão que essa foi uma das melhores decisões estratégicas que você poderia tomar.
                </p>
              </motion.article>
              
              {/* Tags */}
              <div className="mt-12 mb-8 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline" 
                    className="rounded-full px-3 py-1 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-tappyGreen/10 hover:text-tappyGreen transition-colors cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              {/* Botões de ação em mobile */}
              <div className="flex items-center justify-between mt-8 p-4 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 lg:hidden">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked 
                        ? 'bg-rose-100 text-rose-500 dark:bg-rose-900/20 dark:text-rose-400' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-full transition-colors ${
                      isBookmarked 
                        ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopyLink}
                    className="p-2 rounded-full text-gray-400 dark:text-gray-500 relative"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="p-2 rounded-full text-gray-400 dark:text-gray-500"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Autor */}
              <motion.div 
                className="mt-12 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-900"
                  />
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {post.author.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      Especialista em soluções digitais e tecnologia. Com mais de 10 anos de experiência no mercado, tem ajudado empresas de todos os tamanhos a transformar sua presença digital e aumentar seus resultados.
                    </p>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-full text-xs px-3 border-gray-200 dark:border-gray-700"
                      >
                        Ver perfil
                      </Button>
                      
                      <Button 
                        size="sm"
                        className="rounded-full text-xs px-3 bg-tappyGreen hover:bg-tappyGreen/90 text-black"
                      >
                        Seguir
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Newsletter */}
              <div className="mt-16">
                <NewsletterCard />
              </div>
            </div>
            
            {/* Sidebar com posts relacionados */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Posts relacionados
                </h3>
                
                <div className="space-y-6">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((relatedPost, index) => (
                      <PostCard 
                        key={relatedPost.id}
                        post={relatedPost}
                        variant="minimal"
                        index={index}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Nenhum post relacionado encontrado.
                    </p>
                  )}
                </div>
                
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-tappyGreen hover:text-tappyGreen/80 font-medium mt-6 text-sm group"
                >
                  Ver todos os artigos
                  <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
