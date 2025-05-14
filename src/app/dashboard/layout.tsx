'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/layout/sidebar';
import { Topbar } from '@/components/dashboard/layout/topbar';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/contexts/sidebar-context';
import { useEffect } from 'react';
import { SessionStorage } from '@/lib/session-storage';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  // Gerenciar persistência da sessão
  useEffect(() => {
    // Se estiver autenticado, salvar o token e atualizar atividade
    if (status === 'authenticated' && session) {
      // @ts-ignore - o token existe mas não está no tipo
      const token = session?.token || '';
      if (token) SessionStorage.saveSession(token);
      
      // Configurar um intervalo para atualizar a atividade a cada 5 minutos
      const interval = setInterval(() => {
        SessionStorage.updateActivity();
      }, 5 * 60 * 1000);
      
      // Atualizar a atividade em cada interação do usuário
      const updateOnActivity = () => SessionStorage.updateActivity();
      document.addEventListener('click', updateOnActivity);
      document.addEventListener('keypress', updateOnActivity);
      document.addEventListener('scroll', updateOnActivity);
      
      return () => {
        clearInterval(interval);
        document.removeEventListener('click', updateOnActivity);
        document.removeEventListener('keypress', updateOnActivity);
        document.removeEventListener('scroll', updateOnActivity);
      };
    }
  }, [status, session]);
  
  // Verificar se existe uma sessão personalizada no localStorage (para desenvolvimento local)
  useEffect(() => {
    // Só verificar localStorage se o status for unauthenticated
    if (status === 'unauthenticated') {
      try {
        const localSession = localStorage.getItem('tappy_session');
        if (localSession) {
          const sessionData = JSON.parse(localSession);
          const now = new Date();
          const expires = new Date(sessionData.expires);
          
          // Se a sessão não estiver expirada, usar essa sessão local
          if (expires > now) {
            console.log('Usando sessão local em vez de NextAuth');
            // Não redirecionar para login
            return;
          } else {
            console.log('Sessão local expirada');
            localStorage.removeItem('tappy_session');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão local:', error);
      }
    }
  }, [status]);
  
  // Proteger as rotas do dashboard, redirecionando para login se não estiver autenticado
  // e se não tiver sessão local válida
  useEffect(() => {
    // Verificar localStorage primeiro (uma vez, no cliente)
    try {
      const localSession = localStorage.getItem('tappy_session');
      if (localSession) {
        const sessionData = JSON.parse(localSession);
        const now = new Date();
        const expires = new Date(sessionData.expires);
        
        if (expires > now) {
          // Sessão válida no localStorage, permitir acesso
          return;
        }
      }
      
      // Se não houver sessão válida no localStorage e NextAuth não estiver autenticado
      if (status === 'unauthenticated') {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
    }
  }, [status]);

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
    <SidebarProvider>
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
    </SidebarProvider>
  );
}
