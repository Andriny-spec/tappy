'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Check, 
  Edit,
  Trash2,
  Users,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Loader,
  Loader2,
  AlertCircle,
  PlusCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { togglePlanStatus, togglePlanHighlight, deletePlan, getPlanById, updatePlan } from '@/lib/actions/plan';
import { getAllPlatforms } from '@/lib/actions/platform';
import { Plan as PrismaBasePlan, Platform } from '@prisma/client';
import { formatCurrency } from '@/lib/utils';

// Estendendo o tipo Plan original para incluir todas as propriedades necessárias
interface Plan extends PrismaBasePlan {
  hasSocialMedia: boolean;
  hasWebsite: boolean;
  hasScheduling: boolean;
  hasAI: boolean;
  hasClientPortal: boolean;
  hasLeadManagement: boolean;
  hasMultiChannel: boolean;
  hasRentalManagement: boolean;
  hasReports: boolean;
  hasSalesTools: boolean;
  hasTeamManagement: boolean;
  isUnlimited: boolean;
  maxUsers: number | null;
  setupFee: number | null;
  benefits: string[];
  features: string[];
  shortDescription: string | null;
}

type PlanWithDetails = Plan & {
  platform: Platform;
  _count: {
    subscribers: number;
  };
};

interface ListaPlanosProps {
  planos: PlanWithDetails[];
  erro: string | null;
}

