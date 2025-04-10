'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { Topbar } from '@/components/dashboard/layout/topbar';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  // Proteger as rotas do dashboard, redirecionando para login se não estiver autenticado
  if (status === 'unauthenticated') {
    redirect('/login');
  }

  // Exibir loading enquanto verifica a autenticação
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#25D366]"></div>
      </div>
    );
  }

  // Se estiver autenticado, mostrar o layout do dashboard
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar (barra lateral esquerda) */}
      <Sidebar />
      
      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar (barra superior) */}
        <Topbar />
        
        {/* Conteúdo da página */}
        <main className="flex-1 overflow-y-auto bg-muted/20 dark:bg-background p-6">
          {children}
        </main>
      </div>
      
      {/* Toaster para notificações */}
      <Toaster position="top-right" richColors theme="system" />
    </div>
  );
}
