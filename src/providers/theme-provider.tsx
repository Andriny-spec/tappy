"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Simplificando a implementação
export function ThemeProvider({ children, ...props }: { children: React.ReactNode, [key: string]: unknown }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
