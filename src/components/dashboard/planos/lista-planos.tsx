'use client';

import { useState, useTransition, useEffect } from 'react';
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
  SelectValue,
} from "@/components/ui/select";
import { 
  Check, 
  Edit,
  Trash2,
  Users,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { togglePlanStatus, togglePlanHighlight, deletePlan, updatePlan } from '@/lib/actions/plan';
import { getAllPlatforms } from '@/lib/actions/platform';
import { Plan, Platform } from '@prisma/client';
import { formatCurrency } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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

// Interface para formulário de edição
interface PlanFormState {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  features: string[];
  price: number;
  discount: number;
  interval: string;
  checkoutLink: string;
  platformId: string;
  isActive: boolean;
  isHighlighted: boolean;
}

export default function ListaPlanos({ planos, erro }: ListaPlanosProps) {
  const router = useRouter();
  const [filtroPlataforma, setFiltroPlataforma] = useState<string | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // Estado para o modal de edição
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [planoEditando, setPlanoEditando] = useState<PlanFormState | null>(null);
  
  // Estado para os recursos do plano em edição
  const [novoRecurso, setNovoRecurso] = useState('');
  
  // Estado para as plataformas disponíveis
  const [plataformas, setPlataformas] = useState<Platform[]>([]);
  
  // Carrega as plataformas disponíveis
  useEffect(() => {
    const loadPlatforms = async () => {
      const { platforms, error } = await getAllPlatforms();
      if (platforms && platforms.length > 0) {
        setPlataformas(platforms);
      }
    };
    
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
    setCarregando(id);
    const result = await deletePlan(id);
    
    if (!result.success && result.error) {
      alert(result.error);
    }
    
    setConfirmarExclusao(null);
    setCarregando(null);
  };
  
  // Função para abrir o modal de edição
  const openEditModal = (plano: PlanWithDetails) => {
    setPlanoEditando({
      id: plano.id,
      name: plano.name,
      description: plano.description || '',
      shortDescription: plano.shortDescription || '',
      features: [...plano.features], // Cria uma cópia para não modificar o original
      price: plano.price,
      discount: plano.discount || 0,
      interval: plano.interval,
      checkoutLink: plano.checkoutLink || '',
      platformId: plano.platformId,
      isActive: plano.isActive,
      isHighlighted: plano.isHighlighted,
    });
    setEditModalOpen(true);
  };
  
  // Função para adicionar um recurso ao plano em edição
  const addFeature = () => {
    if (!planoEditando || !novoRecurso.trim()) return;
    
    setPlanoEditando({
      ...planoEditando,
      features: [...planoEditando.features, novoRecurso.trim()]
    });
    setNovoRecurso('');
  };
  
  // Função auxiliar para traduzir intervalos
  const traduzirIntervalo = (intervalo: string): string => {
    switch (intervalo) {
      case 'month': return 'mês';
      case 'quarter': return 'trimestre';
      case 'semester': return 'semestre';
      case 'year': return 'ano';
      case 'once': return 'pagamento único';
      default: return intervalo;
    }
  };
  
  // Função para remover um recurso do plano em edição
  const removeFeature = (index: number) => {
    if (!planoEditando) return;
    
    const newFeatures = [...planoEditando.features];
    newFeatures.splice(index, 1);
    
    setPlanoEditando({
      ...planoEditando,
      features: newFeatures
    });
  };
  
  // Função para salvar as alterações no plano
  const handleSaveChanges = async () => {
    if (!planoEditando) return;
    
    startTransition(async () => {
      const result = await updatePlan(planoEditando.id, {
        name: planoEditando.name,
        description: planoEditando.description,
        shortDescription: planoEditando.shortDescription,
        features: planoEditando.features,
        price: Number(planoEditando.price),
        discount: Number(planoEditando.discount),
        interval: planoEditando.interval,
        checkoutLink: planoEditando.checkoutLink,
        platformId: planoEditando.platformId,
        isActive: planoEditando.isActive,
        isHighlighted: planoEditando.isHighlighted,
        // Adicionando propriedades obrigatórias com valores padrão
        benefits: [],
        displayOrder: 0,
        hasAI: false,
        hasClientPortal: false,
        hasLeadManagement: true,
        hasMultiChannel: false,
        hasRentalManagement: false,
        hasReports: true,
        hasSalesTools: true,
        hasTeamManagement: false,
        isFeatured: false,
        isUnlimited: false,
      });
      
      // Atualiza a lista de planos para refletir as alterações imediatamente
      router.refresh();
      
      setEditModalOpen(false);
      setPlanoEditando(null);
    });
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
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Button 
          variant={filtroPlataforma === null ? "default" : "outline"} 
          onClick={() => setFiltroPlataforma(null)}
          className="whitespace-nowrap"
        >
          Todas Plataformas
        </Button>
        {Array.from(new Set(planos.map(p => p.platformId))).map(platformId => {
          const platform = planos.find(p => p.platformId === platformId)?.platform;
          return (
            <Button 
              key={platformId}
              variant={filtroPlataforma === platformId ? "default" : "outline"} 
              onClick={() => setFiltroPlataforma(platformId)}
              className="whitespace-nowrap"
            >
              {platform?.name || platformId}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {planosFiltrados.map((plano) => (
          <Card 
            key={plano.id} 
            className={`overflow-hidden border ${plano.isHighlighted ? 'border-[#25D366] shadow-lg' : 'border-gray-200 dark:border-gray-800'}`}
          >
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                      {plano.name}
                      {plano.isHighlighted && (
                        <Badge className="ml-2 bg-[#25D366] hover:bg-[#25D366]">
                          <Sparkles className="h-3 w-3 mr-1" /> Destaque
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{plano.description || plano.shortDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(plano.price)}
                      {plano.discount && plano.discount > 0 && (
                        <span className="ml-2 text-sm line-through text-gray-500">
                          {formatCurrency(plano.price + plano.discount)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      por {traduzirIntervalo(plano.interval)}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                    {plano.platform.name}
                  </Badge>
                  <Badge variant="outline" className="text-gray-700 dark:text-gray-300 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {plano._count.subscribers} assinantes
                  </Badge>
                  <Badge variant="outline" className="text-gray-700 dark:text-gray-300">
                    {plano.interval}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recursos:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                    {plano.features.map((recurso, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-[#25D366] mr-2 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-400">{recurso}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plano.checkoutLink && (
                  <div className="mt-4">
                    <a 
                      href={plano.checkoutLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Link de checkout
                    </a>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 md:w-64 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`active-${plano.id}`} className="font-medium">Ativo</Label>
                  <Switch 
                    id={`active-${plano.id}`} 
                    checked={plano.isActive} 
                    disabled={carregando === plano.id}
                    onCheckedChange={() => handleToggleStatus(plano.id)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`highlight-${plano.id}`} className="font-medium">Destacado</Label>
                  <Switch 
                    id={`highlight-${plano.id}`} 
                    checked={plano.isHighlighted} 
                    disabled={carregando === plano.id}
                    onCheckedChange={() => handleToggleHighlight(plano.id)}
                  />
                </div>
                
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                    onClick={() => openEditModal(plano)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Editar
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D36610]">
                    <a href={plano.platform.url} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="h-4 w-4 mr-2" /> Ver Live
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D36610]" 
                    disabled={carregando === plano.id}
                    onClick={() => setConfirmarExclusao(plano.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Excluir
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={!!confirmarExclusao} onOpenChange={() => setConfirmarExclusao(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmarExclusao(null)}>
              Cancelar
            </Button>
            <Button 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white" 
              onClick={() => confirmarExclusao && handleDelete(confirmarExclusao)}
              disabled={!!carregando}
            >
              {carregando ? 'Excluindo...' : 'Confirmar Exclusão'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal de Edição de Plano */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Plano</DialogTitle>
            <DialogDescription>
              Atualize as informações do plano conforme necessário.
            </DialogDescription>
          </DialogHeader>
          
          {planoEditando && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="features">Recursos</TabsTrigger>
                <TabsTrigger value="advanced">Avançado</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome do Plano</Label>
                    <Input 
                      id="name" 
                      value={planoEditando.name} 
                      onChange={(e) => setPlanoEditando({...planoEditando, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Plataforma</Label>
                    <Select 
                      value={planoEditando.platformId} 
                      onValueChange={(value) => setPlanoEditando({...planoEditando, platformId: value})}
                    >
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="Selecione uma plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        {plataformas.map(platform => (
                          <SelectItem key={platform.id} value={platform.id}>
                            {platform.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="shortDescription">Descrição Curta</Label>
                    <Input 
                      id="shortDescription" 
                      value={planoEditando.shortDescription} 
                      onChange={(e) => setPlanoEditando({...planoEditando, shortDescription: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição Completa</Label>
                    <Textarea 
                      id="description" 
                      value={planoEditando.description} 
                      onChange={(e) => setPlanoEditando({...planoEditando, description: e.target.value})}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        step="0.01"
                        value={planoEditando.price} 
                        onChange={(e) => {
                          // Garante que o valor tenha no máximo 2 casas decimais
                          const value = parseFloat(parseFloat(e.target.value).toFixed(2));
                          setPlanoEditando({...planoEditando, price: value});
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="discount">Desconto (R$)</Label>
                      <Input 
                        id="discount" 
                        type="number" 
                        step="0.01"
                        value={planoEditando.discount} 
                        onChange={(e) => {
                          // Garante que o valor tenha no máximo 2 casas decimais
                          const value = parseFloat(parseFloat(e.target.value).toFixed(2));
                          setPlanoEditando({...planoEditando, discount: value});
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="interval">Intervalo</Label>
                    <Select 
                      value={planoEditando.interval} 
                      onValueChange={(value) => setPlanoEditando({...planoEditando, interval: value})}
                    >
                      <SelectTrigger id="interval">
                        <SelectValue placeholder="Selecione um intervalo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Mensal</SelectItem>
                        <SelectItem value="quarter">Trimestral</SelectItem>
                        <SelectItem value="semester">Semestral</SelectItem>
                        <SelectItem value="year">Anual</SelectItem>
                        <SelectItem value="once">Pagamento Único</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4 py-4">
                <div className="space-y-4">
                  <Label>Recursos do Plano</Label>
                  <p className="text-sm text-muted-foreground mb-2">Cada recurso aparecerá na lista de benefícios do plano, com um ícone de marcação verde.</p>
                  <div className="space-y-2">
                    {planoEditando.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          value={feature} 
                          onChange={(e) => {
                            const newFeatures = [...planoEditando.features];
                            newFeatures[index] = e.target.value;
                            setPlanoEditando({...planoEditando, features: newFeatures});
                          }}
                        />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => removeFeature(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Adicionar novo recurso" 
                      value={novoRecurso} 
                      onChange={(e) => setNovoRecurso(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={addFeature}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4 py-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="checkoutLink">Link de Checkout</Label>
                    <Input 
                      id="checkoutLink" 
                      value={planoEditando.checkoutLink} 
                      onChange={(e) => setPlanoEditando({...planoEditando, checkoutLink: e.target.value})}
                      placeholder="https://"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isActive" className="font-medium">Plano Ativo</Label>
                    <Switch 
                      id="isActive" 
                      checked={planoEditando.isActive} 
                      onCheckedChange={(checked) => setPlanoEditando({...planoEditando, isActive: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isHighlighted" className="font-medium">Plano Destacado</Label>
                    <Switch 
                      id="isHighlighted" 
                      checked={planoEditando.isHighlighted} 
                      onCheckedChange={(checked) => setPlanoEditando({...planoEditando, isHighlighted: checked})}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditModalOpen(false)} disabled={isPending}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              onClick={handleSaveChanges} 
              disabled={isPending} 
              className="bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              {isPending ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
