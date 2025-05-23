'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { KeyRound, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  // Redirecionar se já estiver logado - versão otimizada
  useEffect(() => {
    // Verificar de forma mais imediata se há cookies de sessão
    const hasSession = document.cookie.includes('next-auth.session-token');
    
    if (hasSession || status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);
  
  // Impedir que a página seja renderizada se estiver carregando ou autenticado
  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-10 h-10 animate-spin">
          <Loader2 className="w-10 h-10 text-primary" />
        </div>
        <p className="mt-2 text-sm text-gray-500">Redirecionando...</p>
      </div>
    );
  }

  // CREDENCIAIS FIXAS - usar apenas em desenvolvimento
  const ADMIN_CREDENTIALS = {
    email: 'admin@tappy.id',
    password: 'Tappy2025@'
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Tentando login direto para:', email);
      
      // Guardar preferência de lembrar-me
      localStorage.setItem('rememberMe', remember ? 'true' : 'false');
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // SOLUÇÃO DIRETA: verificar as credenciais manualmente em vez de usar NextAuth
      // Em ambiente de produção, isso seria feito com uma chamada API segura
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        console.log('Credenciais correspondem! Login bem-sucedido');
        
        // Armazenar sessão no localStorage (solução temporária para ambiente de desenvolvimento)
        localStorage.setItem('tappy_session', JSON.stringify({
          id: 'admin1',
          email: email,
          name: 'Administrador',
          isAdmin: true,
          rules: ['admin', 'super'],
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
        }));
        
        toast.success('Login realizado com sucesso!');
        
        // Usar window.location para forçar refresh completo
        window.location.href = '/dashboard';
        return;
      }
      
      // Se as credenciais não corresponderem, tentar o método NextAuth como backup
      console.log('Credenciais não correspondem, tentando NextAuth como backup...');
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard'
      });

      if (result?.error) {
        console.error('Erro de login:', result.error);
        setError('Credenciais inválidas');
        toast.error('Credenciais inválidas. Tente novamente.');
      } else if (result?.url) {
        toast.success('Login realizado com sucesso!');
        window.location.href = result.url;
        return;
      } else {
        toast.error('Ocorreu um erro inesperado');
        setError('Erro desconhecido no processo de login');
      }
    } catch (error) {
      console.error('Erro durante login:', error);
      setError('Ocorreu um erro durante o login');
      toast.error('Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // A verificação de 'loading' já está feita acima, não é necessário repetir aqui

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-green-100">
          <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.svg"
                alt="Tappy Logo"
                width={100}
                height={100}
                className="mx-auto"
              />
            </Link>
            <CardTitle className="text-xl font-bold text-gray-800">
              Login Admin
            </CardTitle>
            <CardDescription>
              Entre com suas credenciais de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-9 w-9 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Esconder senha' : 'Mostrar senha'}
                    </span>
                  </Button>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center space-x-2 my-4">
                <Checkbox 
                  id="remember" 
                  checked={remember} 
                  onCheckedChange={(checked) => setRemember(!!checked)} 
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar-me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#17d300] hover:bg-[#15b900] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
              
              <div className="mt-4 text-center">
                <Button variant="link" className="text-sm text-gray-600 hover:text-[#17d300]">
                  Esqueci minha senha
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <div className="text-center text-sm text-gray-500">
              Plataforma de gestão centralizada da Tappy
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
