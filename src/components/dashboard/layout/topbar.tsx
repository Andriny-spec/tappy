'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { 
  Bell, 
  Sun, 
  Moon, 
  Maximize2, 
  Minimize2,
  ChevronDown,
  Check,
  CreditCard,
  UserPlus,
  X,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { signOut } from 'next-auth/react';

// Tipo para notificações
type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'payment' | 'subscriber' | 'system';
  read: boolean;
};

// Dados mockados para notificações
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novo assinante',
    description: 'Carlos Silva assinou o plano Premium do Tappy ID',
    time: 'Há 5 minutos',
    type: 'subscriber',
    read: false
  },
  {
    id: '2',
    title: 'Pagamento recebido',
    description: 'R$ 89,90 - Assinatura mensal de Maria Oliveira',
    time: 'Há 2 horas',
    type: 'payment',
    read: false
  },
  {
    id: '3',
    title: 'Falha no pagamento',
    description: 'Pagamento de João Santos foi recusado',
    time: 'Há 3 horas',
    type: 'payment',
    read: false
  },
  {
    id: '4',
    title: 'Novo assinante',
    description: 'Ana Souza assinou o plano Básico do Tappy WhatsApp',
    time: 'Há 5 horas',
    type: 'subscriber',
    read: true
  },
  {
    id: '5',
    title: 'Sistema atualizado',
    description: 'O sistema foi atualizado para a versão 2.3.0',
    time: 'Há 1 dia',
    type: 'system',
    read: true
  },
];

export function Topbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  // Contador de notificações não lidas
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Marcar todas as notificações como lidas
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Marcar uma única notificação como lida
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Função para alternar tela cheia
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Erro ao entrar em tela cheia: ${e.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Obter iniciais do nome do usuário para o fallback do avatar
  const getUserInitials = () => {
    if (!session?.user?.name) return 'TP';
    
    const nameParts = session.user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].substring(0, 2).toUpperCase();
    
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="flex h-14 items-center justify-between border-b border-border bg-background px-4 transition-colors duration-200">
      <div className="flex items-center">
                
      </div>
      
      <div className="flex items-center gap-4">
        {/* Botão de notificações com Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-medium text-white shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[380px] sm:w-[420px] overflow-auto" side="right">
            <SheetHeader className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-xl font-semibold">Notificações</SheetTitle>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-[#25D366] hover:text-[#128C7E] hover:bg-[#25D366]/10 text-xs"
                  >
                    Marcar todas como lidas
                  </Button>
                )}
              </div>
            </SheetHeader>
            
            <div className="space-y-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-10 w-10 text-gray-300 mb-3" />
                  <p className="text-gray-500">Nenhuma notificação</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id} className="group">
                    <div 
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${notification.read ? 'bg-background' : 'bg-[#25D366]/5 dark:bg-[#25D366]/10'} hover:bg-muted/50 dark:hover:bg-muted/20 cursor-pointer`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="rounded-full p-2 shrink-0">
                        {notification.type === 'payment' && (
                          <div className="bg-blue-100 rounded-full p-2">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                        {notification.type === 'subscriber' && (
                          <div className="bg-green-100 rounded-full p-2">
                            <UserPlus className="h-5 w-5 text-green-600" />
                          </div>
                        )}
                        {notification.type === 'system' && (
                          <div className="bg-purple-100 rounded-full p-2">
                            <ShieldAlert className="h-5 w-5 text-purple-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-sm text-gray-800">{notification.title}</p>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-[#25D366] group-hover:bg-gray-300"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                    <Separator className="my-1" />
                  </div>
                ))
              )}
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Botão de tema */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="bg-transparent hover:bg-muted/30"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          )}
        </Button>
        
        {/* Botão de tela cheia */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleFullScreen}
        >
          {isFullScreen ? (
            <Minimize2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Maximize2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </Button>
        
        {/* Menu de perfil */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 pl-0 pr-2 hover:bg-transparent"
            >
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage 
                  src={session?.user?.image || undefined} 
                  alt={session?.user?.name || 'User'} 
                />
                <AvatarFallback className="bg-[#25D366] text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {session?.user?.name || 'Administrador'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {session?.user?.email || 'admin@tappy.id'}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/perfil">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/configuracoes">
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-500 focus:text-red-600"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
