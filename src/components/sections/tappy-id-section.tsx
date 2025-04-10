"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FloatingCard } from "@/components/ui-aceternity/floating-card";

export function TappyIdSection() {
  return (
    <section id="tappy-id" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-tappyGreen/10 blur-3xl" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <div className="w-full max-w-md mx-auto">
              <FloatingCard className="aspect-[4/6] w-full max-w-sm mx-auto">
                <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-tappyGreen/20 to-transparent" />
                  
                  <div className="text-center space-y-6 z-10">
                    <h3 className="text-2xl font-bold gradient-text">Tappy ID</h3>
                    <div className="w-16 h-16 mx-auto rounded-full bg-tappyGreen/20 flex items-center justify-center mb-2">
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
                    
                    <div className="space-y-2 mb-8">
                      <p className="text-white/70">Seu cartão virtual</p>
                      <p className="text-white/70">João Silva</p>
                      <p className="text-white/70">joao@email.com</p>
                    </div>
                    
                    <div className="w-full border border-white/20 rounded-md p-3 text-left">
                      <p className="text-white/70 text-sm">Conecte-se:</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/70"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/70"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/70"
                          >
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                          </svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/70"
                          >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-tappyBlue/20 to-transparent" />
                </div>
              </FloatingCard>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2 space-y-6"
          >
            <div className="relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '40%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="absolute h-1 bg-gradient-to-r from-tappyGreen to-tappyGreen/40 bottom-0 left-0 rounded-full"
              />
              <div className="space-y-2">
                <Badge className="bg-tappyGreen/10 text-tappyGreen border-tappyGreen/20 px-3 py-1.5 font-poppins">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="m12 19 7-7-7-7-7 7 7 7Z" />
                  </svg>
                  <span>Mais popular</span>
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-tappyGreen to-tappyBlue">Tappy ID</span>
                  <span className="block text-foreground">Seu cartão virtual inteligente</span>
                </h2>
              </div>
            </div>
            <p className="text-xl text-muted-foreground font-poppins">
              Compartilhe todas as suas informações de contato em um único lugar com nosso cartão virtual inovador.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Card className="bg-background/50 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Compartilhamento Fácil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compartilhe suas informações de contato com um único clique ou via QR code.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Personalização Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Personalize seu cartão com cores, logos e layouts que representam sua marca.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Múltiplas Redes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Integre todas as suas redes sociais e canais de contato em um único lugar.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Análise de Desempenho</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Acompanhe quantas pessoas visualizaram e salvaram seu cartão.
                  </p>
                </CardContent>
              </Card>
            </div>
            
           
          </motion.div>
        </div>
      </div>
    </section>
  );
}
