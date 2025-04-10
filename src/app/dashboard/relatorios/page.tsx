'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, DownloadIcon, Filter, FileBarChart, PieChart, BarChart, LineChart, Users, CreditCard, Search, ChevronDown } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Mock data para os gráficos
const mockLineChartData = [
  { x: 'Jan', y: 12500 },
  { x: 'Fev', y: 18200 },
  { x: 'Mar', y: 16800 },
  { x: 'Abr', y: 19500 },
  { x: 'Mai', y: 22300 },
  { x: 'Jun', y: 24100 },
  { x: 'Jul', y: 21800 },
  { x: 'Ago', y: 26500 },
  { x: 'Set', y: 28300 },
  { x: 'Out', y: 30200 },
  { x: 'Nov', y: 32800 },
  { x: 'Dez', y: 36500 },
];

const mockBarChartData = [
  { categoria: 'Tappy ID', valor: 45 },
  { categoria: 'Tappy Whats', valor: 32 },
  { categoria: 'Tappy Imob', valor: 18 },
  { categoria: 'Outros', valor: 5 },
];

const mockPieChartData = [
  { metodo: 'PIX', porcentagem: 62, cor: '#25D366' },
  { metodo: 'Cartão de Crédito', porcentagem: 28, cor: '#4E5BA6' },
  { metodo: 'Cartão de Débito', porcentagem: 10, cor: '#F5A623' },
];

const mockTransacoesData = [
  { data: '15/10/2023', assinante: 'Carlos Silva', valor: 'R$ 149,90', plano: 'Tappy Link - Premium', metodo: 'PIX' },
  { data: '14/10/2023', assinante: 'Maria Oliveira', valor: 'R$ 249,90', plano: 'Tappy Whats - Empresarial', metodo: 'Cartão de Crédito' },
  { data: '13/10/2023', assinante: 'João Pereira', valor: 'R$ 149,90', plano: 'Tappy Link - Premium', metodo: 'PIX' },
  { data: '12/10/2023', assinante: 'Ana Carolina', valor: 'R$ 99,90', plano: 'Tappy Link - Básico', metodo: 'Cartão de Débito' },
  { data: '11/10/2023', assinante: 'Rodrigo Alves', valor: 'R$ 149,90', plano: 'Tappy Link - Premium', metodo: 'PIX' },
];

