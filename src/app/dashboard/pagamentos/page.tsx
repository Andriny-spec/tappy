'use client';

import { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Download, 
  Filter, 
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  Check,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ExternalLink } from "lucide-react";

// Interface para tipagem dos pagamentos
interface Pagamento {
  id: string;
  cliente: string;
  email: string;
  data: string;
  valor: string;
  metodo: string;
  plano: string;
  status: string;
  plataforma?: string;
  inicio?: string;
  fim?: string;
  transactionId?: string;
  receiptUrl?: string;
}

export default function PagamentosPage() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos');
  const [metodoFiltro, setMetodoFiltro] = useState('todos');
  const [plataformaFiltro, setPlataformaFiltro] = useState('todos');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [resumo, setResumo] = useState({
    totalRecebido: 0,
    reembolsos: 0,
    transacoes: 0,
    ticketMedio: 0
  });
  
  // Modal de detalhes
  const [modalAberto, setModalAberto] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pagamento | null>(null);
  
  // Buscar dados reais de pagamentos
  useEffect(() => {
    const buscarPagamentos = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch('/api/dashboard/pagamentos');
        
        if (!resposta.ok) {
          throw new Error(`Erro ao buscar pagamentos: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        setPagamentos(dados.pagamentos);
        setResumo(dados.resumo);
      } catch (erro) {
        console.error('Erro ao buscar pagamentos:', erro);
        // Em caso de erro, podemos manter alguns dados mockados para demonstração
        setPagamentos([
          {
            id: '1',
            cliente: 'Carlos Silva',
            email: 'carlos.silva@gmail.com',
            data: '27/03/2025',
            valor: 'R$ 97,00',
            metodo: 'Cartão de Crédito',
            plano: 'Tappy Link Premium',
            status: 'Aprovado',
            plataforma: 'Tappy Link'
          },
          {
            id: '2',
            cliente: 'Ana Rodrigues',
            email: 'ana.rodrigues@hotmail.com',
            data: '26/03/2025',
            valor: 'R$ 59,90',
            metodo: 'PIX',
            plano: 'Tappy WhatsApp Pro',
            status: 'Aprovado',
            plataforma: 'Tappy WhatsApp'
          }
        ]);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarPagamentos();
  }, []);
  
  // Funções de filtro
  const pagamentosFiltrados = pagamentos.filter(pagamento => {
    // Filtro de texto
    const textoMatch = 
      pagamento.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      pagamento.email.toLowerCase().includes(filtro.toLowerCase()) ||
      pagamento.plano.toLowerCase().includes(filtro.toLowerCase()) ||
      pagamento.id.toLowerCase().includes(filtro.toLowerCase());
    
    // Filtro de status
    const statusMatch = statusFiltro === 'todos' || pagamento.status.toLowerCase() === statusFiltro.toLowerCase();
    
    // Filtro de método
    const metodoMatch = metodoFiltro === 'todos' || pagamento.metodo.toLowerCase().includes(metodoFiltro.toLowerCase());
    
    // Filtro de plataforma
    const plataformaMatch = plataformaFiltro === 'todos' || 
      (pagamento.plataforma && pagamento.plataforma.toLowerCase() === plataformaFiltro.toLowerCase());
    
    // Filtro de data de início
    const dataInicioObj = dataInicio ? new Date(dataInicio) : null;
    const dataInicioMatch = !dataInicioObj || new Date(pagamento.data) >= dataInicioObj;
    
    // Filtro de data de fim
    const dataFimObj = dataFim ? new Date(dataFim) : null;
    const dataFimMatch = !dataFimObj || new Date(pagamento.data) <= dataFimObj;
    
    return textoMatch && statusMatch && metodoMatch && plataformaMatch && dataInicioMatch && dataFimMatch;
  });
  
  // Renderização do status com cores apropriadas
  const renderStatus = (status: string) => {
    switch(status.toLowerCase()) {
      case 'aprovado':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"><Check className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'pendente':
        return <Badge variant="outline" className="text-amber-600 border-amber-300 dark:text-amber-400"><Calendar className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'reembolsado':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"><X className="h-3 w-3 mr-1" /> {status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Função para abrir o modal de detalhes
  const abrirDetalhes = (pagamento: Pagamento) => {
    setPedidoSelecionado(pagamento);
    setModalAberto(true);
  };

  // Calcular o progresso do plano
  const calcularProgressoPlano = (dataInicio?: string, dataFim?: string) => {
    if (!dataInicio || !dataFim) return 0;
    
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const hoje = new Date();
    
    // Se o plano já expirou
    if (hoje > fim) return 100;
    
    // Se o plano ainda não começou
    if (hoje < inicio) return 0;
    
    // Calcular progresso
    const diasTotais = Math.abs(differenceInDays(fim, inicio));
    const diasPassados = Math.abs(differenceInDays(hoje, inicio));
    
    return Math.floor((diasPassados / diasTotais) * 100);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pagamentos</h1>
        <p className="text-gray-500 dark:text-gray-400">Gerencie todos os pagamentos e transações.</p>
      </div>
      
      {/* Cartões de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {`R$ ${resumo.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Reembolsos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {`R$ ${resumo.reembolsos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{resumo.transacoes}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">
              {`R$ ${resumo.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Média</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Transações</CardTitle>
          <CardDescription>Visualize e gerencie todas as transações realizadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input 
                placeholder="Buscar por ID, cliente, email ou plano" 
                className="pl-8" 
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="reembolsado">Reembolsado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={metodoFiltro} onValueChange={setMetodoFiltro}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os métodos</SelectItem>
                  <SelectItem value="credito">Cartão de Crédito</SelectItem>
                  <SelectItem value="debito">Cartão de Débito</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={plataformaFiltro} onValueChange={setPlataformaFiltro}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as plataformas</SelectItem>
                  <SelectItem value="tappylink">Tappy Link</SelectItem>
                  <SelectItem value="tappyespacos">Tappy Espaços</SelectItem>
                  <SelectItem value="tappywhatsapp">Tappy WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex flex-row gap-2">
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input 
                    type="date" 
                    className="pl-8 w-[180px]" 
                    placeholder="Data Início"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input 
                    type="date" 
                    className="pl-8 w-[180px]" 
                    placeholder="Data Fim"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </div>
              </div>
              
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Tabela de pagamentos */}
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Plataforma</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carregando ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <div className="mt-2 text-sm text-gray-500">Carregando pagamentos...</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : pagamentosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <div className="text-gray-500">Nenhum pagamento encontrado</div>
                    </TableCell>
                  </TableRow>
                ) : (
                  pagamentosFiltrados.map((pagamento) => (
                  <TableRow key={pagamento.id}>
                    <TableCell>{pagamento.cliente}</TableCell>
                    <TableCell>{pagamento.plano}</TableCell>
                    <TableCell>{pagamento.valor}</TableCell>
                    <TableCell>{pagamento.metodo}</TableCell>
                    <TableCell>{renderStatus(pagamento.status)}</TableCell>
                    <TableCell>{pagamento.data}</TableCell>
                    <TableCell>{pagamento.plataforma || '-'}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => abrirDetalhes(pagamento)}>
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Enviar e-mail
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )))
                }
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
      
      {/* Modal de Detalhes do Pedido */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido</DialogTitle>
            <DialogDescription>
              Informações completas sobre o pedido e a assinatura.
            </DialogDescription>
          </DialogHeader>
          
          {pedidoSelecionado && (
            <div className="space-y-6 py-4">
              {/* Informações do cliente */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Cliente</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold">{pedidoSelecionado.cliente}</p>
                    <p className="text-sm text-muted-foreground">{pedidoSelecionado.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">ID da Transação</p>
                    <p className="text-sm text-muted-foreground">{pedidoSelecionado.transactionId || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Informações do Plano</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold">Plano</p>
                    <p className="text-sm text-muted-foreground">{pedidoSelecionado.plano}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Plataforma</p>
                    <p className="text-sm text-muted-foreground">{pedidoSelecionado.plataforma}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Informações de Pagamento</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold">Valor</p>
                    <p className="text-sm text-muted-foreground">{pedidoSelecionado.valor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Método</p>
                    <p className="text-sm text-muted-foreground">{pedidoSelecionado.metodo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Status</p>
                    <div className="text-sm">{renderStatus(pedidoSelecionado.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Data do Pagamento</p>
                    <p className="text-sm text-muted-foreground">{pedidoSelecionado.data}</p>
                  </div>
                </div>
              </div>
              
              {/* Período de Assinatura com Barra de Progresso */}
              {pedidoSelecionado.inicio && pedidoSelecionado.fim && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Período de Assinatura</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{new Date(pedidoSelecionado.inicio).toLocaleDateString('pt-BR')}</span>
                      <span>{new Date(pedidoSelecionado.fim).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <Progress value={calcularProgressoPlano(pedidoSelecionado.inicio, pedidoSelecionado.fim)} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground mt-1">
                      Progresso da assinatura: {calcularProgressoPlano(pedidoSelecionado.inicio, pedidoSelecionado.fim)}%
                    </p>
                  </div>
                </div>
              )}
              
              {/* Link para recibo/comprovante se disponível */}
              {pedidoSelecionado.receiptUrl && (
                <div className="border-t pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <a href={pedidoSelecionado.receiptUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Ver Comprovante
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
