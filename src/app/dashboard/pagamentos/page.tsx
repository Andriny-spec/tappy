'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Download,
  DollarSign,
  RefreshCcw, 
  Filter, 
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  Check,
  X,
  Clock,
  CreditCardIcon,
  FileText,
  CalendarIcon,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
  Wallet,
  Eye,
  Mail,
  BarChart4,
  FileDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Definindo tipos para pagamentos
type Pagamento = {
  id: string;
  cliente: string;
  email: string;
  data: string;
  valor: string;
  metodo: string;
  plano: string;
  tipoPeriodo: string;
  plataforma: string;
  status: string;
};

type Metrics = {
  totalReceived: number;
  averageTicket: number;
};

export default function PagamentosPage() {
  const [filtro, setFiltro] = useState('');
  const [activeTab, setActiveTab] = useState('todos');
  const [periodo, setPeriodo] = useState('ultimo-mes');
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metrics>({ totalReceived: 0, averageTicket: 0 });
  
  // Estados para os modais
  const [detalhesModalOpen, setDetalhesModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedPagamento, setSelectedPagamento] = useState<Pagamento | null>(null);
  const [emailAssunto, setEmailAssunto] = useState('');
  const [emailConteudo, setEmailConteudo] = useState('');
  const emailFormRef = useRef<HTMLFormElement>(null);

  // Buscar pagamentos da API
  const fetchPagamentos = async () => {
    try {
      setLoading(true);
      
      // Construir URL com parâmetros de filtro
      const params = new URLSearchParams();
      if (activeTab !== 'todos') {
        params.append('status', activeTab.toUpperCase());
      }
      params.append('periodo', periodo);
      if (filtro) {
        params.append('search', filtro);
      }
      
      const response = await fetch(`/api/pagamentos?${params.toString()}`);
      const data = await response.json();
      
      if (data.payments) {
        setPagamentos(data.payments);
        setMetrics(data.metrics || { totalReceived: 0, averageTicket: 0 });
      } else {
        setPagamentos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar pagamentos:', error);
      setPagamentos([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Buscar pagamentos quando os filtros mudarem
  useEffect(() => {
    fetchPagamentos();
  }, [activeTab, periodo, filtro]);
  
  // Renderização do status com cores apropriadas
  const renderStatus = (status: string) => {
    switch(status.toUpperCase()) {
      case 'APROVADO':
      case 'PAID':
      case 'PAGO':
        return <Badge className="bg-[#dcf8c6] text-[#075e54] hover:bg-[#dcf8c6] border-[#25D366] border"><Check className="h-3 w-3 mr-1" /> PAGO</Badge>;
      case 'PENDENTE':
      case 'PENDING':
        return <Badge variant="outline" className="text-amber-600 border-amber-300 dark:text-amber-400"><Clock className="h-3 w-3 mr-1" /> PENDENTE</Badge>;
      case 'REEMBOLSADO':
      case 'CANCELADO':
      case 'REFUNDED':
      case 'CANCELED':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"><X className="h-3 w-3 mr-1" /> CANCELADO</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pagamentos</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Visualize e gerencie todas as transações da sua conta Tappy
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultimo-mes">Último mês</SelectItem>
                <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
                <SelectItem value="ultimos-6-meses">Últimos 6 meses</SelectItem>
                <SelectItem value="ultimo-ano">Último ano</SelectItem>
                <SelectItem value="todos">Todo o período</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="gap-1">
              <FileDown className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Cards de resumo com glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-900/20 dark:to-green-800/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                Total Recebido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  `R$ ${metrics.totalReceived.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <CalendarIcon className="h-3 w-3" />
                {periodo === 'ultimo-mes' ? 'Último mês' : 
                 periodo === 'ultimos-3-meses' ? 'Últimos 3 meses' : 
                 periodo === 'ultimos-6-meses' ? 'Últimos 6 meses' : 
                 periodo === 'ultimo-ano' ? 'Último ano' : 'Todo período'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-900/20 dark:to-purple-800/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                Ticket Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">
                {loading ? (
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  `R$ ${metrics.averageTicket.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <CalendarIcon className="h-3 w-3" />
                {periodo === 'ultimo-mes' ? 'Último mês' : 
                 periodo === 'ultimos-3-meses' ? 'Últimos 3 meses' : 
                 periodo === 'ultimos-6-meses' ? 'Últimos 6 meses' : 
                 periodo === 'ultimo-ano' ? 'Último ano' : 'Todo período'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Seção dos pagamentos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
                  <TabsTrigger value="todos" className="text-xs">Todos</TabsTrigger>
                  <TabsTrigger value="aprovado" className="text-xs">Aprovados</TabsTrigger>
                  <TabsTrigger value="pendente" className="text-xs">Pendentes</TabsTrigger>
                  <TabsTrigger value="reembolsado" className="text-xs">Reembolsados</TabsTrigger>
                </TabsList>
                
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input 
                    placeholder="Buscar por cliente, email, plano..." 
                    className="w-full sm:w-[300px] pl-8" 
                    value={filtro} 
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              <TabsContent value="todos" className="m-0">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="hidden md:table-cell">Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="hidden lg:table-cell">Plano</TableHead>
                        <TableHead className="hidden lg:table-cell">Período</TableHead>
                        <TableHead className="hidden xl:table-cell">Plataforma</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        // Estado de carregamento
                        Array(3).fill(0).map((_, i) => (
                          <TableRow key={`skeleton-${i}`}>
                            <TableCell>
                              <div className="flex flex-col gap-2">
                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </TableCell>
                            <TableCell>
                              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : pagamentos.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center">
                              <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
                              <p className="text-lg font-medium mb-1">Nenhum pagamento encontrado</p>
                              <p className="text-sm text-gray-500">Não há pagamentos para exibir com os filtros selecionados.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        pagamentos.map((pagamento) => (
                          <TableRow key={pagamento.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{pagamento.cliente}</span>
                                <span className="text-gray-500 text-xs">{pagamento.email}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(pagamento.data).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell>R$ {parseFloat(pagamento.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</TableCell>
                            <TableCell className="hidden lg:table-cell">{pagamento.plano}</TableCell>
                            <TableCell className="hidden lg:table-cell">{pagamento.tipoPeriodo || 'Mensal'}</TableCell>
                            <TableCell className="hidden xl:table-cell">
                              {pagamento.plataforma ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                  <span>{pagamento.plataforma}</span>
                                </div>
                              ) : 'Não especificado'}
                            </TableCell>
                            <TableCell>{renderStatus(pagamento.status)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedPagamento(pagamento);
                                    setDetalhesModalOpen(true);
                                  }}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>Ver detalhes</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedPagamento(pagamento);
                                    setEmailModalOpen(true);
                                    setEmailAssunto(`Informações sobre seu pagamento - ${pagamento.plano}`);
                                    setEmailConteudo(`Olá ${pagamento.cliente},\n\nSegue informações sobre seu pagamento:\n\nPlano: ${pagamento.plano}\nValor: R$ ${parseFloat(pagamento.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}\nStatus: ${pagamento.status}\n\nAtenciosamente,\nEquipe Tappy`);
                                  }}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Enviar por email</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    // Formatar número de telefone para WhatsApp (remover caracteres não numéricos)
                                    const phoneNumber = pagamento.email.includes('@') ? '' : pagamento.email.replace(/\D/g, '');
                                    
                                    // Se não tiver número de telefone no campo email, mostrar mensagem
                                    if (!phoneNumber) {
                                      toast.warning("Número de WhatsApp não disponível para este cliente");
                                      return;
                                    }
                                    
                                    // Mensagem pré-formatada
                                    const message = `Olá ${pagamento.cliente}, tudo bem? Estou entrando em contato a respeito do seu plano ${pagamento.plano} na Tappy.`;
                                    
                                    // Criar URL para WhatsApp
                                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                    
                                    // Abrir WhatsApp em nova janela
                                    window.open(whatsappUrl, '_blank');
                                  }}>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Contato via WhatsApp</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="aprovado" className="m-0">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="hidden md:table-cell">Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="hidden lg:table-cell">Plano</TableHead>
                        <TableHead className="hidden lg:table-cell">Período</TableHead>
                        <TableHead className="hidden xl:table-cell">Plataforma</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* O mesmo conteúdo da tabela acima será renderizado pelo filtro */}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="pendente" className="m-0">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="hidden md:table-cell">Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="hidden lg:table-cell">Plano</TableHead>
                        <TableHead className="hidden lg:table-cell">Período</TableHead>
                        <TableHead className="hidden xl:table-cell">Plataforma</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* O mesmo conteúdo da tabela acima será renderizado pelo filtro */}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="reembolsado" className="m-0">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead className="hidden md:table-cell">Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="hidden lg:table-cell">Plano</TableHead>
                        <TableHead className="hidden lg:table-cell">Período</TableHead>
                        <TableHead className="hidden xl:table-cell">Plataforma</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* O mesmo conteúdo da tabela acima será renderizado pelo filtro */}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
    
    {/* Modal de Detalhes do Pagamento */}
    <Dialog open={detalhesModalOpen} onOpenChange={setDetalhesModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Pagamento</DialogTitle>
          <DialogDescription>
            Informações completas sobre esta transação e status do webhook.
          </DialogDescription>
        </DialogHeader>
        
        {selectedPagamento && (
          <div className="grid gap-4">
            {/* Dados do cliente e pagamento */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cliente</h3>
                <p className="text-base">{selectedPagamento.cliente}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="text-base">{selectedPagamento.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Data</h3>
                <p className="text-base">{new Date(selectedPagamento.data).toLocaleDateString('pt-BR')} às {new Date(selectedPagamento.data).toLocaleTimeString('pt-BR')}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Valor</h3>
                <p className="text-base font-medium">R$ {parseFloat(selectedPagamento.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Plano</h3>
                <p className="text-base">{selectedPagamento.plano}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Período</h3>
                <p className="text-base">{selectedPagamento.tipoPeriodo || 'Mensal'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Plataforma</h3>
                <p className="text-base">{selectedPagamento.plataforma || 'Não especificado'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                <div className="mt-1">{renderStatus(selectedPagamento.status)}</div>
              </div>
            </div>
            
            {/* Status do webhook */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md mt-2">
              <h3 className="text-sm font-medium mb-2">Status do Webhook Kirvano</h3>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Webhook recebido - {new Date(selectedPagamento.data).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Pagamento processado</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Assinante atualizado</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setDetalhesModalOpen(false)}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
    {/* Modal de Envio de Email */}
    <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Enviar Email ao Cliente</DialogTitle>
          <DialogDescription>
            Escreva uma mensagem personalizada para o cliente.
          </DialogDescription>
        </DialogHeader>
        
        {selectedPagamento && (
          <form 
            ref={emailFormRef}
            onSubmit={(e) => {
              e.preventDefault();
              // Simulando o envio do email
              toast.success(`Email enviado com sucesso para ${selectedPagamento.cliente}!`);
              setEmailModalOpen(false);
            }}
            className="grid gap-4"
          >
            <div>
              <label htmlFor="recipient" className="text-sm font-medium">Destinatário</label>
              <Input id="recipient" value={selectedPagamento.email} disabled className="mt-1" />
            </div>
            <div>
              <label htmlFor="assunto" className="text-sm font-medium">Assunto</label>
              <Input 
                id="assunto" 
                value={emailAssunto} 
                onChange={(e) => setEmailAssunto(e.target.value)} 
                placeholder="Assunto do email" 
                className="mt-1" 
                required 
              />
            </div>
            <div>
              <label htmlFor="conteudo" className="text-sm font-medium">Conteúdo</label>
              <Textarea 
                id="conteudo" 
                value={emailConteudo} 
                onChange={(e) => setEmailConteudo(e.target.value)} 
                rows={8} 
                placeholder="Digite aqui o conteúdo do email..." 
                className="mt-1" 
                required 
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEmailModalOpen(false)}>Cancelar</Button>
              <Button type="submit">Enviar Email</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}