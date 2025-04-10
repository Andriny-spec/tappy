"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ArrowRight, CreditCard, MessageSquare, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SubNavItem {
  title: string;
  href: string;
  description: string;
  isNew?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface NavItem {
  title: string;
  href: string;
  description?: string;
  subItems?: SubNavItem[];
  isButton?: boolean;
  isDropdown?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Produtos",
    href: "#produtos",
    isDropdown: true,
    subItems: [
      {
        title: "Tappy ID",
        href: "#tappy-id",
        description: "Seu cartão virtual em um só lugar",
        icon: CreditCard
      },
      {
        title: "Tappy Whats",
        href: "#tappy-whats",
        description: "CRM completo para WhatsApp",
        icon: MessageSquare
      },
      {
        title: "Tappy Imob",
        href: "#tappy-imob",
        description: "CRM imobiliário com I.A.",
        isNew: true,
        icon: Home
      },
    ],
  },
  {
    title: "Quem Somos",
    href: "#quem-somos",
    description: "Conheça nossa história",
  },

  {
    title: "Suporte",
    href: "/suporte",
    description: "Ajuda e contato",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled 
          ? "border-border/40 bg-background/95 backdrop-blur-md shadow-md supports-[backdrop-filter]:bg-background/60" 
          : "border-transparent bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/40"
      )}
    >
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center md:mr-8">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Image 
                src="/logo.svg" 
                alt="Tappy" 
                width={38} 
                height={38} 
                className="mr-2" 
              />
            </motion.div>
          </Link>
        </div>
        
        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6 ml-4">
          {navItems.map((item, index) => {
            // Item com dropdown
            if (item.isDropdown && item.subItems) {
              return (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "flex items-center gap-1 text-base font-medium px-3",
                        "hover:bg-muted/50 transition-colors",
                        activeDropdown === item.title ? "text-tappyGreen" : ""  
                      )}
                    >
                      {item.title}
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[320px] p-1 border-border/50 bg-background/95 backdrop-blur-lg text-left shadow-lg rounded-xl overflow-hidden">
                    {item.subItems.map((subItem, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link 
                          href={subItem.href}
                          className="group flex items-center gap-4 py-4 px-5 hover:bg-muted/50 cursor-pointer transition-all duration-200 relative overflow-hidden text-left"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tappyGreen/10 to-tappyGreen/20 flex items-center justify-center text-tappyGreen group-hover:scale-110 transition-transform duration-200">
                              {subItem.icon && <subItem.icon className="h-5 w-5" />}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-base group-hover:text-tappyGreen transition-colors duration-200">{subItem.title}</span>
                              {subItem.isNew && (
                                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-tappyGreen/20 to-tappyBlue/20 text-tappyGreen border border-tappyGreen/20 animate-pulse">
                                  NOVO
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200 block mt-0.5">{subItem.description}</span>
                          </div>
                          
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-1">
                            <ArrowRight className="h-4 w-4 text-tappyGreen" />
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            
            // Item normal
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-base font-medium px-3 py-2 rounded-md",
                  "transition-colors hover:bg-muted/50 hover:text-tappyGreen"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="border-tappyGreen/30 hover:border-tappyGreen hover:bg-tappyGreen/5 transition-all duration-300">
              <Link href="/suporte">Atendimento</Link>
            </Button>
            <Button asChild variant="gradient" size="sm" className="shadow-md shadow-tappyGreen/20 hover:shadow-tappyGreen/30 transition-all duration-300">
              <Link href="#tappy-id">Saiba mais</Link>
            </Button>
          </div>
          
          {/* Menu Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0 border-l border-border/40 w-[300px]">
              <div className="px-7 py-6 flex justify-between items-center border-b border-border/20">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen via-tappyGreen/90 to-tappyGreen/70">TAPPY</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="mr-2">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex flex-col gap-1 px-5 py-6">
                {navItems.map((item, index) => {
                  // Item com dropdown
                  if (item.isDropdown && item.subItems) {
                    return (
                      <div key={index} className="py-1">
                        <button
                          onClick={() => toggleDropdown(item.title)}
                          className="flex items-center justify-between w-full p-3 text-base font-medium hover:bg-muted/50 rounded-md hover:text-tappyGreen transition-colors"
                        >
                          {item.title}
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform text-tappyGreen/70",
                            activeDropdown === item.title ? "rotate-180" : ""
                          )} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 mt-2 space-y-1 border-t border-border/10 pt-2">
                                {item.subItems.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="group flex items-center gap-4 py-3 px-4 hover:bg-muted/50 cursor-pointer transition-all duration-200 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <div className="flex-shrink-0">
                                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tappyGreen/10 to-tappyGreen/20 flex items-center justify-center text-tappyGreen group-hover:scale-110 transition-transform duration-200">
                                        {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                      </div>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium group-hover:text-tappyGreen transition-colors duration-200">{subItem.title}</span>
                                        {subItem.isNew && (
                                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r from-tappyGreen/20 to-tappyBlue/20 text-tappyGreen border border-tappyGreen/20 animate-pulse">
                                            NOVO
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200 block mt-0.5">{subItem.description}</span>
                                    </div>
                                    
                                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                      <ArrowRight className="h-4 w-4 text-tappyGreen" />
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  
                  // Item normal
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="p-3 text-base font-medium hover:bg-muted/50 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  );
                })}
                
                <div className="mt-6 space-y-3 pt-6 border-t border-border/20">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-tappyGreen/30 hover:border-tappyGreen hover:bg-tappyGreen/5 transition-all duration-300"
                  >
                    <Link href="/cadastro" onClick={() => setIsOpen(false)}>
                      Cadastre-se
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="gradient" 
                    className="w-full shadow-md shadow-tappyGreen/20 hover:shadow-tappyGreen/30 transition-all duration-300"
                  >
                    <Link href="#tappy-id" onClick={() => setIsOpen(false)}>
                      Saiba mais
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
