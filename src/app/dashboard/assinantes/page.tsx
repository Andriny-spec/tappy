'use client';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { NovoAssinanteModal } from '@/components/dashboard/assinantes/novo-assinante-modal';
import { ConfirmarAcaoModal } from './confirmar-acao-modal';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  UserPlus, 
  Users, 
  Calendar,
  Check,
  X,
  Mail,
  Phone,
  Filter,
  AlertTriangle,
  RefreshCcw,
  Loader,
  MoreHorizontal,
  Send,
  Star
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Assinante {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  plano: string;
  dataAssinatura: string;
  dataExpiracao: string;
  status: string;
  valor: string;
  plataforma: string;
  intervalo?: string;
}

export default function AssinantesPage() {
  const [filtro, setFiltro] = useState('');
  const [assinantes, setAssinantes] = useState<Assinante[]>([]);
  const [statusFiltro, setStatusFiltro] = useState<string>('todos');
  const [plataformaFiltro, setPlataformaFiltro] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [novoAssinanteModalAberto, setNovoAssinanteModalAberto] = useState(false);
  const [assinanteParaEditar, setAssinanteParaEditar] = useState<string | null>(null);
  const [assinanteParaVisualizar, setAssinanteParaVisualizar] = useState<string | null>(null);
  const [assinanteParaDesativar, setAssinanteParaDesativar] = useState<string | null>(null);
  const [assinanteParaExcluir, setAssinanteParaExcluir] = useState<string | null>(null);
  const [assinanteData, setAssinanteData] = useState<any>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    action: () => Promise<void>;
    buttonText: string;
    buttonVariant: 'destructive' | 'default' | 'outline';
  } | null>(null);
  
  // Estatísticas com dados zerados
  const [resumo, setResumo] = useState({
    total: 0,
    ativos: 0,
    novos: 0,
    ticketMedio: 0
  });
  
  const fetchAssinantes = async () => {
    try {
      setRefreshing(true);
      setCarregando(true);
      
      // Buscar dados da API
      const response = await fetch('/api/assinantes');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar assinantes');
      }
      
      const data = await response.json();
      
      // Registrar resposta para diagnóstico
      console.log('Resposta da API assinantes:', data);
      
      if (data && Array.isArray(data.assinantes)) {
        // Transformar dados da API para o formato esperado pela interface
        const formattedAssinantes: Assinante[] = data.assinantes.map((sub: any) => {
          // Calcular data de expiração baseada no intervalo do plano
          const dataAssinatura = new Date(sub.createdAt || sub.startDate);
          let dataExpiracao = new Date(dataAssinatura);
          
          const intervalo = sub.plan.interval || 'monthly';
          
          switch(intervalo) {
            case 'daily':
              dataExpiracao.setDate(dataExpiracao.getDate() + 1);
              break;
            case 'weekly':
              dataExpiracao.setDate(dataExpiracao.getDate() + 7);
              break;
            case 'biweekly':
              dataExpiracao.setDate(dataExpiracao.getDate() + 15);
              break;
            case 'monthly':
              dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
              break;
            case 'bimonthly':
              dataExpiracao.setMonth(dataExpiracao.getMonth() + 2);
              break;
            case 'quarterly':
              dataExpiracao.setMonth(dataExpiracao.getMonth() + 3);
              break;
            case 'semiannual':
              dataExpiracao.setMonth(dataExpiracao.getMonth() + 6);
              break;
            case 'annual':
              dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 1);
              break;
            case 'biennial':
              dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 2);
              break;
            default:
              dataExpiracao.setMonth(dataExpiracao.getMonth() + 1); // Padrão mensal
          }
          
          // Traduzir o intervalo para exibição
          const traduzirIntervalo = (intervalo: string) => {
            const traducoes: Record<string, string> = {
              'daily': 'Diário',
              'weekly': 'Semanal',
              'biweekly': 'Quinzenal',
              'monthly': 'Mensal',
              'bimonthly': 'Bimestral',
              'quarterly': 'Trimestral',
              'semiannual': 'Semestral',
              'annual': 'Anual',
              'biennial': 'Bienal'
            };
            return traducoes[intervalo] || 'Mensal';
          };
          
          return {
            id: sub.id,
            nome: sub.user.name,
            email: sub.user.email,
            telefone: sub.user.phone || '',
            plano: sub.plan.name,
            dataAssinatura: dataAssinatura.toLocaleDateString('pt-BR'),
            dataExpiracao: dataExpiracao.toLocaleDateString('pt-BR'),
            status: sub.status,
            valor: `R$ ${sub.plan.price.toFixed(2).replace('.', ',')}`,
            plataforma: sub.platform.name,
            intervalo: traduzirIntervalo(intervalo)
          };
        });
        
        // Registrar dados formatados
        console.log('Assinantes formatados:', formattedAssinantes);
        
        setAssinantes(formattedAssinantes);
        
        // Usar os dados do resumo que já vêm da API
        if (data.resumo) {
          setResumo({
            total: data.resumo.total || 0,
            ativos: data.resumo.ativos || 0,
            novos: data.resumo.novos || 0,
            ticketMedio: data.resumo.ticketMedio || 0
          });
        } else {
          // Calcular resumo caso não venha da API
          const ativos = data.assinantes.filter((sub: any) => sub.status === 'active').length;
          const novos = data.assinantes.filter((sub: any) => {
            const dataAssinatura = new Date(sub.createdAt || sub.startDate);
            const hoje = new Date();
            const diffDias = Math.floor((hoje.getTime() - dataAssinatura.getTime()) / (1000 * 60 * 60 * 24));
            return diffDias <= 30; // Assinantes dos últimos 30 dias
          }).length;
          
          // Calcular ticket médio
          let somaValores = 0;
          if (data.assinantes.length > 0) {
            somaValores = data.assinantes.reduce((acc: number, sub: any) => acc + sub.plan.price, 0);
          }
          const ticketMedio = data.assinantes.length > 0 ? somaValores / data.assinantes.length : 0;
          
          setResumo({
            total: data.assinantes.length,
            ativos,
            novos,
            ticketMedio
          });
        }
      } else {
        setAssinantes([]);
        setResumo({
          total: 0,
          ativos: 0,
          novos: 0,
          ticketMedio: 0
        });
      }
    } catch (error) {
      console.error('Erro ao buscar assinantes:', error);
      setAssinantes([]);
      setResumo({
        total: 0,
        ativos: 0,
        novos: 0,
        ticketMedio: 0
      });
    } finally {
      setRefreshing(false);
      setCarregando(false);
    }
  };
  
  // Funções de manipulação de assinantes
  const handleVisualizarAssinante = (id: string) => {
    const assinante = assinantes.find(a => a.id === id);
    if (assinante) {
      setAssinanteData(assinante);
      setAssinanteParaVisualizar(id);
    }
  };

  const handleEditarAssinante = (id: string) => {
    const assinante = assinantes.find(a => a.id === id);
    if (assinante) {
      setAssinanteData(assinante);
      setAssinanteParaEditar(id);
    }
  };

  const handleStatusAssinante = (id: string) => {
    const assinante = assinantes.find(a => a.id === id);
    if (!assinante) return;
    
    const isAtivo = assinante.status.toLowerCase() === 'ativo' || assinante.status.toLowerCase() === 'active';
    const action = isAtivo ? 'desativar' : 'ativar';
    
    setConfirmAction({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} assinante`,
      message: `Tem certeza que deseja ${action} o assinante ${assinante.nome}?`,
      buttonText: action.charAt(0).toUpperCase() + action.slice(1),
      buttonVariant: isAtivo ? 'destructive' : 'outline',
      action: async () => {
        setLoadingAction(true);
        try {
          const response = await fetch('/api/assinantes/status', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,
              active: !isAtivo
            }),
          });
          
          if (!response.ok) {
            throw new Error('Falha ao alterar status do assinante');
          }
          
          toast.success(`Assinante ${action}do com sucesso`);
          fetchAssinantes();
        } catch (error) {
          console.error(`Erro ao ${action} assinante:`, error);
          toast.error(`Erro ao ${action} assinante`); 
        } finally {
          setLoadingAction(false);
          setConfirmModalOpen(false);
          setAssinanteParaDesativar(null);
        }
      }
    });
    
    setConfirmModalOpen(true);
    setAssinanteParaDesativar(id);
  };

  const handleExcluirAssinante = (id: string) => {
    const assinante = assinantes.find(a => a.id === id);
    if (!assinante) return;
    
    setConfirmAction({
      title: 'Excluir assinante',
      message: `Tem certeza que deseja excluir o assinante ${assinante.nome}? Esta ação não pode ser desfeita.`,
      buttonText: 'Excluir',
      buttonVariant: 'destructive',
      action: async () => {
        setLoadingAction(true);
        try {
          const response = await fetch(`/api/assinantes?id=${id}`, {
            method: 'DELETE',
          });
          
          if (!response.ok) {
            throw new Error('Falha ao excluir assinante');
          }
          
          toast.success('Assinante excluído com sucesso');
          fetchAssinantes();
        } catch (error) {
          console.error('Erro ao excluir assinante:', error);
          toast.error('Erro ao excluir assinante'); 
        } finally {
          setLoadingAction(false);
          setConfirmModalOpen(false);
          setAssinanteParaExcluir(null);
        }
      }
    });
    
    setConfirmModalOpen(true);
    setAssinanteParaExcluir(id);
  };

  useEffect(() => {
    fetchAssinantes();
  }, []);
  
  function formatarTelefone(telefone: string): string {
    if (!telefone) return '';
    const numbers = telefone.replace(/\D/g, '');
    if (numbers.length === 11) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7)}`;
    } 
    if (numbers.length === 10) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 6)}-${numbers.substring(6)}`;
    }
    return telefone;
  }
  
  function formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR');
  }
  
  function converterDataStringParaDate(dataString: string): Date | null {
    const partes = dataString.split('/');
    if (partes.length !== 3) return null;
    return new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
  }
  
  function formatarValor(valor: number): string {
    return `R$ ${valor.toFixed(2).replace('.', ',')}/mês`;
  }
  
  function traduzirStatus(status: string): string {
    switch (status) {
      case 'active': return 'Ativo';
      case 'canceled': return 'Cancelado';
      case 'overdue': return 'Inadimplente';
      default: return status;
    }
  }
  
  // Funções de filtro
  const assinantesFiltrados = assinantes.filter((assinante: Assinante) => {
    const matchFiltro = 
      assinante.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      assinante.email.toLowerCase().includes(filtro.toLowerCase()) ||
      assinante.plano.toLowerCase().includes(filtro.toLowerCase()) ||
      assinante.plataforma.toLowerCase().includes(filtro.toLowerCase());
      
    const matchStatus = statusFiltro === 'todos' || 
      (statusFiltro === 'ativos' && assinante.status === 'Ativo') ||
      (statusFiltro === 'inadimplentes' && assinante.status === 'Inadimplente') ||
      (statusFiltro === 'cancelados' && assinante.status === 'Cancelado');
      
    return matchFiltro && matchStatus;
  });
  
  // Renderização do status com cores apropriadas
  const renderStatus = (status: string) => {
    switch(status) {
      case 'Ativo':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"><Check className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'Inadimplente':
        return <Badge variant="outline" className="text-amber-600 border-amber-300 dark:text-amber-400"><AlertTriangle className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'Cancelado':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"><X className="h-3 w-3 mr-1" /> {status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Iniciais para avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (carregando) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <Loader className="h-8 w-8 animate-spin mb-4 text-primary" />
        <p className="text-muted-foreground">Carregando assinantes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Modal de confirmação de ações */}
      {confirmAction && (
        <ConfirmarAcaoModal
          aberto={confirmModalOpen}
          titulo={confirmAction.title}
          mensagem={confirmAction.message}
          botaoConfirmarTexto={confirmAction.buttonText}
          botaoConfirmarVariante={confirmAction.buttonVariant}
          onConfirm={confirmAction.action}
          onCancel={() => {
            setConfirmModalOpen(false);
            setConfirmAction(null);
            setAssinanteParaDesativar(null);
            setAssinanteParaExcluir(null);
          }}
        />
      )}
      
      {/* Modal de Novo/Editar Assinante */}
      <NovoAssinanteModal
        isOpen={novoAssinanteModalAberto || !!assinanteParaEditar}
        onClose={() => {
          setNovoAssinanteModalAberto(false);
          setAssinanteParaEditar(null);
          setAssinanteData(null);
        }}
        onSuccess={() => {
          fetchAssinantes();
          setNovoAssinanteModalAberto(false);
          setAssinanteParaEditar(null);
          setAssinanteData(null);
        }}
        assinanteData={assinanteData}
        editing={!!assinanteParaEditar}
      />
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Assinantes</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerencie todos os seus assinantes ativos e inativos.</p>
      </div>
      
      {/* Cartões de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Assinantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{resumo.total}</div>
            <div className="text-xs text-green-600 mt-1">+{resumo.novos} este mês</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Taxa de Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {resumo.total > 0 ? ((resumo.ativos / resumo.total) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-xs text-green-600 mt-1">Assinantes ativos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Assinantes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{resumo.ativos}</div>
            <div className="text-xs text-green-600 mt-1">
              {resumo.total > 0 ? ((resumo.ativos / resumo.total) * 100).toFixed(0) : 0}% do total
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">R$ {resumo.ticketMedio.toFixed(2).replace('.', ',')}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Por assinante</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs para segmentar visualização */}
      <Tabs defaultValue="todos" className="w-full" onValueChange={setStatusFiltro}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-gray-100">Lista de Assinantes</h2>
          <div className="flex items-center gap-4">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="inadimplentes">Inadimplentes</TabsTrigger>
              <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={fetchAssinantes} 
                disabled={refreshing}
              >
                <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button 
                className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                onClick={() => setNovoAssinanteModalAberto(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" /> Novo Assinante
              </Button>
            </div>
          </div>
        </div>
        
        <TabsContent value="todos" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input 
                    placeholder="Buscar por nome, email ou plano" 
                    className="pl-8" 
                    value={filtro} 
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Tabela de assinantes */}
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assinante</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Plataforma</TableHead>
                      <TableHead>Data de Assinatura</TableHead>
                      <TableHead>Data de Expiração</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assinantesFiltrados.map((assinante) => (
                      <TableRow key={assinante.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{getInitials(assinante.nome)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{assinante.nome}</div>
                              <div className="text-sm text-muted-foreground">{assinante.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assinante.plano}</div>
                            <div className="text-xs text-muted-foreground">{assinante.intervalo}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{assinante.plataforma}</div>
                        </TableCell>
                        <TableCell>{assinante.dataAssinatura}</TableCell>
                        <TableCell>{assinante.dataExpiracao}</TableCell>
                        <TableCell>{assinante.valor}</TableCell>
                        <TableCell>{renderStatus(assinante.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleVisualizarAssinante(assinante.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye mr-2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditarAssinante(assinante.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil mr-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {assinante.status.toLowerCase() === 'ativo' || assinante.status.toLowerCase() === 'active' ? (
                                <DropdownMenuItem onClick={() => handleStatusAssinante(assinante.id)} className="text-amber-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause-circle mr-2"><circle cx="12" cy="12" r="10"/><line x1="10" x2="10" y1="15" y2="9"/><line x1="14" x2="14" y1="15" y2="9"/></svg>
                                  Desativar
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleStatusAssinante(assinante.id)} className="text-green-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle mr-2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                                  Ativar
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleExcluirAssinante(assinante.id)} className="text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 mr-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Paginação */}
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ativos">
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Filtro de assinantes ativos será implementado em breve.
          </div>
        </TabsContent>
        
        <TabsContent value="inadimplentes">
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Filtro de assinantes inadimplentes será implementado em breve.
          </div>
        </TabsContent>
        
        <TabsContent value="cancelados">
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Filtro de assinantes cancelados será implementado em breve.
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Modal de Novo Assinante */}
      <NovoAssinanteModal 
        isOpen={novoAssinanteModalAberto} 
        onClose={() => setNovoAssinanteModalAberto(false)} 
        onSuccess={fetchAssinantes}
      />
      <Toaster />
    </div>
  );
}
