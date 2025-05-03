/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['randomuser.me', 'images.unsplash.com', 'freepik.com', 'shutterstock.com'],
  },
  reactStrictMode: true,
  eslint: {
    // Ignorar erros de lint durante o build (ainda serão mostrados, mas não vão falhar o build)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
