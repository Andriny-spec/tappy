"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Produtos",
    links: [
      { name: "Tappy Link", href: "https://link.tappy.id/" },
      { name: "Tappy Whats", href: "https://whats.tappy.id/" },
      { name: "Tappy Imob", href: "https://imob.tappy.id/" },
      { name: "Para Você", href: "/para-voce" },
      { name: "Para Empresas", href: "/para-empresas" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre nós", href: "/sobre" },
      { name: "Soluções", href: "/solucoes" },
      { name: "Tecnologias", href: "/tecnologias" },
      { name: "Vantagens", href: "/vantagens" },
      { name: "Treinamentos", href: "/treinamentos" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Tutoriais", href: "/tutoriais" },
      { name: "Documentação", href: "/docs" },
      { name: "Status", href: "/status" },
      { name: "API", href: "/api-tappy" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { name: "Central de Ajuda", href: "/central-de-ajuda" },
      { name: "Contato", href: "/suporte" },
      { name: "FAQ", href: "/duvidas-frequentes" },
      { name: "Treinamentos", href: "/treinamentos" },
      { name: "Comunidade", href: "/comunidade" },
    ],
  },
];

// Define os ícones separadamente para evitar erros de JSX
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <InstagramIcon />
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <TwitterIcon />
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <LinkedInIcon />
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: <YouTubeIcon />
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <GitHubIcon />
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background/90 overflow-hidden">
      {/* CTA Section */}
      <div className="container max-w-screen-2xl relative z-10 py-16 md:py-24">
        <div className="rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90 border border-border/30 p-6 md:p-10 lg:p-16 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.025] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between relative z-10">
            <div className="max-w-2xl space-y-4 text-center lg:text-left">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen via-tappyGreen/90 to-tappyGreen/70">
                  Transforme seu negócio
                </span> <span className="text-foreground">com a Tappy e aumente suas vendas </span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Nossas soluções inovadoras ajudam a impulsionar suas vendas e melhorar a experiência do cliente. Pronto para dar o próximo passo?
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-tappyGreen to-tappyGreen/80 text-white shadow-lg shadow-tappyGreen/20 hover:shadow-tappyGreen/30 transition-all duration-300 px-8 border-0"
              >
                <Link href="/suporte">
                  Agende uma Demonstração
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-tappyGreen/30 hover:border-tappyGreen hover:bg-tappyGreen/5 transition-all duration-300"
              >
                <Link href="/planos">
                  Ver Preços
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="border-t border-border/30">
        <div className="container max-w-screen-2xl py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12">
            {/* Logo & Description */}
            <div className="space-y-6 lg:col-span-3 xl:col-span-4">
              <Link href="/" className="flex items-center gap-2 group">
                <Image 
                  src="/logo.svg" 
                  alt="Tappy" 
                  width={38} 
                  height={38} 
                  className="mr-2" 
                />
              </Link>
              
              <p className="text-muted-foreground max-w-md">
                Suite completa de soluções para revolucionar seu negócio com tecnologia de ponta. Experiência do usuário simplificada e integrações poderosas.
              </p>
              
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button key={index} variant="ghost" size="icon" asChild className="hover:text-tappyGreen hover:bg-tappyGreen/5 transition-colors duration-300">
                    <Link href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer">
                      {social.icon}
                    </Link>
                  </Button>
                ))}
              </div>
              
              {/* Newsletter */}
              <div className="pt-2">
                <h4 className="text-sm font-semibold mb-2">Inscreva-se na nossa newsletter</h4>
                <div className="flex max-w-md gap-2">
                  <Input 
                    type="email" 
                    placeholder="Seu email" 
                    className="bg-background/50 border-border/50 focus:border-tappyGreen/50 transition-colors"
                  />
                  <Button className="bg-gradient-to-r from-tappyGreen to-tappyGreen/80 text-white shrink-0 border-0 hover:opacity-90">Inscrever</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Ao se inscrever, você concorda com nossa <Link href="/privacidade" className="underline hover:text-tappyGreen">Política de Privacidade</Link>.  
                </p>
              </div>
            </div>
            
            {/* Links */}
            <div className="grid grid-cols-2 gap-8 md:gap-12 sm:grid-cols-2 md:grid-cols-4 lg:col-span-3 xl:col-span-8">
              {footerLinks.map((column, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-base font-semibold">{column.title}</h3>
                  <ul className="space-y-2.5">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          href={link.href} 
                          className="text-muted-foreground hover:text-tappyGreen transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-border/30 bg-muted/30">
        <div className="container max-w-screen-2xl py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Tappy. Todos os direitos reservados.
            </div>
            
            <div className="flex gap-6">
              <Link href="/termos" className="text-sm text-muted-foreground hover:text-tappyGreen transition-colors">Termos de Uso</Link>
              <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-tappyGreen transition-colors">Privacidade</Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-tappyGreen transition-colors">Cookies</Link>
              <Link href="/acessibilidade" className="text-sm text-muted-foreground hover:text-tappyGreen transition-colors">Acessibilidade</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
