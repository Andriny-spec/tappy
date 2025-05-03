import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        console.log('Tentativa de login para email:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Credenciais incompletas');
          return null;
        }

        // Primeiro, tente encontrar no modelo Admin
        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log('Admin encontrado:', admin ? 'Sim' : 'Não');
        
        if (admin) {
          console.log('Verificando senha para admin:', admin.email);
          console.log('Senha fornecida (primeiros 3 caracteres):', credentials.password.substring(0, 3) + '...');
          console.log('Hash armazenado (primeiros 20 caracteres):', admin.password.substring(0, 20) + '...');
          
          try {
            const passwordMatch = await bcrypt.compare(credentials.password, admin.password);
            console.log('Senha corresponde:', passwordMatch ? 'Sim' : 'Não');
            
            if (passwordMatch) {
              console.log('Login como admin bem-sucedido');
              return {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                isAdmin: true,
                rules: admin.rules,
              };
            } else {
              console.log('Senha incorreta para admin');
            }
          } catch (error) {
            console.error('Erro ao comparar senhas:', error);
            return null;
          }
        }

        // Se não encontrar no Admin, busque no User normal (para compatibilidade)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log('Usuário regular encontrado:', user ? 'Sim' : 'Não');
        
        if (!user) {
          console.log('Nenhum usuário encontrado com este email');
          return null;
        }

        // Usuário normal não terá senha no modelo padrão NextAuth, 
        // então aqui você precisaria implementar sua própria lógica se desejar
        console.log('Autenticação de usuário regular não implementada');
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias em segundos
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 dias em segundos
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 // 30 dias em segundos
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60
      }
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin || false;
        token.rules = (user as any).rules || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).isAdmin = token.isAdmin as boolean;
        (session.user as any).rules = token.rules as string[];
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redireciona para dashboard após o login
      if (url.startsWith("/api/auth") || url === "/login" || url === baseUrl) {
        return `${baseUrl}/dashboard`;
      }
      // Se a URL já for uma URL válida, retorne-a
      if (url.startsWith("http")) {
        return url;
      }
      // Caso contrário, garanta uma URL absoluta válida
      return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
