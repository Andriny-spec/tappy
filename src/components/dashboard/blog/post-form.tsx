'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader, Image, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

// Definição do esquema de validação com Zod
const postSchema = z.object({
  title: z.string().min(3, 'O título precisa ter pelo menos 3 caracteres').max(100, 'O título não pode ter mais de 100 caracteres'),
  slug: z.string().min(3, 'A slug precisa ter pelo menos 3 caracteres').max(100, 'A slug não pode ter mais de 100 caracteres')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'A slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().max(300, 'A descrição não pode ter mais de 300 caracteres').optional(),
  content: z.string().min(10, 'O conteúdo precisa ter pelo menos 10 caracteres'),
  coverImage: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  categoryId: z.string().optional(),
  publishedAt: z.date().optional(),
  seoScore: z.number().min(0).max(100).default(0),
});

type PostFormValues = z.infer<typeof postSchema>;

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface PostFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: PostFormValues & { id?: string };
  categories: Category[];
  tags: Tag[];
}

export function PostForm({
  open,
  onOpenChange,
  post,
  categories = [],
  tags = []
}: PostFormProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);
  const [isUploading, setIsUploading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({
    title: '',
    excerpt: '',
    content: '',
  });

  // Inicializar form com valores padrão ou do post existente
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: post || {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      status: 'DRAFT',
      categoryId: '',
      seoScore: 0,
    }
  });

  // Gerar slug a partir do título automaticamente (se não for um post existente)
  useEffect(() => {
    const title = form.watch('title');
    if (title && !post?.id) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
      form.setValue('slug', generatedSlug);
    }
  }, [form.watch('title'), form, post?.id]);

  // Função para lidar com o envio do formulário
  const onSubmit = async (values: PostFormValues) => {
    try {
      const endpoint = post?.id ? `/api/blog/posts/${post.id}` : '/api/blog/posts';
      
      const response = await fetch(endpoint, {
        method: post?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          tags: selectedTags,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao salvar o post');
      }
      
      toast.success(post?.id ? 'Post atualizado com sucesso!' : 'Post criado com sucesso!');
      onOpenChange(false);
      // Aqui você pode adicionar uma função de callback para atualizar a lista
    } catch (error) {
      console.error('Erro ao salvar o post:', error);
      toast.error('Ocorreu um erro ao salvar o post');
    }
  };

  // Função para gerar conteúdo com IA
  const generateAiContent = async (type: 'title' | 'excerpt' | 'content') => {
    setIsAiGenerating(true);
    try {
      const currentTitle = form.getValues('title');
      const currentExcerpt = form.getValues('excerpt');
      
      let prompt = '';
      
      switch (type) {
        case 'title':
          prompt = `Gere um título atrativo para um blog post sobre ${currentExcerpt || 'tecnologia e automação para empresas'}.`;
          break;
        case 'excerpt':
          prompt = `Crie uma descrição curta e atrativa (máximo 200 caracteres) para um blog post intitulado "${currentTitle || 'Automação de processos para empresas'}".`;
          break;
        case 'content':
          prompt = `Crie um conteúdo completo de blog post sobre "${currentTitle || 'Automação de processos'}" com pelo menos 3 seções, incluindo introdução e conclusão. O conteúdo deve ter formatação Markdown com títulos, subtítulos, listas e destaques. Inclua exemplos práticos e dicas úteis.`;
          break;
      }
      
      const response = await fetch('/api/ai/blog-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type }),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao gerar conteúdo com IA');
      }
      
      const data = await response.json();
      
      // Atualizar o estado de sugestões de IA
      setAiSuggestions(prev => ({
        ...prev,
        [type]: data.content
      }));
      
      // Aplicar automaticamente a sugestão
      form.setValue(type, data.content);
      
      toast.success(`${type === 'title' ? 'Título' : type === 'excerpt' ? 'Descrição' : 'Conteúdo'} gerado com sucesso!`);
    } catch (error) {
      console.error('Erro ao gerar conteúdo com IA:', error);
      toast.error('Ocorreu um erro ao gerar conteúdo com IA');
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post?.id ? 'Editar' : 'Criar'} Post</DialogTitle>
          <DialogDescription>
            Preencha os dados do post para o blog da Tappy
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="publicacao">Publicação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Título</FormLabel>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="outline"
                            onClick={() => generateAiContent('title')}
                            disabled={isAiGenerating}
                            className="h-8"
                          >
                            {isAiGenerating ? (
                              <Loader className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Sparkles className="h-4 w-4 mr-2" />
                            )}
                            Gerar com IA
                          </Button>
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="Digite o título do post" className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="titulo-do-post" className="w-full" />
                        </FormControl>
                        <FormDescription>
                          A slug é usada na URL do post (ex: tappy.id/blog/titulo-do-post)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Descrição</FormLabel>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="outline"
                            onClick={() => generateAiContent('excerpt')}
                            disabled={isAiGenerating}
                            className="h-8"
                          >
                            {isAiGenerating ? (
                              <Loader className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Sparkles className="h-4 w-4 mr-2" />
                            )}
                            Gerar com IA
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea 
                            {...field}
                            placeholder="Digite uma breve descrição do post"
                            className="min-h-[80px]"
                          />
                        </FormControl>
                        <FormDescription>
                          Máximo de 300 caracteres. Esta descrição será exibida na listagem de posts.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem de Capa</FormLabel>
                        <div className="flex items-start gap-4">
                          <div className="w-40 h-24 bg-muted rounded flex items-center justify-center overflow-hidden">
                            {field.value ? (
                              <img 
                                src={field.value} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <Image className="h-8 w-8 text-muted-foreground/50" />
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="URL da imagem (ex: https://exemplo.com/imagem.jpg)"
                                className="w-full"
                              />
                            </FormControl>
                            <div className="flex gap-2">
                              <Button 
                                type="button" 
                                variant="outline"
                                size="sm"
                                disabled={isUploading}
                                className="h-8"
                              >
                                {isUploading ? (
                                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <Image className="h-4 w-4 mr-2" />
                                )}
                                Upload de Imagem
                              </Button>
                            </div>
                          </div>
                        </div>
                        <FormDescription>
                          Recomendado: 1200 x 630px. Formatos aceitos: JPG, PNG.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Conteúdo</FormLabel>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="outline"
                            onClick={() => generateAiContent('content')}
                            disabled={isAiGenerating}
                            className="h-8"
                          >
                            {isAiGenerating ? (
                              <Loader className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Sparkles className="h-4 w-4 mr-2" />
                            )}
                            Gerar com IA
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea 
                            {...field}
                            placeholder="Conteúdo do post em formato Markdown"
                            className="min-h-[300px] font-mono text-sm"
                          />
                        </FormControl>
                        <FormDescription>
                          Use Markdown para formatar o conteúdo. Suporta títulos, listas, links e imagens.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="seoScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Pontuação SEO: {field.value}
                        </FormLabel>
                        <div className="flex items-center gap-4">
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <span className={`text-lg font-bold ${
                            field.value < 50 ? 'text-red-500' : 
                            field.value < 80 ? 'text-yellow-500' : 
                            'text-green-500'
                          }`}>
                            {field.value}
                          </span>
                        </div>
                        
                        <Alert className={`mt-4 ${
                          field.value < 50 ? 'border-red-500' : 
                          field.value < 80 ? 'border-yellow-500' : 
                          'border-green-500'
                        }`}>
                          <AlertCircle className={`h-4 w-4 ${
                            field.value < 50 ? 'text-red-500' : 
                            field.value < 80 ? 'text-yellow-500' : 
                            'text-green-500'
                          }`} />
                          <AlertTitle>
                            {field.value < 50 ? 'SEO fraco' : 
                             field.value < 80 ? 'SEO médio' : 
                             'SEO forte'}
                          </AlertTitle>
                          <AlertDescription>
                            {field.value < 50 ? 
                              'Seu post precisa de melhorias para ter melhor desempenho nos motores de busca.' : 
                              field.value < 80 ? 
                              'Seu post tem potencial, mas pode melhorar em alguns aspectos de SEO.' : 
                              'Seu post está bem otimizado para os motores de busca!'}
                          </AlertDescription>
                        </Alert>
                        
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium">Dicas para melhorar o SEO:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Use palavras-chave relevantes no título e descrição</li>
                            <li>Adicione imagens com texto alternativo</li>
                            <li>Crie conteúdo original e de qualidade</li>
                            <li>Adicione links internos e externos relevantes</li>
                            <li>Use subtítulos (H2, H3) para organizar o conteúdo</li>
                          </ul>
                        </div>
                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="publicacao" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Sem categoria</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Escolha a categoria principal do post
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Tags</FormLabel>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (selectedTags.includes(tag.id)) {
                              setSelectedTags(selectedTags.filter(id => id !== tag.id));
                            } else {
                              setSelectedTags([...selectedTags, tag.id]);
                            }
                          }}
                        >
                          {tag.name}
                          {selectedTags.includes(tag.id) && (
                            <CheckCircle className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                      {tags.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Nenhuma tag disponível. Crie tags para categorizar seus posts.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DRAFT">Rascunho</SelectItem>
                            <SelectItem value="PUBLISHED">Publicado</SelectItem>
                            <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Apenas posts com status "Publicado" serão exibidos no blog
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
              >
                {post?.id ? 'Atualizar' : 'Criar'} Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
