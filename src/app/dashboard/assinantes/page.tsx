'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { NovoAssinanteModal } from '@/components/dashboard/assinantes/novo-assinante-modal';
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
  status: string;
  valor: string;
  plataforma: string;
}

export default function AssinantesPage() {
  const [filtro, setFiltro] = useState('');
  const [assinantes, setAssinantes] = useState<Assinante[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [statusFiltro, setStatusFiltro] = useState<string>('todos');
  const [novoAssinanteModalAberto, setNovoAssinanteModalAberto] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [resumo, setResumo] = useState({
    total: 0,
    ativos: 0,
    novos: 0,
    ticketMedio: 0
  });
  
  const fetchAssinantes = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/assinantes');
      if (!response.ok) {
        throw new Error('Falha ao buscar assinantes');
      }
      const data = await response.json();
      
      // Formatar os dados
      interface AssinanteResponse {
        id: string;
        user: { name: string | null; email: string | null; phone: string | null };
        plan: { name: string; price: number };
        startDate: string;
        status: string;
        platform: { name: string };
      }

      const assinantesFormatados = data.assinantes.map((a: AssinanteResponse) => ({
        id: a.id,
        nome: a.user.name || 'Nome não disponível',
        email: a.user.email || 'Email não disponível',
        telefone: formatarTelefone(a.user.phone || ''),
        plano: a.plan.name,
        dataAssinatura: formatarData(new Date(a.startDate)),
        status: traduzirStatus(a.status),
        valor: formatarValor(a.plan.price),
        plataforma: a.platform.name
      }));
      
      setAssinantes(assinantesFormatados);
      
      // Calcular resumo
      const total = assinantesFormatados.length;
      const ativos = assinantesFormatados.filter((a: Assinante) => a.status === 'Ativo').length;
      const dataMesAtual = new Date();
      dataMesAtual.setMonth(dataMesAtual.getMonth() - 1);
      const novos = assinantesFormatados.filter((a: Assinante) => {
        const dataAssinatura = converterDataStringParaDate(a.dataAssinatura);
        return dataAssinatura && dataAssinatura > dataMesAtual;
      }).length;
      
      // Calcular ticket médio (considerando apenas assinantes ativos)
      const valores = assinantesFormatados
        .filter((a: Assinante) => a.status === 'Ativo')
        .map((a: Assinante) => parseFloat(a.valor.replace('R$ ', '').replace(',', '.').replace('/mês', '')));
        
      const ticketMedio = valores.length > 0 
        ? valores.reduce((acc: number, val: number) => acc + val, 0) / valores.length 
        : 0;
      
      setResumo({
        total,
        ativos,
        novos,
        ticketMedio
      });
      
    } catch (error) {
      console.error('Erro ao buscar assinantes:', error);
    } finally {
      setRefreshing(false);
      setCarregando(false);
    }
  };
  
  useEffect(() => {
    fetchAssinantes();
  }, []);
  
  function formatarTelefone(telefone: string): string {
    if (!telefone) return '';
    // Formata telefone: (XX) XXXXX-XXXX
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
                      <TableHead>Data de Assinatura</TableHead>
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
                        <TableCell>{assinante.plano}</TableCell>
                        <TableCell>{assinante.dataAssinatura}</TableCell>
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
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" /> Enviar email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="h-4 w-4 mr-2" /> Ligar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" /> Enviar mensagem
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" /> Ver detalhes
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
