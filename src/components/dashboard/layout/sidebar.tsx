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
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { signOut } from 'next-auth/react';

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
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
    title: 'Relatórios',
    href: '/dashboard/relatorios',
    icon: <FileBarChart className="w-5 h-5" />
  },
  {
    title: 'Configurações',
    href: '/dashboard/configuracoes',
    icon: <Settings className="w-5 h-5" />
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col border-r border-border bg-background dark:bg-background w-64 transition-colors duration-200">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/dashboard/dashboard" className="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="Tappy Logo" className="h-7 w-7" />
          <span className="text-lg font-semibold">Tappy Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-2 gap-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#25D366]/10 hover:text-[#25D366] transition-all",
                pathname === item.href ? 
                  "bg-[#25D366]/10 text-[#25D366] font-semibold shadow-sm" : 
                  "text-gray-700 dark:text-gray-300"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="sticky bottom-0 mt-auto border-t border-border bg-background p-4 transition-colors">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}
