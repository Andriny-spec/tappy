"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TappyIdSection } from "@/components/sections/tappy-id-section";
import { TappyWhatsSection } from "@/components/sections/tappy-whats-section";
import { TappyImobSection } from "@/components/sections/tappy-imob-section";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main>
        <HeroSection />
        <TappyIdSection />
        <TappyWhatsSection />
        <TappyImobSection />
        
        {/* Seção de Contato */}
        <section id="contato" className="relative py-24 md:py-32 overflow-hidden border-t border-border/40">
          {/* Efeito de fundo */}
          <div className="absolute inset-0 bg-muted/30 dark:bg-muted/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.025]" />
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container max-w-screen-2xl relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen via-tappyGreen/90 to-tappyGreen/70">Vamos Transformar</span> Seu Negócio
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-poppins">
                  Entre em contato para conhecer mais sobre as soluções Tappy e como elas podem elevar a experiência dos seus clientes.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto mt-12 perspective-1000 max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ scale: 1.03, rotate: 1, y: -5 }}
                  className="h-full"
                >
                  <a 
                    href="https://id.tappy.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden bg-background rounded-2xl border border-border/60 hover:border-tappyGreen/50 transition-all duration-300 shadow-xl hover:shadow-tappyGreen/20 h-full flex flex-col"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-tappyGreen/15 via-tappyGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(32,178,170,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
                    <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-tappyGreen/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150" />
                    <div className="p-8 relative z-10 flex flex-col h-full items-start">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-tappyGreen/30 group-hover:to-tappyGreen/10 transition-all duration-500 group-hover:scale-110 transform group-hover:rotate-6 self-start shadow-md group-hover:shadow-tappyGreen/30">
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
                      </div>
                      <h3 className="text-2xl font-bold mb-3 font-poppins group-hover:text-tappyGreen transition-colors duration-300 group-hover:translate-x-1 transform">Tappy ID</h3>
                      <p className="text-muted-foreground mb-6 flex-grow font-poppins transition-all duration-300 group-hover:text-foreground">Seu cartão digital com todas suas informações em um só lugar</p>
                      <div className="flex items-center text-sm font-medium font-poppins text-tappyGreen bg-tappyGreen/5 px-4 py-2 rounded-full shadow-sm transition-all duration-300 group-hover:bg-tappyGreen/15 group-hover:px-5 group-hover:shadow-tappyGreen/20">
                        <span>Acessar plataforma</span>
                        <svg className="w-4 h-4 ml-2 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.03, rotate: -0.5 }}
                  className="h-full"
                >
                  <a 
                    href="https://whats.tappy.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden bg-background rounded-2xl border border-border/60 hover:border-tappyGreen/50 transition-all duration-300 shadow-xl hover:shadow-tappyGreen/20 h-full flex flex-col"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-tappyGreen/15 via-tappyGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(32,178,170,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
                    <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-tappyGreen/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150" />
                    <div className="p-8 relative z-10 flex flex-col h-full items-start">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-tappyGreen/30 group-hover:to-tappyGreen/10 transition-all duration-500 group-hover:scale-110 transform group-hover:rotate-6 self-start shadow-md group-hover:shadow-tappyGreen/30">
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
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 font-poppins group-hover:text-tappyGreen transition-colors duration-300 group-hover:translate-x-1 transform">Tappy Whats</h3>
                      <p className="text-muted-foreground mb-6 flex-grow font-poppins transition-all duration-300 group-hover:text-foreground">CRM completo para WhatsApp com múltiplos atendentes e automações</p>
                      <div className="flex items-center text-sm font-medium font-poppins text-tappyGreen bg-tappyGreen/5 px-4 py-2 rounded-full shadow-sm transition-all duration-300 group-hover:bg-tappyGreen/15 group-hover:px-5 group-hover:shadow-tappyGreen/20">
                        <span>Acessar plataforma</span>
                        <svg className="w-4 h-4 ml-2 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                  className="h-full"
                >
                  <a 
                    href="https://imob.tappy.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden bg-background rounded-2xl border border-border/60 hover:border-tappyGreen/50 transition-all duration-300 shadow-xl hover:shadow-tappyGreen/20 h-full flex flex-col"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-tappyGreen/15 via-tappyGreen/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(32,178,170,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
                    <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-tappyGreen/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150" />
                    <div className="p-8 relative z-10 flex flex-col h-full items-start">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tappyGreen/20 to-tappyGreen/5 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-tappyGreen/30 group-hover:to-tappyGreen/10 transition-all duration-500 group-hover:scale-110 transform group-hover:rotate-6 self-start shadow-md group-hover:shadow-tappyGreen/30">
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
                      </div>
                      <h3 className="text-2xl font-bold mb-3 font-poppins group-hover:text-tappyGreen transition-colors duration-300 group-hover:translate-x-1 transform">Tappy Imob</h3>
                      <p className="text-muted-foreground mb-6 flex-grow font-poppins transition-all duration-300 group-hover:text-foreground">Software completo para gestão de imobiliárias e corretores</p>
                      <div className="flex items-center text-sm font-medium font-poppins text-tappyGreen bg-tappyGreen/5 px-4 py-2 rounded-full shadow-sm transition-all duration-300 group-hover:bg-tappyGreen/15 group-hover:px-5 group-hover:shadow-tappyGreen/20">
                        <span>Acessar plataforma</span>
                        <svg className="w-4 h-4 ml-2 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
