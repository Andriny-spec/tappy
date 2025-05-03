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

// Definindo tipos para pagamentos
type Pagamento = {
  id: string;
  cliente: string;
  email: string;
  data: string;
  valor: string;
  metodo: string;
  plano: string;
  status: string;
};

// Array vazio para pagamentos
const pagamentosVazios: Pagamento[] = [];

export default function PagamentosPage() {
  const [filtro, setFiltro] = useState('');
  const [activeTab, setActiveTab] = useState('todos');
  const [periodo, setPeriodo] = useState('ultimo-mes');
  
  // Não temos pagamentos - estado vazio
  const pagamentos: Pagamento[] = [];
  
  // Renderização do status com cores apropriadas
  const renderStatus = (status: string) => {
    switch(status) {
      case 'Aprovado':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"><Check className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'Pendente':
        return <Badge variant="outline" className="text-amber-600 border-amber-300 dark:text-amber-400"><Clock className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'Reembolsado':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"><X className="h-3 w-3 mr-1" /> {status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
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
              <div className="text-2xl font-bold dark:text-white">R$ 0,00</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <CalendarIcon className="h-3 w-3" />
                Último mês
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-900/20 dark:to-red-800/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <RefreshCcw className="h-4 w-4 text-red-500" />
                Reembolsos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">R$ 0,00</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <CalendarIcon className="h-3 w-3" />
                Último mês
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">0</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <CalendarIcon className="h-3 w-3" />
                Último mês
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
              <div className="text-2xl font-bold dark:text-white">R$ 0,00</div>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <CalendarIcon className="h-3 w-3" />
                Último mês
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
                  <TabsTrigger value="aprovados" className="text-xs">Aprovados</TabsTrigger>
                  <TabsTrigger value="pendentes" className="text-xs">Pendentes</TabsTrigger>
                  <TabsTrigger value="reembolsados" className="text-xs">Reembolsados</TabsTrigger>
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
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                        <TableHead className="w-[80px] font-medium">ID</TableHead>
                        <TableHead className="font-medium">Cliente</TableHead>
                        <TableHead className="font-medium">Plano</TableHead>
                        <TableHead className="font-medium">Data</TableHead>
                        <TableHead className="font-medium">Valor</TableHead>
                        <TableHead className="font-medium">Método</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium w-[80px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagamentos.length > 0 ? (
                        pagamentos.map((pagamento) => (
                          <TableRow key={pagamento.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <TableCell className="font-medium">{pagamento.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{pagamento.cliente}</span>
                                <span className="text-xs text-muted-foreground">{pagamento.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>{pagamento.plano}</TableCell>
                            <TableCell>{pagamento.data}</TableCell>
                            <TableCell className="font-medium">{pagamento.valor}</TableCell>
                            <TableCell>{pagamento.metodo}</TableCell>
                            <TableCell>{renderStatus(pagamento.status)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="gap-2 cursor-pointer">
                                    <Eye className="h-4 w-4" />
                                    <span>Ver detalhes</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2 cursor-pointer">
                                    <FileText className="h-4 w-4" />
                                    <span>Baixar recibo</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2 cursor-pointer">
                                    <Mail className="h-4 w-4" />
                                    <span>Enviar por email</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600">
                                    <RefreshCcw className="h-4 w-4" />
                                    <span>Solicitar reembolso</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-[400px] text-center">
                            <div className="flex flex-col items-center justify-center py-10">
                              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                                <Wallet className="h-10 w-10 text-gray-400" />
                              </div>
                              <h3 className="text-xl font-semibold mb-2">Nenhum pagamento encontrado</h3>
                              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                                Você ainda não registrou nenhum pagamento. 
                                Quando você adquirir um plano ou realizar uma transação, 
                                os detalhes aparecerão aqui.
                              </p>
                              <Button className="gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                                <ShoppingCart className="h-4 w-4" />
                                <span>Explorar planos disponíveis</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="aprovados" className="m-0">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <Check className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Nenhum pagamento aprovado</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                      Você ainda não possui pagamentos aprovados.
                      Quando suas transações forem processadas com sucesso, 
                      elas aparecerão nesta seção.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pendentes" className="m-0">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <Clock className="h-10 w-10 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Nenhum pagamento pendente</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                      Não há pagamentos aguardando aprovação no momento.
                      Quando você iniciar uma nova transação, ela aparecerá 
                      aqui até ser processada.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reembolsados" className="m-0">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <RefreshCcw className="h-10 w-10 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Nenhum reembolso encontrado</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                      Você não possui nenhum reembolso registrado.
                      Se precisar solicitar algum reembolso, entre em contato
                      com nosso suporte.
                    </p>
                    <Button variant="outline" className="gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>Fale com o suporte</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
          
          <CardFooter className="flex items-center justify-between pt-2 pb-6 px-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando 0 de 0 resultados
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Próximo
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Dicas e recursos úteis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-blue-500" />
              Dicas e recursos
            </CardTitle>
            <CardDescription>
              Aprenda a gerenciar suas finanças e optimize sua experiência na Tappy
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border-0">
              <CardHeader className="py-4 px-4">
                <CardTitle className="text-sm">Relatório financeiro</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Acompanhe seus gastos e visualize análises detalhadas do seu histórico financeiro.
                </p>
              </CardContent>
              <CardFooter className="py-3 px-4">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0">
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-xs">Ver relatórios</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border-0">
              <CardHeader className="py-4 px-4">
                <CardTitle className="text-sm">Métodos de pagamento</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Gerencie seus cartões e métodos de pagamento para facilitar futuras transações.
                </p>
              </CardContent>
              <CardFooter className="py-3 px-4">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0">
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-xs">Gerenciar métodos</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border-0">
              <CardHeader className="py-4 px-4">
                <CardTitle className="text-sm">Faturas e recibos</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Acesse, baixe e compartilhe suas faturas e recibos fiscais a qualquer momento.
                </p>
              </CardContent>
              <CardFooter className="py-3 px-4">
                <Button variant="ghost" size="sm" className="w-full justify-start gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0">
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-xs">Ver documentos</span>
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}