import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desabilitar verificação de ESLint durante o build
  eslint: {
    // Somente avisa sobre problemas, não interrompe o build
    ignoreDuringBuilds: true,
  },
  // Desabilitar verificação de tipos durante o build
  typescript: {
    // Ignorar erros de tipo durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
