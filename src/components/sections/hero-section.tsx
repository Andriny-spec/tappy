"use client";

import React from "react";
import { motion } from "framer-motion";
import { SpotlightText } from "@/components/ui-aceternity/spotlight-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const slideVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText = ({ text, className = "", delay = 0 }: AnimatedTextProps) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={slideVariants}
      transition={{ duration: 0.6, delay }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {text}
    </motion.span>
  );
};

interface Product {
  name: string;
  color: string;
}

interface AnimatedTypewriterProps {
  products: Product[];
}

const AnimatedTypewriter = ({ products }: AnimatedTypewriterProps) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="flex justify-center items-center space-x-4 mt-2 py-2 px-6 rounded-full bg-gradient-to-r from-background via-background/90 to-background shadow-inner"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {products.map((product: Product, index: number) => (
        <motion.div 
          key={index} 
          className="inline-flex items-center"
          variants={item}
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className={`text-2xl md:text-3xl font-semibold font-poppins ${product.color}`}
            animate={{
              opacity: [0.7, 1, 0.7],
              y: [0, -1, 0],
              textShadow: [
                "0 0 0px rgba(0,200,120,0)",
                "0 0 8px rgba(0,200,120,0.3)",
                "0 0 0px rgba(0,200,120,0)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeInOut"
            }}
          >
            {product.name}
          </motion.span>
          {index < products.length - 1 && (
            <motion.span 
              className="mx-3 text-muted-foreground font-light"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              |
            </motion.span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export function HeroSection() {
  // Adicionar a fonte Poppins via CSS
  React.useEffect(() => {
    const head = document.head;
    const fontLink = document.createElement("link");
    fontLink.type = "text/css";
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    head.appendChild(fontLink);
    
    return () => {
      head.removeChild(fontLink);
    };
  }, []);
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 md:py-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background to-background/80 z-0" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Floating circles */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-tappyGreen/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-tappyBlue/10 blur-3xl" />
      
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 md:space-y-16 text-center">
        <SpotlightText className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 font-poppins text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedText 
                text="TAPPY I.A" 
                className="gradient-text relative inline-block" 
                delay={0.1} 
              />
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="inline-block mx-2"
              >
                {" "}
              </motion.span>
              <AnimatedText 
                text="Revolucionando" 
                className="relative inline-block" 
                delay={0.3} 
              />
              <br className="md:hidden" />
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="inline-block mx-1 md:mx-2"
              >
                {" "}
              </motion.span>
              <AnimatedText 
                text="a forma de fazer negócios" 
                className="relative inline-block" 
                delay={0.5} 
              />
            </motion.h1>
            
            <div className="flex justify-center items-center my-6 overflow-hidden">
              <AnimatedTypewriter 
                products={[
                  { name: "Tappy ID", color: "text-tappyGreen" },
                  { name: "Tappy Whats", color: "text-tappyBlue" },
                  { name: "Tappy Imob", color: "text-tappyGreen" }
                ]}
              />
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Uma suite completa de soluções para revolucionar seu negócio com tecnologia de ponta.
            </p>
          </motion.div>
        </SpotlightText>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto"
        >
          <motion.div 
            className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-br from-background via-background to-background/90 rounded-2xl border border-border/40 shadow-lg hover:shadow-tappyGreen/10 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center mb-3 shadow-md"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-tappyGreen"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90"
              whileHover={{ scale: 1.02 }}
            >
              Tappy ID
            </motion.h3>
            <motion.p className="text-muted-foreground text-center font-poppins">
              Seu cartão virtual em um só lugar
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-br from-background via-background to-background/90 rounded-2xl border border-border/40 shadow-lg hover:shadow-tappyBlue/10 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyBlue/20 to-tappyBlue/5 flex items-center justify-center mb-3 shadow-md"
              whileHover={{ rotate: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-tappyBlue"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90"
              whileHover={{ scale: 1.02 }}
            >
              Tappy Whats
            </motion.h3>
            <motion.p className="text-muted-foreground text-center font-poppins">
              CRM completo para WhatsApp
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-br from-background via-background to-background/90 rounded-2xl border border-border/40 shadow-lg hover:shadow-tappyGreen/10 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div 
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center mb-3 shadow-md"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-tappyGreen"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/90"
              whileHover={{ scale: 1.02 }}
            >
              Tappy Imob
            </motion.h3>
            <motion.p className="text-muted-foreground text-center font-poppins">
              CRM imobiliário com I.A.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