export default function ListaPlanos({ planos, erro }: ListaPlanosProps) {
  const router = useRouter();
  const [filtroPlataforma, setFiltroPlataforma] = useState<string | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<string | null>(null);
  const [editandoPlano, setEditandoPlano] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<Array<{ id: string, name: string, slug: string }>>([]);
  const [isLoadingPlatforms, setIsLoadingPlatforms] = useState(false);
  const [isGenerating, setIsGenerating] = useState<{description?: boolean, features?: boolean, benefits?: boolean}>({});

  // Carregar as plataformas quando o componente montar
  useEffect(() => {
    async function loadPlatforms() {
      setIsLoadingPlatforms(true);
      try {
        const response = await getAllPlatforms();
        if (response.platforms) {
          setPlatforms(response.platforms);
          // Se houver plataformas, define a primeira como padrão
          if (response.platforms.length > 0) {
            setFormValues(prev => ({
              ...prev,
              platformId: response.platforms[0].id
            }));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar plataformas:', error);
      } finally {
        setIsLoadingPlatforms(false);
      }
    }
    
    loadPlatforms();
  }, []);
  
  const planosFiltrados = filtroPlataforma 
    ? planos.filter(plano => plano.platformId === filtroPlataforma) 
    : planos;

  const handleToggleStatus = async (id: string) => {
    setCarregando(id);
    await togglePlanStatus(id);
    setCarregando(null);
  };

  const handleToggleHighlight = async (id: string) => {
    setCarregando(id);
    await togglePlanHighlight(id);
    setCarregando(null);
  };

  const handleDelete = async (id: string) => {
    try {
      setCarregando(id);
      console.log('Tentando excluir plano:', id);
      
      // Exibir toast inicial para indicar que a operação começou
      toast.loading('Excluindo plano...');
      
      const result = await deletePlan(id);
      console.log('Resposta da API de exclusão:', result);
      
      if (result.success) {
        toast.success('Plano excluído com sucesso!');
        
        // Preservar sessão durante a atualização
        if (typeof window !== 'undefined') {
          // Salvar dados da sessão
          const sessionData = localStorage.getItem('auth_token');
          const lastActivity = localStorage.getItem('last_activity');
          
          // Backup
          if (sessionData) localStorage.setItem('auth_token_backup', sessionData);
          if (lastActivity) localStorage.setItem('last_activity_backup', lastActivity);
          
          // Atualizar a página
          setTimeout(() => {
            // Atualizar a página mantendo a sessão
            const currentPath = window.location.pathname;
            window.location.href = currentPath + '?t=' + new Date().getTime();
            
            // Restaurar sessão após redirecionamento
            window.addEventListener('load', () => {
              const backupSession = localStorage.getItem('auth_token_backup');
              const backupActivity = localStorage.getItem('last_activity_backup');
              
              if (backupSession) {
                localStorage.setItem('auth_token', backupSession);
                localStorage.removeItem('auth_token_backup');
              }
              
              if (backupActivity) {
                localStorage.setItem('last_activity', backupActivity);
                localStorage.removeItem('last_activity_backup');
              }
            });
          }, 1000);
        } else {
          // Fallback para o comportamento anterior
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        console.error('A API retornou erro:', result.error);
        toast.error(result.error || 'Erro ao excluir plano');
      }
    } catch (error) {
      console.error('Erro durante a exclusão do plano:', error);
      toast.error(`Erro ao excluir: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setConfirmarExclusao(null);
      setCarregando(null);
    }
  };
  
  // Função para gerar conteúdo com IA
  const generateWithDeepseek = async (type: 'descrição' | 'recursos' | 'benefícios') => {
    if (!formValues.name) {
      setFormError('Digite o nome do plano para gerar conteúdo');
      return;
    }

    try {
      // Atualizar estado para mostrar o indicador de carregamento
      setIsGenerating(prev => ({ ...prev, [type === 'descrição' ? 'description' : type === 'recursos' ? 'features' : 'benefits']: true }));
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formValues.name,
          type: type,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao gerar conteúdo');
      }
      
      const data = await response.json();
      
      // Atualizar o campo correspondente com o conteúdo gerado
      if (type === 'descrição') {
        setFormValues(prev => ({ ...prev, description: data.content }));
      } else if (type === 'recursos') {
        const resources = data.content.split(';').filter(Boolean);
        setFormValues(prev => ({ ...prev, features: resources }));
      } else if (type === 'benefícios') {
        const benefits = data.content.split(';').filter(Boolean);
        setFormValues(prev => ({ ...prev, benefits: benefits }));
      }
    } catch (error) {
      console.error(`Erro ao gerar ${type}:`, error);
      setFormError(`Falha ao gerar ${type}. Tente novamente.`);
    } finally {
      setIsGenerating(prev => ({ ...prev, [type === 'descrição' ? 'description' : type === 'recursos' ? 'features' : 'benefits']: false }));
    }
  };
  
  // Função para carregar os dados de um plano para edição
  const handleEditarPlano = async (id: string) => {
    try {
      setCarregando(id);
      console.log('Carregando dados do plano para edição:', id);
      
      const response = await getPlanById(id);
      
      if (response.plan) {
        const plano = response.plan;
        console.log('Dados do plano carregados:', plano);
        
        // Converter arrays que podem ser null para arrays vazios
        const features = plano.features || [];
        const benefits = plano.benefits || [];
        
        // Atualizar o formulário com os dados do plano
        setFormValues({
          name: plano.name,
          description: plano.description || '',
          shortDescription: plano.shortDescription || '',
          platformId: plano.platformId,
          price: plano.price,
          interval: plano.interval,
          features: features.length > 0 ? features : [''],
          benefits: benefits.length > 0 ? benefits : [''],
          checkoutLink: plano.checkoutLink || '',
          isActive: plano.isActive,
          isHighlighted: plano.isHighlighted,
          isFeatured: plano.isFeatured,
          displayOrder: plano.displayOrder,
          hasAI: plano.hasAI,
          hasClientPortal: plano.hasClientPortal,
          hasLeadManagement: plano.hasLeadManagement,
          hasMultiChannel: plano.hasMultiChannel,
          hasRentalManagement: plano.hasRentalManagement,
          hasReports: plano.hasReports,
          hasSocialMedia: (plano as any).hasSocialMedia ?? false,
          hasWebsite: (plano as any).hasWebsite ?? false,
          hasScheduling: (plano as any).hasScheduling ?? false,
          setupFee: plano.setupFee || 0,
          hasSalesTools: plano.hasSalesTools,
          hasTeamManagement: plano.hasTeamManagement,
          isUnlimited: plano.isUnlimited,
          maxUsers: plano.maxUsers || 0
        });
        
        // Definir o plano em edição e abrir o modal
        setEditandoPlano(id);
        setIsModalOpen(true);
      } else {
        toast.error('Erro ao carregar o plano: ' + (response.error || 'Plano não encontrado'));
      }
    } catch (error) {
      console.error('Erro ao carregar plano para edição:', error);
      toast.error(`Erro ao carregar plano: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setCarregando(null);
    }
  };
  
  // Função para atualizar um plano existente
  const handleSubmitEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editandoPlano) return;
    
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      // Certificar que a validação do formulário está correta
      if (!formValues.name) {
        setFormError('Nome do plano é obrigatório');
        return;
      }

      // Garantir que todos os campos booleanos estejam presentes
      // para satisfazer o schema do Prisma
      const dadosCompletos = {
        ...formValues,
        hasMultiChannel: formValues.hasMultiChannel || false,
        hasAI: formValues.hasAI || false,
        hasReports: formValues.hasReports || true,
        hasClientPortal: formValues.hasClientPortal || false,
        hasTeamManagement: formValues.hasTeamManagement || false,
        hasLeadManagement: formValues.hasLeadManagement || true,
        hasSalesTools: formValues.hasSalesTools || true,
        hasRentalManagement: formValues.hasRentalManagement || false,
        hasSocialMedia: formValues.hasSocialMedia || false,
        hasWebsite: formValues.hasWebsite || false,
        hasScheduling: formValues.hasScheduling || false,
        isUnlimited: formValues.isUnlimited || false,
        isActive: formValues.isActive || true,
        isHighlighted: formValues.isHighlighted || false,
        isFeatured: formValues.isFeatured || false,
        displayOrder: formValues.displayOrder || 0,
      };
      
      console.log('Atualizando plano:', editandoPlano, dadosCompletos);
      
      const response = await updatePlan(editandoPlano, dadosCompletos);
      
      if (!response.error) {
        toast.success('Plano atualizado com sucesso!');
        setIsModalOpen(false);
        setEditandoPlano(null);
        
        // Preservar a sessão durante a atualização
        if (typeof window !== 'undefined') {
          // Salvar dados da sessão
          const sessionData = localStorage.getItem('auth_token');
          const lastActivity = localStorage.getItem('last_activity');
          
          // Backup
          if (sessionData) localStorage.setItem('auth_token_backup', sessionData);
          if (lastActivity) localStorage.setItem('last_activity_backup', lastActivity);
          
          // Atualizar a página
          setTimeout(() => {
            // Usar um parâmetro de consulta com timestamp para evitar cache
            const currentPath = window.location.pathname;
            window.location.href = currentPath + '?t=' + new Date().getTime();
            
            // Restaurar sessão após redirecionamento
            window.addEventListener('load', () => {
              const backupSession = localStorage.getItem('auth_token_backup');
              const backupActivity = localStorage.getItem('last_activity_backup');
              
              if (backupSession) {
                localStorage.setItem('auth_token', backupSession);
                localStorage.removeItem('auth_token_backup');
              }
              
              if (backupActivity) {
                localStorage.setItem('last_activity', backupActivity);
                localStorage.removeItem('last_activity_backup');
              }
            });
          }, 1000);
        } else {
          // Fallback para o comportamento anterior
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        setFormError(response.error || 'Erro ao atualizar o plano');
      }
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
      setFormError(`Erro ao atualizar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Estado do formulário com valores padrão
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    shortDescription: '',
    platformId: '', // Será definido após carregar as plataformas
    price: 0,
    interval: 'mês', // Valor padrão
    features: [''],
    benefits: [''],
    checkoutLink: '',
    isActive: true,
    isHighlighted: false,
    isFeatured: false,
    displayOrder: 0,
    hasAI: false,
    hasClientPortal: false,
    hasLeadManagement: false,
    hasMultiChannel: false,
    hasRentalManagement: false,
    hasReports: false,
    hasSocialMedia: false,
    hasWebsite: false,
    hasScheduling: false,
    setupFee: 0,
    hasSalesTools: false,
    hasTeamManagement: false,
    isUnlimited: false,
    maxUsers: 0
  });

  // Função para cancelar a edição e limpar o formulário
  const cancelarEdicao = () => {
    setIsModalOpen(false);
    setEditandoPlano(null);
    setFormValues({
      name: '',
      description: '',
      shortDescription: '',
      platformId: platforms.length > 0 ? platforms[0].id : '',
      price: 0,
      interval: 'mês',
      features: [''],
      benefits: [''],
      checkoutLink: '',
      isActive: true,
      isHighlighted: false,
      isFeatured: false,
      displayOrder: 0,
      hasAI: false,
      hasClientPortal: false,
      hasLeadManagement: false,
      hasMultiChannel: false,
      hasRentalManagement: false,
      hasReports: false,
      hasSocialMedia: false,
      hasWebsite: false,
      hasScheduling: false,
      setupFee: 0,
      hasSalesTools: false,
      hasTeamManagement: false,
      isUnlimited: false,
      maxUsers: 0
    });
    setFormError(null);
  };

  if (erro) {
    return (
      <div className="rounded-md bg-red-50 p-4 my-4">
        <div className="text-red-700">{erro}</div>
      </div>
    );
  }

  if (!planos || planos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum plano encontrado</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Crie seu primeiro plano para começar a gerenciar suas assinaturas.</p>
        <Button>Criar Plano</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros removidos conforme solicitado */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planosFiltrados.map(plano => (
          <Card key={plano.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{plano.name}</CardTitle>
                  <CardDescription>
                    {plano.shortDescription || 'Sem descrição curta'}
                  </CardDescription>
                </div>
                <div>
                  {plano.isHighlighted && (
                    <Badge className="ml-2 bg-yellow-500/90 hover:bg-yellow-500">Destaque</Badge>
                  )}
                  {plano.isFeatured && (
                    <Badge className="ml-2 bg-purple-500/90 hover:bg-purple-500">Especial</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">{formatCurrency(plano.price)}</span>
                <span className="text-sm text-gray-500">/{plano.interval}</span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{plano.isUnlimited ? 'Ilimitado' : (plano.maxUsers ? `${plano.maxUsers} usuários` : 'N/A')}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className="h-4 w-4 text-gray-500" />
                    <span>{plano._count?.subscribers || 0} assinante(s)</span>
                  </div>
                </div>
                
                {plano.features && plano.features.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recursos:</h4>
                    <ul className="space-y-1">
                      {plano.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 pt-0">
              {plano.checkoutLink && (
                <a
                  href={plano.checkoutLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                >
                  <ExternalLink className="h-3 w-3 mr-1" /> Checkout
                </a>
              )}
              
              <div className="flex gap-2 w-full">
                <Button 
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8"
                  onClick={() => handleEditarPlano(plano.id)}
                  disabled={carregando === plano.id}
                >
                  {carregando === plano.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <Edit className="h-3.5 w-3.5 mr-1" /> Editar
                    </>
                  )}
                </Button>
                
                <Button 
                  size="sm"
                  variant="destructive" 
                  className="flex-1 h-8"
                  disabled={carregando === plano.id}
                  onClick={() => {
                    if(confirm(`Tem certeza que deseja excluir o plano "${plano.name}"?`)) {
                      handleDelete(plano.id);
                    }
                  }}
                >
                  {carregando === plano.id ? (
                    <Loader className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Excluir
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal de confirmação de exclusão */}
      <Dialog open={!!confirmarExclusao} onOpenChange={(open) => !open && setConfirmarExclusao(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setConfirmarExclusao(null)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (confirmarExclusao) {
                  console.log('Confirmando exclusão:', confirmarExclusao);
                  handleDelete(confirmarExclusao);
                }
              }}
              disabled={carregando !== null}
            >
              {carregando ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Confirmar Exclusão
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Plano */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && cancelarEdicao()}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editandoPlano ? 'Editar Plano' : 'Novo Plano'}</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para {editandoPlano ? 'atualizar' : 'criar'} um plano.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitEdicao} className="space-y-4 py-4">
            {formError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-md mb-4 flex items-center text-red-800 dark:text-red-300">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Plano</Label>
                  <Input
                    id="name"
                    value={formValues.name}
                    onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Descrição Curta</Label>
                  <Input
                    id="shortDescription"
                    value={formValues.shortDescription}
                    onChange={(e) => setFormValues({...formValues, shortDescription: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="description">Descrição Completa</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => generateWithDeepseek('descrição')}
                      disabled={isGenerating.description || !formValues.name}
                      className="h-7 px-2 text-xs gap-1"
                    >
                      {isGenerating.description ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3" />
                          Gerar com I.A.
                        </>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    id="description"
                    value={formValues.description}
                    onChange={(e) => setFormValues({...formValues, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formValues.price}
                    onChange={(e) => setFormValues({...formValues, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interval">Intervalo</Label>
                  <Select
                    value={formValues.interval}
                    onValueChange={(value) => setFormValues({...formValues, interval: value})}
                  >
                    <SelectTrigger id="interval">
                      <SelectValue placeholder="Selecione o intervalo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mês">Mensal</SelectItem>
                      <SelectItem value="trimestre">Trimestral</SelectItem>
                      <SelectItem value="semestre">Semestral</SelectItem>
                      <SelectItem value="ano">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkoutLink">Link de Checkout</Label>
                  <Input
                    id="checkoutLink"
                    value={formValues.checkoutLink || ''}
                    onChange={(e) => setFormValues({...formValues, checkoutLink: e.target.value})}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxUsers">Número Máximo de Usuários</Label>
                    <Input
                      id="maxUsers"
                      type="number"
                      min="1"
                      value={formValues.maxUsers || 1}
                      onChange={(e) => setFormValues({...formValues, maxUsers: parseInt(e.target.value) || 1})}
                      disabled={formValues.isUnlimited}
                    />
                    <p className="text-xs text-gray-500">Mínimo de 1 usuário por plano</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isUnlimited"
                      checked={formValues.isUnlimited}
                      onCheckedChange={(checked) => setFormValues({...formValues, isUnlimited: checked})}
                    />
                    <Label htmlFor="isUnlimited" className="cursor-pointer">Usuários ilimitados</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platformId">Plataforma</Label>
                  <Select
                    value={formValues.platformId}
                    onValueChange={(value) => setFormValues({...formValues, platformId: value})}
                    disabled={isLoadingPlatforms}
                  >
                    <SelectTrigger id="platformId">
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform.id} value={platform.id}>
                          {platform.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Recursos e Características</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => generateWithDeepseek('recursos')}
                      disabled={isGenerating.features || !formValues.name}
                      className="h-7 px-2 text-xs gap-1"
                    >
                      {isGenerating.features ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3" />
                          Gerar com I.A.
                        </>
                      )}
                    </Button>
                  </div>
                  {formValues.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...formValues.features];
                          newFeatures[index] = e.target.value;
                          setFormValues({...formValues, features: newFeatures});
                        }}
                        placeholder={`Recurso ${index + 1}`}
                      />
                      {index === formValues.features.length - 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setFormValues({...formValues, features: [...formValues.features, '']})}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newFeatures = [...formValues.features];
                            newFeatures.splice(index, 1);
                            setFormValues({...formValues, features: newFeatures});
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formValues.isActive}
                      onCheckedChange={(checked) => setFormValues({...formValues, isActive: checked})}
                    />
                    <Label htmlFor="isActive">Ativo</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isHighlighted"
                      checked={formValues.isHighlighted}
                      onCheckedChange={(checked) => setFormValues({...formValues, isHighlighted: checked})}
                    />
                    <Label htmlFor="isHighlighted">Destacado</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={formValues.isFeatured}
                      onCheckedChange={(checked) => setFormValues({...formValues, isFeatured: checked})}
                    />
                    <Label htmlFor="isFeatured">Em Destaque na Home</Label>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={cancelarEdicao}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    {editandoPlano ? 'Atualizando...' : 'Criando...'}
                  </>
                ) : (
                  <>{editandoPlano ? 'Atualizar Plano' : 'Criar Plano'}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
