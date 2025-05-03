"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-background to-gray-50/80 dark:to-gray-900/50">
        {/* Header */}
        <div className="w-full py-12 bg-gradient-to-b from-gray-900 to-background dark:from-black dark:to-background border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center rounded-full bg-tappyGreen/10 p-2">
                  <Cookie className="h-8 w-8 text-tappyGreen" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Política de Cookies
              </h1>
              
              <p className="text-lg text-gray-300">
                Atualizada em 02 de maio de 2025
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-tappyGreen mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar para a página inicial</span>
            </Link>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm mb-10">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2>1. Introdução</h2>
                <p>
                  Esta Política de Cookies explica como a Tappy Tecnologia Ltda. ("Tappy", "nós", "nosso" ou "nossa") utiliza cookies e tecnologias semelhantes para reconhecê-lo quando você visita nossos sites e utiliza nossos serviços, incluindo Tappy Whats, Tappy Imob, Tappy ID e Tappy Link (coletivamente, os "Serviços").
                </p>
                <p>
                  Esta política explica o que são essas tecnologias e por que as usamos, bem como suas opções para controlá-las.
                </p>
                
                <h2>2. O que são Cookies?</h2>
                <p>
                  Cookies são pequenos arquivos de dados que são armazenados em seu dispositivo (computador ou dispositivo móvel) quando você visita um site. Cookies são amplamente utilizados pelos proprietários de sites para fazer seus sites funcionarem, ou funcionarem de maneira mais eficiente, bem como para fornecer informações de relatórios.
                </p>
                <p>
                  Os cookies definidos por nós são chamados de cookies "primários". Os cookies definidos por partes que não somos nós são chamados de cookies "de terceiros". Cookies de terceiros nos permitem oferecer determinadas funcionalidades em nossos Serviços (como análises).
                </p>
                <p>
                  Os cookies podem ser "persistentes" ou "de sessão". Cookies persistentes permanecem em seu dispositivo pessoal mesmo depois que você fecha seu navegador até que você os exclua ou até que expirem. Cookies de sessão são excluídos assim que você fecha seu navegador.
                </p>
                
                <h2>3. Por que utilizamos Cookies?</h2>
                <p>
                  Utilizamos cookies por vários motivos. Alguns cookies são necessários por razões técnicas para que nossos Serviços funcionem, e nós os chamamos de cookies "essenciais" ou "estritamente necessários". Outros cookies também nos permitem rastrear e direcionar os interesses de nossos usuários para melhorar a experiência em nossos Serviços. Terceiros servem cookies através de nossos Serviços para análises e outras finalidades.
                </p>
                <p>
                  Os tipos específicos de cookies primários e de terceiros servidos através de nossos Serviços e os propósitos que eles atendem estão descritos abaixo:
                </p>
                
                <h3>3.1. Cookies Essenciais</h3>
                <p>
                  Esses cookies são estritamente necessários para fornecer serviços disponíveis através de nossos sites e para usar alguns de seus recursos, como acesso a áreas seguras. Como esses cookies são estritamente necessários para entregar os Serviços, você não pode recusá-los sem impactar como nossos Serviços funcionam.
                </p>
                <ul>
                  <li><strong>_tappy_session:</strong> Cookie de sessão usado para identificar sua sessão única em nossos servidores.</li>
                  <li><strong>XSRF-TOKEN:</strong> Cookie usado para segurança, ajudando a prevenir ataques conhecidos como "Cross-Site Request Forgery".</li>
                </ul>
                
                <h3>3.2. Cookies de Desempenho e Funcionalidade</h3>
                <p>
                  Esses cookies são usados para melhorar o desempenho e a funcionalidade de nossos Serviços, mas não são essenciais para seu uso. No entanto, sem esses cookies, certas funcionalidades podem se tornar indisponíveis.
                </p>
                <ul>
                  <li><strong>_tappy_preferences:</strong> Armazena suas preferências, como idioma e tema.</li>
                  <li><strong>_tappy_recently_viewed:</strong> Lembra itens que você visualizou recentemente para facilitar sua navegação.</li>
                </ul>
                
                <h3>3.3. Cookies Analíticos e de Personalização</h3>
                <p>
                  Esses cookies coletam informações que são usadas para nos ajudar a entender como nossos Serviços estão sendo usados ou quão eficazes são nossas campanhas de marketing, ou para nos ajudar a personalizar nossos Serviços para você.
                </p>
                <ul>
                  <li><strong>_ga, _gid:</strong> Cookies do Google Analytics usados para distinguir usuários e sessões.</li>
                  <li><strong>_fbp:</strong> Cookie do Facebook Pixel usado para análise e otimização de campanhas publicitárias.</li>
                </ul>
                
                <h3>3.4. Cookies de Marketing e Publicidade</h3>
                <p>
                  Esses cookies são usados para rastrear seus hábitos de navegação e atividade quando você usa nossos Serviços. O objetivo é exibir anúncios que sejam relevantes e envolventes para o usuário individual e, portanto, mais valiosos para editores e anunciantes terceirizados.
                </p>
                <ul>
                  <li><strong>_fbp:</strong> Usado pelo Facebook para entregar uma série de produtos de publicidade, como lances em tempo real de anunciantes terceiros.</li>
                  <li><strong>_gcl_au:</strong> Usado pelo Google AdSense para experimentar com eficiência de publicidade em sites que usam seus serviços.</li>
                </ul>
                
                <h2>4. Outras Tecnologias de Rastreamento</h2>
                <p>
                  Além de cookies, também podemos usar outras tecnologias semelhantes para rastrear sua atividade em nossos Serviços.
                </p>
                
                <h3>4.1. Web Beacons</h3>
                <p>
                  Também conhecidos como "pixels de rastreamento" ou "clear gifs", os web beacons são pequenos arquivos gráficos que contêm um identificador único que permite reconhecer quando alguém visitou nossos Serviços ou abriu um e-mail que enviamos. Isso nos permite, por exemplo, monitorar os padrões de tráfego dos usuários de uma página para outra, entregar ou comunicar-se com cookies, entender se você chegou aos nossos Serviços a partir de um anúncio online exibido em um site de terceiros, e melhorar o desempenho do site.
                </p>
                
                <h3>4.2. Local Storage Objects</h3>
                <p>
                  Usamos Local Storage Objects (LSOs) como HTML5 para armazenar conteúdo e preferências. Terceiros com os quais nos associamos para fornecer determinados recursos em nossos sites também usam LSOs como HTML5 para coletar e armazenar informações.
                </p>
                
                <h2>5. Como Você Pode Controlar Cookies</h2>
                <p>
                  Você tem o direito de decidir se aceita ou rejeita cookies. Você pode exercer suas preferências de cookies clicando no botão "Preferências de Cookies" no rodapé de nosso site.
                </p>
                <p>
                  Você também pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie está sendo enviado. A função de Ajuda na maioria dos navegadores explicará como impedir que seu navegador aceite novos cookies, como fazer com que o navegador notifique você quando receber um novo cookie ou como desativar completamente os cookies.
                </p>
                <p>
                  No entanto, como os cookies permitem que você aproveite alguns dos recursos essenciais de nossos Serviços, recomendamos que você os deixe ativados. Por exemplo, se você bloquear ou rejeitar nossos cookies, não poderá usar nenhum produto ou serviço da Tappy que exija que você faça login.
                </p>
                
                <h2>6. Cookies e Sinais de Rastreamento Colocados por Terceiros</h2>
                <p>
                  Terceiros podem servir cookies através de nossos Serviços para análises, publicidade e outras finalidades. Isso pode incluir rastreamento de suas atividades online ao longo do tempo e em diferentes sites e outros serviços online. Esses terceiros podem ter suas próprias políticas de privacidade quanto ao uso de suas tecnologias.
                </p>
                <p>
                  A Tappy não controla o uso de cookies de terceiros e não é responsável por eles. Você pode visitar os sites de terceiros para saber mais sobre seus cookies e como gerenciá-los.
                </p>
                
                <h2>7. Alterações a Esta Política de Cookies</h2>
                <p>
                  Podemos atualizar esta Política de Cookies de tempos em tempos para refletir, por exemplo, alterações nas tecnologias que usamos, ou por outros motivos operacionais, legais ou regulatórios. Incentivamos você a revisar periodicamente esta página para estar ciente de quaisquer alterações.
                </p>
                <p>
                  A data na parte superior desta Política de Cookies indica quando ela foi atualizada pela última vez.
                </p>
                
                <h2>8. Como Entrar em Contato</h2>
                <p>
                  Se você tiver alguma dúvida sobre nosso uso de cookies ou outras tecnologias, envie um e-mail para privacidade@tappy.com.br ou entre em contato conosco por meio dos canais de contato disponíveis em nosso site.
                </p>
              </div>
            </div>
            
            <div className="bg-tappyGreen/10 rounded-xl p-6 border border-tappyGreen/20 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Controle de Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Você pode ajustar suas preferências de cookies a qualquer momento. Por favor, selecione quais categorias de cookies você deseja aceitar.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="cookies-essential"
                      type="checkbox"
                      checked
                      disabled
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-tappyGreen"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="cookies-essential" className="font-medium text-gray-900 dark:text-white">
                      Cookies Essenciais
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Necessários para o funcionamento básico do site. O site não pode funcionar corretamente sem esses cookies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="cookies-performance"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-tappyGreen"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="cookies-performance" className="font-medium text-gray-900 dark:text-white">
                      Cookies de Desempenho e Funcionalidade
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Permitem melhorar a funcionalidade e personalização do site.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="cookies-analytics"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-tappyGreen"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="cookies-analytics" className="font-medium text-gray-900 dark:text-white">
                      Cookies Analíticos
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Nos ajudam a entender como os visitantes interagem com o site, permitindo melhorias.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="cookies-marketing"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-tappyGreen"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="cookies-marketing" className="font-medium text-gray-900 dark:text-white">
                      Cookies de Marketing e Publicidade
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      São utilizados para exibir anúncios relevantes com base em seus interesses.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button className="bg-tappyGreen hover:bg-tappyGreen/90 text-black">
                  Salvar preferências
                </Button>
                
                <Button variant="outline">
                  Aceitar todos
                </Button>
                
                <Button variant="ghost">
                  Rejeitar não essenciais
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Tem dúvidas sobre nossos cookies?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Entre em contato com nossa equipe de privacidade
                </p>
              </div>
              
              <Button className="gap-2">
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
