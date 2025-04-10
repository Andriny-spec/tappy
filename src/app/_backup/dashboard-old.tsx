'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, User, Home, MessageSquare, Building } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="Tappy Logo" width={40} height={40} />
            <h1 className="text-xl font-bold text-gray-900">Tappy Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right">
              <p className="font-medium">{session?.user?.name}</p>
              <p className="text-gray-500">{session?.user?.email}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/api/auth/signout">Sair</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Gestão de Plataformas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* TappyID Card */}
          <Card className="shadow hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Tappy ID
              </CardTitle>
              <CardDescription>
                Gerenciamento de cartões digitais
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm text-gray-500">
                Plataforma para gerenciamento de cartões digitais NFC e QR Code.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <a href="https://tappy.id/dashboard" target="_blank" rel="noopener noreferrer">
                  Acessar <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* TappyWhats Card */}
          <Card className="shadow hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                Tappy WhatsApp
              </CardTitle>
              <CardDescription>
                Automação de WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm text-gray-500">
                Plataforma para automação de mensagens e atendimento via WhatsApp.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <a href="https://whats.tappy.com.br" target="_blank" rel="noopener noreferrer">
                  Acessar <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* TappyImob Card */}
          <Card className="shadow hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Building className="h-5 w-5 mr-2 text-green-600" />
                Tappy Imob
              </CardTitle>
              <CardDescription>
                Sistema imobiliário
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm text-gray-500">
                Plataforma completa para gestão imobiliária e corretores.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <a href="https://imob.tappy.com.br" target="_blank" rel="noopener noreferrer">
                  Acessar <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Tappy Website Card */}
          <Card className="shadow hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Home className="h-5 w-5 mr-2 text-green-600" />
                Site Institucional
              </CardTitle>
              <CardDescription>
                Site principal da Tappy
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <p className="text-sm text-gray-500">
                Site institucional com informações sobre os produtos e serviços.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <a href="https://tappy.com.br" target="_blank" rel="noopener noreferrer">
                  Acessar <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
