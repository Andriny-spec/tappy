'use client';

import { useState } from 'react';
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

// Dados mockados de pagamentos
const pagamentosMock = [
  {
    id: '1',
    cliente: 'Carlos Silva',
    email: 'carlos.silva@gmail.com',
    data: '27/03/2025',
    valor: 'R$ 97,00',
    metodo: 'Cartão de Crédito',
    plano: 'Tappy ID Premium',
    status: 'Aprovado'
  },
  {
    id: '2',
    cliente: 'Ana Rodrigues',
    email: 'ana.rodrigues@hotmail.com',
    data: '26/03/2025',
    valor: 'R$ 59,90',
    metodo: 'PIX',
    plano: 'Tappy WhatsApp Pro',
    status: 'Aprovado'
  },
  {
    id: '3',
    cliente: 'Marcelo Alves',
    email: 'marcelo.alves@gmail.com',
    data: '25/03/2025',
    valor: 'R$ 127,00',
    metodo: 'Cartão de Débito',
    plano: 'Tappy Imob Completo',
    status: 'Aprovado'
  },
  {
    id: '4',
    cliente: 'Juliana Mendes',
    email: 'juliana.mendes@outlook.com',
    data: '25/03/2025',
    valor: 'R$ 97,00',
    metodo: 'Cartão de Crédito',
    plano: 'Tappy ID Premium',
    status: 'Reembolsado'
  },
  {
    id: '5',
    cliente: 'Roberto Santos',
    email: 'roberto.santos@gmail.com',
    data: '24/03/2025',
    valor: 'R$ 59,90',
    metodo: 'PIX',
    plano: 'Tappy WhatsApp Pro',
    status: 'Pendente'
  }
];

export default function PagamentosPage() {
  const [filtro, setFiltro] = useState('');
  
  // Funções de filtro
  const pagamentosFiltrados = pagamentosMock.filter(pagamento => 
    pagamento.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    pagamento.email.toLowerCase().includes(filtro.toLowerCase()) ||
    pagamento.plano.toLowerCase().includes(filtro.toLowerCase())
  );
  
  // Renderização do status com cores apropriadas
  const renderStatus = (status: string) => {
    switch(status) {
      case 'Aprovado':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"><Check className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'Pendente':
        return <Badge variant="outline" className="text-amber-600 border-amber-300 dark:text-amber-400"><Calendar className="h-3 w-3 mr-1" /> {status}</Badge>;
      case 'Reembolsado':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"><X className="h-3 w-3 mr-1" /> {status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
            <div className="text-2xl font-bold dark:text-white">R$ 138.450,00</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Último mês</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Reembolsos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">R$ 970,00</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Último mês</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">1.743</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Último mês</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">R$ 79,43</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Último mês</div>
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
                placeholder="Buscar por cliente, email ou plano" 
                className="pl-8" 
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-2">
              <Select defaultValue="todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="reembolsado">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="todos">
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
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagamentosFiltrados.map((pagamento) => (
                  <TableRow key={pagamento.id}>
                    <TableCell className="font-medium">{pagamento.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{pagamento.cliente}</div>
                      <div className="text-sm text-muted-foreground">{pagamento.email}</div>
                    </TableCell>
                    <TableCell>{pagamento.data}</TableCell>
                    <TableCell>{pagamento.valor}</TableCell>
                    <TableCell>{pagamento.metodo}</TableCell>
                    <TableCell>{pagamento.plano}</TableCell>
                    <TableCell>{renderStatus(pagamento.status)}</TableCell>
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
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Enviar recibo</DropdownMenuItem>
                          <DropdownMenuItem>Reembolsar</DropdownMenuItem>
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
    </div>
  );
}
