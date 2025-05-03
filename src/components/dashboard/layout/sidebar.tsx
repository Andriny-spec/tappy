'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  CreditCard, 
  Users, 
  PackageOpen, 
  FileBarChart, 
  Settings,
  LogOut,
  Bot,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { signOut } from 'next-auth/react';
import { useSidebar } from '@/contexts/sidebar-context';

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    variant: string;
  };
};

const menuItems: SidebarItem[] = [
  {
    title: 'Visão Geral',
    href: '/dashboard',
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    title: 'Pagamentos',
    href: '/dashboard/pagamentos',
    icon: <CreditCard className="w-5 h-5" />
  },
  {
    title: 'Assinantes',
    href: '/dashboard/assinantes',
    icon: <Users className="w-5 h-5" />
  },
  {
    title: 'Planos',
    href: '/dashboard/planos',
    icon: <PackageOpen className="w-5 h-5" />
  },
  {
    title: 'Blog',
    href: '/dashboard/blog',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    title: 'Relatórios',
    href: '/dashboard/relatorios',
    icon: <FileBarChart className="w-5 h-5" />
  },
  {
    title: 'Assistente',
    href: '/dashboard/assistente',
    icon: <Bot className="w-5 h-5" />,
    badge: { text: 'I.A', variant: 'custom' }
  },
  {
    title: 'Configurações',
    href: '/dashboard/configuracoes',
    icon: <Settings className="w-5 h-5" />
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className={cn(
      "flex h-screen flex-col border-r border-border bg-background dark:bg-background transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="Tappy Logo" className="h-7 w-7" />
          {!collapsed && <span className="text-lg font-semibold">Tappy Admin</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-500 hover:text-[#25D366] hover:bg-[#25D366]/10"
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-8">
        <nav className="grid items-start px-2 gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-4 py-3.5 text-sm font-medium hover:bg-[#25D366]/10 hover:text-[#25D366] transition-all",
                collapsed ? "justify-center" : "gap-3",
                pathname === item.href ? 
                  "bg-[#25D366]/10 text-[#25D366] font-semibold shadow-sm" : 
                  "text-gray-700 dark:text-gray-300"
              )}
              title={collapsed ? item.title : undefined}
            >
              {item.icon}
              {!collapsed && <span className="flex-1">{item.title}</span>}
              {!collapsed && item.badge && (
                <Badge 
                  className={cn(
                    item.badge.variant === 'custom' && "bg-white border-[#25D366] text-[#25D366] border"
                  )}
                >
                  {item.badge.text}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="sticky bottom-0 mt-auto border-t border-border bg-background p-4 transition-colors">
        <Button 
          variant="outline" 
          className={cn(
            "w-full text-red-500 hover:text-red-600 hover:bg-red-50",
            collapsed ? "justify-center p-2" : "justify-start"
          )}
          title={collapsed ? "Sair" : undefined}
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className={cn("h-4 w-4", collapsed ? "" : "mr-2")} />
          {!collapsed && "Sair"}
        </Button>
      </div>
    </div>
  );
}