export default function RelatoriosPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  // Definindo o tipo DateRange para resolver problemas de tipagem
  type DateRange = {
    from: Date | undefined;
    to?: Date | undefined;
  };

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  // Renderização simplificada dos gráficos
  const renderLineChart = () => (
    <div className="relative h-[300px] w-full mt-4 p-4">
      <div className="absolute inset-0 flex items-end px-4">
        {mockLineChartData.map((item, i) => (
          <div key={i} className="relative flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-[#25D366] dark:bg-[#25D366]/70 rounded-t-sm" 
              style={{ height: `${(item.y / 40000) * 100}%` }} 
            />
            <span className="text-xs mt-2 text-muted-foreground">{item.x}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBarChart = () => (
    <div className="relative h-[300px] flex items-end justify-around px-4 pt-6 pb-10 mt-4">
      {mockBarChartData.map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div 
            className="w-16 bg-[#25D366] dark:bg-[#25D366]/70 rounded-t-sm" 
            style={{ height: `${item.valor * 4}px` }} 
          />
          <span className="text-xs mt-2 text-muted-foreground whitespace-nowrap">{item.categoria}</span>
          <span className="text-xs font-semibold">{item.valor}%</span>
        </div>
      ))}
    </div>
  );

  const renderPieChart = () => (
    <div className="relative mt-4 flex justify-center items-center">
      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#25D366" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4E5BA6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="157" transform="rotate(-90 50 50)" />
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F5A623" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="220" transform="rotate(-90 50 50)" />
          </svg>
        </div>
      </div>
      <div className="ml-6 space-y-2">
        {mockPieChartData.map((item, i) => (
          <div key={i} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.cor }} />
            <div className="text-sm">{item.metodo} <span className="font-semibold ml-1">{item.porcentagem}%</span></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateRangePicker = () => (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[300px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                  {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange}
            onSelect={(range: DateRange | undefined) => range && setDateRange(range as DateRange)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select defaultValue="todas">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione a categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todas">Todas as categorias</SelectItem>
          <SelectItem value="id">Tappy ID</SelectItem>
          <SelectItem value="whats">Tappy Whats</SelectItem>
          <SelectItem value="imob">Tappy Imob</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="default" className="bg-[#25D366] hover:bg-[#128C7E]">
        <Filter className="mr-2 h-4 w-4" /> Filtrar
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Relatórios</h1>
        <p className="text-gray-500 dark:text-gray-400">Analise o desempenho e métricas do seu negócio.</p>
      </div>

      <div className="flex justify-between items-center">
        {renderDateRangePicker()}
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" /> Exportar Relatórios
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Receita Total</CardTitle>
            <CardDescription>Outubro 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 36.450,80</div>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <span className="i-lucide-trending-up mr-1" />+12.5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Novas Assinaturas</CardTitle>
            <CardDescription>Outubro 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <span className="i-lucide-trending-up mr-1" />+8.3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Taxa de Retenção</CardTitle>
            <CardDescription>Outubro 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94.2%</div>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <span className="i-lucide-trending-up mr-1" />+2.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="receitas" className="w-full">
        <TabsList className="bg-gray-100 dark:bg-gray-800 mb-6">
          <TabsTrigger value="receitas" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" /> Receitas
          </TabsTrigger>
          <TabsTrigger value="assinantes" className="flex items-center">
            <Users className="h-4 w-4 mr-2" /> Assinantes
          </TabsTrigger>
          <TabsTrigger value="planos" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" /> Planos
          </TabsTrigger>
          <TabsTrigger value="pagamentos" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" /> Métodos de Pagamento
          </TabsTrigger>
        </TabsList>

        {/* Tab de Receitas */}
        <TabsContent value="receitas">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Receitas</CardTitle>
              <CardDescription>Análise mensal de receitas no período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              {renderLineChart()}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Receita Total Anual: <span className="font-bold">R$ 289.500,00</span></div>
              <div className="text-sm text-muted-foreground">Média Mensal: <span className="font-bold">R$ 24.125,00</span></div>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Transações</CardTitle>
                <CardDescription>Transações mais recentes realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Data</th>
                        <th className="text-left py-3 px-4 font-medium">Assinante</th>
                        <th className="text-left py-3 px-4 font-medium">Plano</th>
                        <th className="text-left py-3 px-4 font-medium">Método</th>
                        <th className="text-right py-3 px-4 font-medium">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransacoesData.map((transaction, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4">{transaction.data}</td>
                          <td className="py-3 px-4">{transaction.assinante}</td>
                          <td className="py-3 px-4">{transaction.plano}</td>
                          <td className="py-3 px-4">{transaction.metodo}</td>
                          <td className="py-3 px-4 text-right font-medium">{transaction.valor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver Todas as Transações
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Assinantes */}
        <TabsContent value="assinantes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Crescimento de Assinantes</CardTitle>
                <CardDescription>Novos assinantes por mês</CardDescription>
              </CardHeader>
              <CardContent>
                {renderLineChart()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Assinantes</CardTitle>
                <CardDescription>Distribuição atual de status</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                      <span>Ativos</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">1240</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400">82%</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
                      <span>Inadimplentes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">165</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-800/20 dark:text-amber-400">11%</Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                      <span>Cancelados</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">105</span>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400">7%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Motivos de Cancelamento</CardTitle>
              <CardDescription>Principais motivos relatados pelos assinantes ao cancelar</CardDescription>
            </CardHeader>
            <CardContent>
              {renderBarChart()}
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Período: 01/07/2023 a 31/10/2023 • Total de cancelamentos: 105
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab de Planos */}
        <TabsContent value="planos">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Planos</CardTitle>
              <CardDescription>Proporção de assinantes por tipo de plano</CardDescription>
            </CardHeader>
            <CardContent>
              {renderBarChart()}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tappy ID</CardTitle>
                <CardDescription>3 planos ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>Básico</div>
                    <div className="font-semibold">320 assinantes</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>Premium</div>
                    <div className="font-semibold">458 assinantes</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>Empresarial</div>
                    <div className="font-semibold">174 assinantes</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Total: 952 assinantes
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tappy Whats</CardTitle>
                <CardDescription>2 planos ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>Básico</div>
                    <div className="font-semibold">246 assinantes</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>Empresarial</div>
                    <div className="font-semibold">189 assinantes</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Total: 435 assinantes
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tappy Imob</CardTitle>
                <CardDescription>1 plano ativo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>Profissional</div>
                    <div className="font-semibold">123 assinantes</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Total: 123 assinantes
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Métodos de Pagamento */}
        <TabsContent value="pagamentos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pagamento</CardTitle>
                <CardDescription>Distribuição de pagamentos por método</CardDescription>
              </CardHeader>
              <CardContent>
                {renderPieChart()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance por Método</CardTitle>
                <CardDescription>Taxa de sucesso e falha por método de pagamento</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#25D366] mr-2" />
                        <span>PIX</span>
                      </div>
                      <div className="font-semibold">99.7% de sucesso</div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <div className="h-full bg-[#25D366] rounded-full" style={{ width: '99.7%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#4E5BA6] mr-2" />
                        <span>Cartão de Crédito</span>
                      </div>
                      <div className="font-semibold">96.3% de sucesso</div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <div className="h-full bg-[#4E5BA6] rounded-full" style={{ width: '96.3%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#F5A623] mr-2" />
                        <span>Cartão de Débito</span>
                      </div>
                      <div className="font-semibold">98.1% de sucesso</div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <div className="h-full bg-[#F5A623] rounded-full" style={{ width: '98.1%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendência de Métodos de Pagamento</CardTitle>
              <CardDescription>Evolução da adoção de métodos de pagamento</CardDescription>
            </CardHeader>
            <CardContent>
              {renderLineChart()}
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Nota: O PIX continua sendo o método preferido pelos usuários, com crescimento constante.
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
