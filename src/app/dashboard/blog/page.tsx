'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Toaster } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  PlusCircle, 
  Calendar,
  CheckCircle,
  XCircle,
  Mail,
  Clock,
  Filter,
  AlertTriangle,
  RefreshCcw,
  Loader,
  MoreHorizontal,
  Eye,
  Edit,
  FileEdit,
  Trash,
  FileText,
  Bookmark,
  Image,
  Tag,
  Share2,
  ArrowUpRight,
  Upload,
  Wand,
  Sparkles,
  Pencil,
  BarChart
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Tipo para os posts do blog
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status: string;
  publishedAt?: Date;
  authorName: string;
  categoryName?: string;
  categoryId?: string;
  views: number;
  coverImage?: string;
  createdAt: Date;
  seoScore?: number;
  tags?: any[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  // Modal de criação/edição
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostExcerpt, setNewPostExcerpt] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [postTags, setPostTags] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [seoScore, setSeoScore] = useState(0);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [newPostId, setNewPostId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState('');
  
  // States para IA e uploads
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{title?: string; excerpt?: string; tags?: string[]}>({});
  const [isUploading, setIsUploading] = useState(false);
  
  // Tag temporária
  const [currentTag, setCurrentTag] = useState('');
  
  // Modal de sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Modal de confirmação de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      console.log('Iniciando busca de posts...');
      
      // Buscar posts reais da API
      const response = await fetch('/api/blog/posts');
      console.log('Status da resposta da API:', response.status);
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar posts: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos da API:', data);
      
      const fetchedPosts = data.posts || [];
      console.log(`Encontrados ${fetchedPosts.length} posts na API`);
      
      // Formatar os posts para o formato esperado pelo componente
      const formattedPosts = fetchedPosts.map((post: any) => {
        console.log('Processando post:', post.id, post.title);
        return {
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          status: post.status || 'DRAFT', // Default para DRAFT se não especificado
          publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
          authorName: post.author?.name || 'Desconhecido',
          categoryName: post.category?.name || '',
          views: post.views || 0,
          coverImage: post.coverImage || '',
          createdAt: new Date(post.createdAt || Date.now()),
          seoScore: post.seoScore || 0, // Adicionar o seoScore aqui
        };
      });
      
      console.log('Posts formatados:', formattedPosts);
      setPosts(formattedPosts);
      console.log('Estado posts atualizado');
      
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      toast.error('Erro ao carregar os posts do blog');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    console.log('useEffect inicial executando fetchPosts');
    fetchPosts();
  }, []);
  
  // Force o reload dos posts quando o componente montar
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Tentando forçar fetchPosts após 2 segundos');
      fetchPosts();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calcular score de SEO com base nos campos preenchidos
  useEffect(() => {
    if (!isCreateModalOpen) return;
    
    let score = 0;
    const maxScore = 100;
    
    // Título (25 pontos)
    if (newPostTitle) {
      // Base: até 10 pontos pelo preenchimento
      score += 10;
      
      // Comprimento ideal entre 40 e 60 caracteres (até 15 pontos adicionais)
      const titleLength = newPostTitle.length;
      if (titleLength >= 40 && titleLength <= 60) {
        score += 15;
      } else if (titleLength >= 30 && titleLength <= 70) {
        score += 10;
      } else if (titleLength >= 20 && titleLength <= 80) {
        score += 5;
      }
    }
    
    // Resumo (20 pontos)
    if (newPostExcerpt) {
      // Base: até 10 pontos pelo preenchimento
      score += 10;
      
      // Comprimento ideal entre 120 e 160 caracteres (até 10 pontos adicionais)
      const excerptLength = newPostExcerpt.length;
      if (excerptLength >= 120 && excerptLength <= 160) {
        score += 10;
      } else if (excerptLength >= 100 && excerptLength <= 180) {
        score += 7;
      } else if (excerptLength >= 80 && excerptLength <= 200) {
        score += 4;
      }
    }
    
    // Categoria (15 pontos)
    if (selectedCategory) {
      score += 15;
    }
    
    // Tags (20 pontos)
    if (postTags.length > 0) {
      // 4 pontos por tag, até 5 tags (20 pontos)
      score += Math.min(postTags.length, 5) * 4;
    }
    
    // Thumbnail (20 pontos)
    if (thumbnailUrl) {
      score += 20;
    }
    
    // Animar a atualização do score
    const currentScore = seoScore;
    const targetScore = Math.min(score, maxScore);
    
    // Animação suave do score
    let frame = 0;
    const framesTotal = 15;
    const animate = () => {
      if (frame < framesTotal) {
        const newScore = currentScore + (targetScore - currentScore) * (frame / framesTotal);
        setSeoScore(Math.round(newScore));
        frame++;
        requestAnimationFrame(animate);
      } else {
        setSeoScore(targetScore);
      }
    };
    
    animate();
  }, [isCreateModalOpen, newPostTitle, newPostExcerpt, selectedCategory, postTags, thumbnailUrl]);

  // Manipuladores para o modal e formulário
  const handleCreatePost = () => {
    // Reset dos campos para novo post
    setNewPostTitle('');
    setNewPostExcerpt('');
    setNewPostContent('');
    setSelectedCategory('');
    setPostTags([]);
    setThumbnailUrl('');
    setSeoScore(0);
    setAiSuggestions({});
    setIsEditMode(false);
    setCurrentPostId('');
    
    setIsCreateModalOpen(true);
  };
  
  // Função para editar post
  const handleEditPost = (post: BlogPost) => {
    console.log('Editando post:', post);
    setIsEditMode(true);
    setCurrentPostId(post.id);
    setNewPostTitle(post.title);
    setNewPostExcerpt(post.excerpt || '');
    setNewPostContent(post.content || '');
    setSelectedCategory(post.categoryId || '');
    setPostTags(post.tags?.map((tag: any) => tag.name || tag) || []);
    setThumbnailUrl(post.coverImage || '');
    setSeoScore(post.seoScore || 0);
    
    setIsCreateModalOpen(true);
  };
  
  // Função para visualizar post
  const handleViewPost = (slug: string) => {
    window.open(`/blog/${slug}`, '_blank');
  };
  
  // Função para abrir modal de confirmação de exclusão
  const handleDeleteConfirmation = (postId: string) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };
  
  // Função para excluir post
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    try {
      const response = await fetch(`/api/blog/posts/${postToDelete}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao excluir post: ${response.status}`);
      }
      
      toast.success('Post excluído com sucesso!');
      fetchPosts(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      toast.error('Ocorreu um erro ao excluir o post');
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };
  
  // Função para alterar status do post (publicar/despublicar)
  const handleTogglePublishStatus = async (post: BlogPost) => {
    try {
      const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
      
      const response = await fetch(`/api/blog/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
      }
      
      toast.success(
        newStatus === 'PUBLISHED' 
          ? 'Post publicado com sucesso!' 
          : 'Post movido para rascunhos'
      );
      
      fetchPosts(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Ocorreu um erro ao atualizar o status do post');
    }
  };
  
  const handleSavePost = async () => {
    if (!newPostTitle.trim()) return;
    
    try {
      setIsSavingPost(true);
      console.log('Salvando post. Modo edição:', isEditMode, 'ID atual:', currentPostId);
      
      // Preparar dados do post para enviar para a API
      const postData = {
        title: newPostTitle,
        excerpt: newPostExcerpt,
        content: newPostContent || `<p>${newPostExcerpt}</p>`, // Conteúdo inicial ou existente
        coverImage: thumbnailUrl,
        status: 'DRAFT', // Começa como rascunho ou mantém o status atual
        seoScore: seoScore,
        categoryId: selectedCategory || undefined, // Incluir categoria se selecionada
        tags: postTags.map(tag => ({ name: tag })) // Formatar tags para API
      };
      
      console.log('Dados a serem enviados:', postData);
      
      // Fazer chamada real à API - POST para criar, PATCH para atualizar
      const url = isEditMode 
        ? `/api/blog/posts/${currentPostId}` 
        : '/api/blog/posts';
      
      const method = isEditMode ? 'PATCH' : 'POST';
      
      console.log(`Fazendo requisição ${method} para ${url}`);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} post: ${response.status}`);
      }
      
      const result = await response.json();
      console.log(`Post ${isEditMode ? 'atualizado' : 'criado'} com sucesso:`, result);
      
      // Pegar o ID do post criado/atualizado
      setNewPostId(result.post.id);
      
      // Fechar modal de criação/edição e mostrar modal de sucesso
      setIsCreateModalOpen(false);
      setShowSuccessModal(true);
      
      // Limpar formulário
      setNewPostTitle('');
      setNewPostExcerpt('');
      setNewPostContent('');
      setSelectedCategory('');
      setThumbnailUrl('');
      setPostTags([]);
      setSeoScore(0);
      setAiSuggestions({});
      setIsEditMode(false);
      setCurrentPostId('');
      
      // Atualizar a lista de posts
      fetchPosts();
      
      toast.success(
        isEditMode 
          ? 'Post atualizado com sucesso!' 
          : 'Post criado com sucesso!'
      );
      
    } catch (error) {
      console.error(`Erro ao ${isEditMode ? 'atualizar' : 'criar'} post:`, error);
      toast.error(`Ocorreu um erro ao ${isEditMode ? 'atualizar' : 'criar'} o post. Tente novamente.`);
    } finally {
      setIsSavingPost(false);
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Criar nome de arquivo único baseado em timestamp e nome original
      const timestamp = Date.now();
      const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, "-").toLowerCase();
      const fileName = `${timestamp}-${originalName}`;
      
      // Simular o processo de upload (em produção seria uma chamada de API real)
      // Em um ambiente real, isso enviaria para o servidor e salvaria em /public/thumbs
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação do upload
      
      // Criar URL para preview (em produção seria o caminho real após upload)
      const imagePath = `/thumbs/${fileName}`;  // Caminho que seria /public/thumbs no servidor
      
      // Criar URL para preview local temporário (porque não estamos fazendo upload real agora)
      const previewUrl = URL.createObjectURL(file);
      
      // Definir o URL da thumbnail (em produção, usaria imagePath)
      setThumbnailUrl(previewUrl);
      
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      toast.error("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Não publicado';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return (
          <Badge className="bg-green-500/80 hover:bg-green-500/90">
            <CheckCircle className="h-3 w-3 mr-1" /> Publicado
          </Badge>
        );
      case 'DRAFT':
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            <FileEdit className="h-3 w-3 mr-1" /> Rascunho
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredPosts = useMemo(() => {
    console.log('Posts disponíveis para filtrar:', posts);
    
    return posts.filter((post) => {
      // Filtrar por status
      if (statusFilter !== 'todos' && post.status !== statusFilter) {
        return false;
      }
      
      // Se não houver termo de busca, retornar todos
      if (!searchQuery.trim()) {
        return true;
      }
      
      // Filtrar pelo termo de busca (case insensitive)
      const search = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(search) ||
        (post.excerpt?.toLowerCase() || '').includes(search) ||
        post.slug.toLowerCase().includes(search)
      );
    });
  }, [posts, searchQuery, statusFilter]);

  return (
    <div className="p-6 space-y-6">
      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Post Criado com Sucesso!</h2>
            <p className="text-muted-foreground mb-6">
              Seu post foi salvo e está pronto para ser publicado quando desejar.
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccessModal(false);
                  fetchPosts(); // Atualizar a lista de posts
                }}
              >
                Voltar para Lista
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
                onClick={() => {
                  setShowSuccessModal(false);
                  // Redirecionar para a página de edição do post
                  window.location.href = `/dashboard/blog/edit/${newPostId}`;
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Post
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Criação */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Criar Novo Post</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCreateModalOpen(false)}>
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Coluna Esquerda - Informações Básicas */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="title">Título</label>
                  <div className="relative">
                    <Input 
                      id="title" 
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="Digite o título do post" 
                      className="pr-10"
                    />
                    {aiSuggestions.title && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 p-1 text-xs text-green-600"
                        onClick={() => setNewPostTitle(aiSuggestions.title || '')}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" /> Usar
                      </Button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="excerpt">Resumo</label>
                  <div className="relative">
                    <textarea 
                      id="excerpt" 
                      value={newPostExcerpt}
                      onChange={(e) => setNewPostExcerpt(e.target.value)}
                      placeholder="Breve resumo do conteúdo" 
                      className="w-full min-h-[120px] px-3 py-2 border rounded-md resize-none"
                    />
                    {aiSuggestions.excerpt && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-2 bottom-2 h-6 p-1 text-xs text-green-600"
                        onClick={() => setNewPostExcerpt(aiSuggestions.excerpt || '')}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" /> Usar
                      </Button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-10 px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="marketing-digital">Marketing Digital</option>
                    <option value="automacao">Automação</option>
                    <option value="vendas">Vendas</option>
                    <option value="integrações">Integrações</option>
                    <option value="casos-de-sucesso">Casos de Sucesso</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {postTags.map((tag, index) => (
                      <Badge key={index} className="px-2 py-1 bg-primary/80 hover:bg-primary flex items-center gap-1">
                        {tag}
                        <XCircle 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setPostTags(postTags.filter((_, i) => i !== index))}
                        />
                      </Badge>
                    ))}
                    {aiSuggestions.tags && aiSuggestions.tags.map((tag, index) => (
                      <Badge 
                        key={`suggestion-${index}`} 
                        variant="outline"
                        className="px-2 py-1 border-green-500 text-green-700 dark:text-green-400 flex items-center gap-1 cursor-pointer"
                        onClick={() => setPostTags([...postTags, tag])}
                      >
                        {tag}
                        <PlusCircle className="h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Digite uma tag" 
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && currentTag.trim()) {
                          setPostTags([...postTags, currentTag.trim()]);
                          setCurrentTag('');
                          e.preventDefault();
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if (currentTag.trim()) {
                          setPostTags([...postTags, currentTag.trim()]);
                          setCurrentTag('');
                        }
                      }}
                    >
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Coluna Direita - Thumbnail e IA */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Thumbnail</label>
                  <div className="border rounded-md p-4 bg-muted/20 flex flex-col items-center justify-center">
                    {thumbnailUrl ? (
                      <div className="relative w-full">
                        <img 
                          src={thumbnailUrl} 
                          alt="Thumbnail preview" 
                          className="w-full h-44 object-cover rounded-md" 
                        />
                        <Button 
                          variant="destructive" 
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 rounded-full" 
                          onClick={() => setThumbnailUrl('')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Image className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-4">Nenhuma imagem selecionada</p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <Loader className="h-4 w-4 mr-2 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Selecionar Imagem
                            </>
                          )}
                        </Button>
                        <Input 
                          placeholder="Ou cole a URL da imagem" 
                          className="mt-4" 
                          onChange={(e) => setThumbnailUrl(e.target.value)}
                        />
                      </>
                    )}
                  </div>
                </div>
                
                {/* SEO Score Meter */}
                <div className="border rounded-md p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <h3 className="font-medium">Score SEO</h3>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{seoScore}</span>
                      <span className="text-xs text-muted-foreground">/100</span>
                    </div>
                  </div>
                  
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ease-out ${seoScore < 40 ? 'bg-red-500' : seoScore < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${seoScore}%` }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${newPostTitle.length >= 30 ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>Título: {newPostTitle ? `${newPostTitle.length}/60` : '0/60'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${newPostExcerpt.length >= 100 ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>Resumo: {newPostExcerpt ? `${newPostExcerpt.length}/160` : '0/160'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${selectedCategory ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>Categoria</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${postTags.length >= 3 ? 'bg-green-500' : postTags.length > 0 ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                      <span>Tags: {postTags.length}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${thumbnailUrl ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>Thumbnail</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${seoScore >= 70 ? 'bg-green-500' : seoScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="font-medium">SEO Score: {seoScore >= 70 ? 'Bom' : seoScore >= 40 ? 'Médio' : 'Baixo'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center mb-3">
                    <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    <h3 className="font-medium">Sugestões com IA</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Use inteligência artificial para gerar sugestões de conteúdo com base no título ou tema do seu post.
                  </p>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                      disabled={isGeneratingAI || !newPostTitle}
                      onClick={() => {
                        setIsGeneratingAI(true);
                        // Simulando resposta da IA
                        setTimeout(() => {
                          setAiSuggestions({
                            excerpt: `Descubra como ${newPostTitle.toLowerCase()} pode transformar a forma como sua empresa aborda marketing e conversão de leads. Neste artigo, exploramos estratégias práticas e casos reais.`,
                            tags: ['marketing', 'estratégia', 'conversão', 'tappy']
                          });
                          setIsGeneratingAI(false);
                        }, 2000);
                      }}
                    >
                      {isGeneratingAI ? (
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Wand className="h-4 w-4 mr-2" />
                      )}
                      Gerar resumo e tags
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                      disabled={isGeneratingAI || !newPostExcerpt}
                      onClick={() => {
                        setIsGeneratingAI(true);
                        // Simulando resposta da IA
                        setTimeout(() => {
                          setAiSuggestions(prev => ({
                            ...prev,
                            title: `Como ${newPostExcerpt.split(' ').slice(0, 5).join(' ')} em 2025`
                          }));
                          setIsGeneratingAI(false);
                        }, 1500);
                      }}
                    >
                      {isGeneratingAI ? (
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Wand className="h-4 w-4 mr-2" />
                      )}
                      Sugerir título
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancelar
              </Button>
              <Button 
                onClick={handleSavePost}
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
                disabled={!newPostTitle.trim() || isSavingPost}
              >
                {isSavingPost ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    Criar e Salvar Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-muted-foreground">Gerencie os posts do blog da Tappy</p>
        </div>
        <Button onClick={handleCreatePost} className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Post
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar posts..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs 
            defaultValue="todos" 
            className="w-full sm:w-auto" 
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="PUBLISHED">Publicados</TabsTrigger>
              <TabsTrigger value="DRAFT">Rascunhos</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={fetchPosts}
            disabled={loading}
          >
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Posts do Blog</CardTitle>
          <CardDescription>
            {filteredPosts.length === 0 
              ? 'Nenhum post encontrado. Crie um novo post para começar.' 
              : `${filteredPosts.length} post${filteredPosts.length > 1 ? 's' : ''} encontrado${filteredPosts.length > 1 ? 's' : ''}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">Nenhum post encontrado</h3>
              <p className="text-muted-foreground mt-1">
                Comece criando seu primeiro post para o blog.
              </p>
              <Button 
                onClick={handleCreatePost} 
                className="mt-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Post
              </Button>
            </div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>SEO</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Visualizações</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {post.coverImage ? (
                            <div className="h-10 w-14 rounded overflow-hidden bg-muted flex items-center justify-center">
                              <img 
                                src={post.coverImage} 
                                alt={post.title} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-14 rounded overflow-hidden bg-muted flex items-center justify-center">
                              <Image className="h-4 w-4 text-muted-foreground/50" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-xs text-muted-foreground">{post.slug}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell>{post.categoryName || 'Sem categoria'}</TableCell>
                      <TableCell>
                        <div className="w-full max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getSeoScoreColor(post.seoScore || 0)}`}
                            style={{ width: `${post.seoScore || 0}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-center mt-1">{post.seoScore || 0}%</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditPost(post)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar post
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewPost(post.slug)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar post
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {post.status === 'DRAFT' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-green-500 hover:text-green-600"
                                onClick={() => handleTogglePublishStatus(post)}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Publicar
                              </DropdownMenuItem>
                            )}
                            {post.status === 'PUBLISHED' && (
                              <DropdownMenuItem 
                                className="cursor-pointer text-yellow-500 hover:text-yellow-600"
                                onClick={() => handleTogglePublishStatus(post)}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                Voltar para rascunho
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              className="cursor-pointer text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteConfirmation(post.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Excluir post
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de criação/edição de post - será implementado como componente separado */}
      
      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirmar exclusão</h3>
            <p className="mb-6">Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.</p>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setPostToDelete(null);
                }}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeletePost}
              >
                <Trash className="h-4 w-4 mr-2" />
                Excluir permanentemente
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Toaster richColors position="top-right" />
    </div>
  );
}