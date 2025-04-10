'use client';

import { useState } from 'react';
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
import { 
  Check, 
  Edit,
  Trash2,
  Users,
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { togglePlanStatus, togglePlanHighlight, deletePlan } from '@/lib/actions/plan';
import { Plan, Platform } from '@prisma/client';
import { formatCurrency } from '@/lib/utils';

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
  const [filtroPlataforma, setFiltroPlataforma] = useState<string | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState<string | null>(null);
  const [carregando, setCarregando] = useState<string | null>(null);

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
    await deletePlan(id);
    setConfirmarExclusao(null);
    setCarregando(null);
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
                    <div className="text-sm text-gray-500 dark:text-gray-400">por {plano.interval}</div>
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
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <a href={`/dashboard/planos/editar/${plano.id}`}>
                      <Edit className="h-4 w-4 mr-2" /> Editar
                    </a>
                  </Button>
                  
                  <Button variant="outline" asChild className="w-full">
                    <a href={plano.platform.url} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="h-4 w-4 mr-2" /> Ver Live
                    </a>
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full" 
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
              variant="destructive" 
              onClick={() => confirmarExclusao && handleDelete(confirmarExclusao)}
              disabled={!!carregando}
            >
              {carregando ? 'Excluindo...' : 'Confirmar Exclusão'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
