import { Suspense } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Users,
  CreditCard,
  BarChart,
} from 'lucide-react';

import { getPlanStats, getAllPlans } from '@/lib/actions/plan';
import ListaPlanos from '@/components/dashboard/planos/lista-planos';
import PlanosActions from '@/components/dashboard/planos/planos-actions';

async function PlanosStatsWidget() {
  const stats = await getPlanStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Planos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-white">{stats?.totalPlans || 0}</div>
          <div className="text-xs text-green-600 mt-1">Gerenciando {stats?.platformsCount?.length || 0} plataformas</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Plano Mais Popular</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.popularPlans && stats.popularPlans.length > 0 ? (
            <>
              <div className="text-2xl font-bold dark:text-white">{stats.popularPlans[0].name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stats.popularPlans[0]._count.subscribers} assinantes
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold dark:text-white">Sem dados</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nenhum assinante ainda</div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Assinantes Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-white">{stats?.activeSubscribers || 0}</div>
          <div className="text-xs text-green-600 mt-1">
            <span>Em todas as plataformas</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function PlanosListaWrapper() {
  try {
    const { plans, error } = await getAllPlans();
    return <ListaPlanos planos={plans} erro={error} />;
  } catch (error) {
    console.error('Erro ao carregar planos:', error);
    return <ListaPlanos planos={[]} erro="Ocorreu um erro ao carregar os planos. Tente novamente mais tarde." />;
  }
}

export default async function PlanosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Planos</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gerencie os planos disponíveis em todas as plataformas Tappy.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-24 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"></div>}>
        <PlanosStatsWidget />
      </Suspense>
      
      <PlanosActions />
      
      <Suspense fallback={
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-60 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"></div>
          ))}
        </div>
      }>
        <PlanosListaWrapper />
      </Suspense>
    </div>
  );
}
