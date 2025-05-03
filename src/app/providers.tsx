'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from "sonner";
import { useState, useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Opções para melhorar a estabilidade do NextAuth
  const sessionOptions = {
    refetchInterval: 0, // Desativa o refetch automático
    refetchOnWindowFocus: false, // Não refetch quando a janela ganha foco
  };

  return (
    <SessionProvider session={null} {...sessionOptions}>
      {children}
      <Toaster position="top-right" />
    </SessionProvider>
  );
}
