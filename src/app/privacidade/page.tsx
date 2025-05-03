"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function PrivacidadePage() {
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
                  <Shield className="h-8 w-8 text-tappyGreen" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Política de Privacidade
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
                  A Tappy Tecnologia Ltda. ("Tappy", "nós", "nosso" ou "nossa") está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você utiliza nossos produtos e serviços, incluindo Tappy Whats, Tappy Imob, Tappy ID e Tappy Link (coletivamente, os "Serviços").
                </p>
                <p>
                  Ao utilizar nossos Serviços, você concorda com a coleta e uso de informações de acordo com esta política. Se você não concordar com qualquer parte desta política, solicitamos que não utilize nossos Serviços.
                </p>
                
                <h2>2. Informações que Coletamos</h2>
                <p>
                  <strong>Informações Pessoais:</strong> Podemos coletar informações pessoais que você nos fornece diretamente, como nome, endereço de e-mail, número de telefone, endereço, informações de pagamento e quaisquer outras informações que você opte por fornecer.
                </p>
                <p>
                  <strong>Informações de Uso:</strong> Coletamos informações sobre como você interage com nossos Serviços, incluindo o tipo de navegador que você usa, endereço IP, páginas que você visita, horário e data da sua visita, tempo gasto em cada página, e outros dados de diagnóstico.
                </p>
                <p>
                  <strong>Cookies e Tecnologias Similares:</strong> Utilizamos cookies e tecnologias similares para rastrear a atividade em nossos Serviços e manter certas informações. Você pode instruir seu navegador a recusar todos os cookies ou a indicar quando um cookie está sendo enviado. No entanto, se você não aceitar cookies, você pode não conseguir usar algumas partes de nossos Serviços.
                </p>
                
                <h2>3. Como Utilizamos Suas Informações</h2>
                <p>
                  Utilizamos as informações coletadas para diversos fins, incluindo:
                </p>
                <ul>
                  <li>Fornecer, manter e melhorar nossos Serviços;</li>
                  <li>Processar transações e enviar notificações relacionadas;</li>
                  <li>Enviar informações técnicas, atualizações, alertas de segurança e mensagens administrativas;</li>
                  <li>Responder a comentários, perguntas e solicitações e fornecer suporte ao cliente;</li>
                  <li>Monitorar o uso dos Serviços para ajudar no desenvolvimento de novos produtos e serviços;</li>
                  <li>Detectar, prevenir e resolver problemas técnicos, fraudes ou atividades ilegais.</li>
                </ul>
                
                <h2>4. Compartilhamento de Informações</h2>
                <p>
                  Podemos compartilhar suas informações nas seguintes situações:
                </p>
                <ul>
                  <li><strong>Com Prestadores de Serviços:</strong> Compartilhamos suas informações com terceiros que realizam serviços em nosso nome, como processamento de pagamentos, análise de dados, entrega de e-mails, serviços de hospedagem e suporte ao cliente.</li>
                  <li><strong>Para Cumprir Obrigações Legais:</strong> Podemos divulgar suas informações quando acreditarmos, de boa-fé, que a divulgação é necessária para cumprir com uma obrigação legal, proteger e defender nossos direitos ou propriedade, proteger a segurança de nossos usuários ou do público, ou proteger contra responsabilidade legal.</li>
                  <li><strong>Com Seu Consentimento:</strong> Podemos compartilhar suas informações com terceiros quando tivermos o seu consentimento para fazê-lo.</li>
                </ul>
                
                <h2>5. Proteção de Dados e Segurança da Informação</h2>
                <p>
                  A segurança das suas informações é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para utilizar meios comercialmente aceitáveis para proteger suas informações pessoais, não podemos garantir sua segurança absoluta.
                </p>
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Essas medidas incluem:
                </p>
                <ul>
                  <li>Criptografia de dados em trânsito e em repouso;</li>
                  <li>Controles de acesso rigorosos;</li>
                  <li>Monitoramento contínuo de nossos sistemas;</li>
                  <li>Treinamento regular de segurança para nossos funcionários.</li>
                </ul>
                
                <h2>6. Conformidade com a LGPD</h2>
                <p>
                  A Tappy está comprometida em cumprir com a Lei Geral de Proteção de Dados (LGPD) do Brasil. Como titular dos dados, você tem os seguintes direitos:
                </p>
                <ul>
                  <li>Confirmar a existência de tratamento dos seus dados pessoais;</li>
                  <li>Acessar seus dados;</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                  <li>Anonimizar, bloquear ou eliminar dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;</li>
                  <li>Solicitar a portabilidade dos dados;</li>
                  <li>Ser informado sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa;</li>
                  <li>Revogar o consentimento.</li>
                </ul>
                <p>
                  Para exercer qualquer um desses direitos, entre em contato conosco através dos dados fornecidos na seção "Como Entrar em Contato".
                </p>
                
                <h2>7. Retenção de Dados</h2>
                <p>
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                </p>
                
                <h2>8. Transferências Internacionais de Dados</h2>
                <p>
                  Seus dados podem ser transferidos e mantidos em computadores localizados fora do seu estado, província, país ou outra jurisdição governamental, onde as leis de proteção de dados podem ser diferentes das da sua jurisdição. Se você estiver localizado fora do Brasil e optar por nos fornecer informações, observe que transferimos os dados, incluindo dados pessoais, para o Brasil e os processamos lá.
                </p>
                
                <h2>9. Links para Outros Sites</h2>
                <p>
                  Nossos Serviços podem conter links para outros sites que não são operados por nós. Se você clicar em um link de terceiros, será direcionado para o site desse terceiro. Recomendamos fortemente que você revise a Política de Privacidade de cada site que visitar. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites ou serviços de terceiros.
                </p>
                
                <h2>10. Privacidade de Crianças</h2>
                <p>
                  Nossos Serviços não se destinam a menores de 18 anos. Não coletamos conscientemente informações pessoais de crianças menores de 18 anos. Se tomarmos conhecimento de que coletamos dados pessoais de uma criança menor de 18 anos, tomaremos medidas para remover essas informações de nossos servidores.
                </p>
                
                <h2>11. Alterações a Esta Política de Privacidade</h2>
                <p>
                  Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e atualizando a data na parte superior desta Política de Privacidade.
                </p>
                <p>
                  Você é aconselhado a revisar esta Política de Privacidade periodicamente para quaisquer alterações. Alterações a esta Política de Privacidade são efetivas quando são publicadas nesta página.
                </p>
                
                <h2>12. Como Entrar em Contato</h2>
                <p>
                  Se você tiver alguma dúvida sobre esta Política de Privacidade, por favor, entre em contato conosco:
                </p>
                <ul>
                  <li>Por e-mail: privacidade@tappy.com.br</li>
                  <li>Por telefone: (11) 1234-5678</li>
                  <li>Por correio: Av. Paulista, 1000, São Paulo - SP, 01310-100, Brasil</li>
                </ul>
                <p>
                  Nossa equipe de Proteção de Dados está disponível para responder às suas perguntas e preocupações.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Ainda tem dúvidas sobre privacidade?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Nossa equipe de proteção de dados está à disposição
                </p>
              </div>
              
              <Button className="gap-2">
                Entre em contato
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
