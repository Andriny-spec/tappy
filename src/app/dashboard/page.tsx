import { BarChart, ArrowUp, ArrowDown, Users, CreditCard, Eye, MousePointer, ArrowUpRight, Smartphone, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// @ts-ignore - O módulo existe mas o TypeScript não consegue encontrá-lo
import { getDashboardMetrics } from '@/lib/actions/dashboard';

// Interface para tipar as plataformas e métricas
interface PlatformMetrics {
  id: string;
  name: string;
  slug: string;
  description: string;
  subscribers: number;
  revenue: number;
  refunds: number;
  views: number;
  clicks: number;
  conversionRate: string;
  webViews: number;
  mobileViews: number;
  growth: string;
  isPositiveGrowth: boolean;
}

interface DashboardData {
  platforms: PlatformMetrics[];
  totals: {
    views: number;
    clicks: number;
    subscribers: number;
    revenue: number;
    viewsGrowth: number;
    clicksGrowth: number;
    subscribersGrowth: number;
    revenueGrowth: number;
  };
}

export default async function DashboardPage() {
  // Buscar dados dinâmicos do Prisma
  const { platforms, totals } = await getDashboardMetrics() as DashboardData;
  
  // Funções auxiliares para formatação
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Visão Geral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cards de Métricas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Visualizações Totais</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatNumber(totals.views)}</div>
            <div className={`flex items-center pt-1 text-xs ${totals.viewsGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.viewsGrowth >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{totals.viewsGrowth >= 0 ? '+' : ''}{totals.viewsGrowth}%</span>
              <span className="text-gray-500 ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Cliques Totais</CardTitle>
            <MousePointer className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatNumber(totals.clicks)}</div>
            <div className={`flex items-center pt-1 text-xs ${totals.clicksGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.clicksGrowth >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{totals.clicksGrowth >= 0 ? '+' : ''}{totals.clicksGrowth}%</span>
              <span className="text-gray-500 ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Assinantes Ativos</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatNumber(totals.subscribers)}</div>
            <div className={`flex items-center pt-1 text-xs ${totals.subscribersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.subscribersGrowth >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{totals.subscribersGrowth >= 0 ? '+' : ''}{totals.subscribersGrowth}%</span>
              <span className="text-gray-500 ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Faturamento Bruto</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatCurrency(totals.revenue)}</div>
            <div className={`flex items-center pt-1 text-xs ${totals.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.revenueGrowth >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{totals.revenueGrowth >= 0 ? '+' : ''}{totals.revenueGrowth}%</span>
              <span className="text-gray-500 ml-1">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-gray-100">Métricas por Plataforma</h2>
          <TabsList className="bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="tappyid">Tappy ID</TabsTrigger>
            <TabsTrigger value="tappywhats">Tappy WhatsApp</TabsTrigger>
            <TabsTrigger value="tappyimob">Tappy Imob</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="border-none p-0 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {platforms.map((platform: PlatformMetrics) => (
              <Card key={platform.id}>
                <CardHeader>
                  <CardTitle className="dark:text-white">{platform.name}</CardTitle>
                  <CardDescription className="dark:text-gray-400">{platform.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Visualizações</p>
                      <p className="text-lg font-medium dark:text-gray-200">{formatNumber(platform.views)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Cliques</p>
                      <p className="text-lg font-medium dark:text-gray-200">{formatNumber(platform.clicks)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Assinantes</p>
                      <p className="text-lg font-medium dark:text-gray-200">{formatNumber(platform.subscribers)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Taxa de Conversão</p>
                      <p className="text-lg font-medium dark:text-gray-200">{platform.conversionRate}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Faturamento</p>
                      <p className="text-lg font-medium dark:text-gray-200">{formatCurrency(platform.revenue)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reembolsos</p>
                      <p className="text-lg font-medium dark:text-gray-200">{formatCurrency(platform.refunds)}</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#25D366]" />
                        <span>Web</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{formatNumber(platform.webViews)}</span>
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-[#25D366]" />
                        <span>Mobile</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{formatNumber(platform.mobileViews)}</span>
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                    
                    <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                      <BarChart className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Conteúdo para as abas específicas de cada plataforma */}
        {platforms.map((platform: PlatformMetrics) => (
          <TabsContent key={platform.slug} value={`tappy${platform.slug}`} className="border-none p-0 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Métricas de Assinantes</CardTitle>
                  <CardDescription>Dados sobre assinantes do {platform.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Total de Assinantes</p>
                      <p className="text-xl font-semibold">{formatNumber(platform.subscribers)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Taxa de Conversão</p>
                      <p className="text-xl font-semibold">{platform.conversionRate}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Crescimento</p>
                      <div className={`flex items-center text-sm ${platform.isPositiveGrowth ? 'text-green-500' : 'text-red-500'}`}>
                        {platform.isPositiveGrowth ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                        <span>{platform.growth}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Faturamento e Financeiro</CardTitle>
                  <CardDescription>Receita do {platform.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Receita Total</p>
                      <p className="text-xl font-semibold">{formatCurrency(platform.revenue)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Reembolsos</p>
                      <p className="text-xl font-semibold">{formatCurrency(platform.refunds)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Receita Líquida</p>
                      <p className="text-xl font-semibold">{formatCurrency(platform.revenue - platform.refunds)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Engajamento</CardTitle>
                  <CardDescription>Métricas de visualização e cliques</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Visualizações</p>
                      <p className="text-xl font-semibold">{formatNumber(platform.views)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Cliques</p>
                      <p className="text-xl font-semibold">{formatNumber(platform.clicks)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Web</p>
                      <p className="text-xl font-semibold">{formatNumber(platform.webViews)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Mobile</p>
                      <p className="text-xl font-semibold">{formatNumber(platform.mobileViews)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="dark:text-white">Gráfico de Performance</CardTitle>
                  <CardDescription>Evolução da plataforma</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>Gráfico de crescimento será implementado em breve</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
