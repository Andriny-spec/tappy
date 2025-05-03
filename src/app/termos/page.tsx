"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function TermosPage() {
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
                  <FileText className="h-8 w-8 text-tappyGreen" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Termos de Uso
              </h1>
              
              <p className="text-lg text-gray-300">
                Atualizado em 02 de maio de 2025
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
                  Bem-vindo aos Termos de Uso da Tappy. Este documento é um contrato entre você e a Tappy Tecnologia Ltda. ("Tappy", "nós", "nosso" ou "nossa") e rege o seu uso de todos os produtos e serviços oferecidos pela Tappy, incluindo mas não limitado a Tappy Whats, Tappy Imob, Tappy ID e Tappy Link (coletivamente, os "Serviços").
                </p>
                <p>
                  Ao acessar ou utilizar qualquer parte dos nossos Serviços, você concorda com todos os termos e condições deste documento. Se você não concorda com qualquer parte destes Termos, você não deve acessar ou utilizar nossos Serviços.
                </p>
                
                <h2>2. Acesso e Uso dos Serviços</h2>
                <p>
                  Você é responsável por manter a confidencialidade das suas credenciais de conta e por todas as atividades que ocorrem sob sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado da sua conta ou qualquer outra violação de segurança.
                </p>
                <p>
                  Você concorda em não utilizar os Serviços para qualquer finalidade ilegal ou proibida por estes Termos, ou para solicitar a participação em atividades ilegais ou outras atividades que infrinjam os direitos da Tappy ou de terceiros.
                </p>
                
                <h2>3. Conteúdo e Propriedade Intelectual</h2>
                <p>
                  A Tappy possui todos os direitos, título e interesse em e para os Serviços, incluindo todos os direitos de propriedade intelectual. Nada nestes Termos transfere a você qualquer direito de propriedade nos Serviços, seu conteúdo, recursos ou funcionalidades.
                </p>
                <p>
                  Ao utilizar nossos Serviços, você pode enviar conteúdo, incluindo texto, imagens e outros materiais. Você mantém a propriedade do seu conteúdo, mas concede à Tappy uma licença mundial, não exclusiva, isenta de royalties para usar, reproduzir, modificar, publicar, criar trabalhos derivados e exibir tal conteúdo em conexão com os Serviços.
                </p>
                
                <h2>4. Privacidade</h2>
                <p>
                  Nossa Política de Privacidade descreve como coletamos, usamos e compartilhamos informações sobre você quando você usa nossos Serviços. Ao usar nossos Serviços, você concorda com nossa coleta, uso e compartilhamento de informações de acordo com nossa Política de Privacidade, que é incorporada por referência a estes Termos.
                </p>
                
                <h2>5. Responsabilidades do Usuário</h2>
                <p>
                  Você concorda em usar os Serviços somente para fins legais e de acordo com estes Termos. Especificamente, você concorda em não:
                </p>
                <ul>
                  <li>Violar leis ou regulamentos aplicáveis;</li>
                  <li>Infringir os direitos de propriedade intelectual ou outros direitos legais de terceiros;</li>
                  <li>Transmitir qualquer material que seja difamatório, obsceno, ou que viole os direitos de privacidade de terceiros;</li>
                  <li>Usar os Serviços de qualquer maneira que possa danificar, desabilitar, sobrecarregar ou prejudicar o funcionamento dos Serviços;</li>
                  <li>Tentar acessar não autorizadamente qualquer parte dos Serviços, contas de outros usuários ou sistemas ou redes conectadas aos Serviços;</li>
                  <li>Usar qualquer robô, spider, crawler ou outros meios automatizados para acessar os Serviços ou coletar conteúdo ou informações dos Serviços.</li>
                </ul>
                
                <h2>6. Pagamento e Faturamento</h2>
                <p>
                  Certos aspectos dos Serviços podem ser fornecidos mediante pagamento. Você concorda em pagar todas as taxas cobradas pela Tappy com base no plano de pagamento que você escolher. Todas as taxas são em reais brasileiros e não são reembolsáveis, exceto conforme exigido por lei.
                </p>
                <p>
                  A Tappy reserva-se o direito de alterar suas taxas a qualquer momento, mediante aviso prévio. Se você não concordar com a mudança de preço, tem o direito de rejeitar a alteração cancelando sua assinatura antes que a alteração entre em vigor.
                </p>
                
                <h2>7. Rescisão</h2>
                <p>
                  A Tappy pode rescindir ou suspender seu acesso aos Serviços imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, mas não se limitando a, violação destes Termos. Todas as disposições destes Termos que, por sua natureza, devem sobreviver à rescisão sobreviverão, incluindo, mas não se limitando a, disposições de propriedade, isenções de garantia e limitações de responsabilidade.
                </p>
                
                <h2>8. Isenções de Garantias e Limitações de Responsabilidade</h2>
                <p>
                  OS SERVIÇOS SÃO FORNECIDOS "COMO ESTÃO" E "CONFORME DISPONÍVEIS", SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS. A TAPPY EXPRESSAMENTE SE ISENTA DE TODAS AS GARANTIAS IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM PROPÓSITO PARTICULAR E NÃO VIOLAÇÃO.
                </p>
                <p>
                  EM NENHUM CASO A TAPPY, SEUS DIRETORES, FUNCIONÁRIOS, PARCEIROS, AGENTES, FORNECEDORES OU AFILIADOS SERÃO RESPONSÁVEIS POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS, INCLUINDO, SEM LIMITAÇÃO, PERDA DE LUCROS, DADOS, USO, GOODWILL, OU OUTROS DANOS INTANGÍVEIS, RESULTANTES DE SEU ACESSO OU USO OU INCAPACIDADE DE ACESSAR OU USAR OS SERVIÇOS.
                </p>
                
                <h2>9. Lei Aplicável</h2>
                <p>
                  Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem levar em conta seus princípios de conflito de leis. Qualquer disputa decorrente ou relacionada a estes Termos ou aos Serviços será submetida à jurisdição exclusiva dos tribunais localizados na cidade de São Paulo, Brasil.
                </p>
                
                <h2>10. Alterações dos Termos</h2>
                <p>
                  A Tappy reserva-se o direito, a seu exclusivo critério, de modificar ou substituir qualquer parte destes Termos. É sua responsabilidade verificar estes Termos periodicamente para alterações. Seu uso contínuo dos Serviços após a publicação de quaisquer alterações destes Termos constitui aceitação dessas alterações.
                </p>
                
                <h2>11. Disposições Gerais</h2>
                <p>
                  Estes Termos constituem o acordo completo entre você e a Tappy em relação aos Serviços e substituem todos os acordos anteriores ou contemporâneos em relação a esse assunto. Se qualquer disposição destes Termos for considerada inválida ou inexequível, essa disposição será aplicada na máxima extensão possível, e as demais disposições destes Termos permanecerão em pleno vigor e efeito.
                </p>
                <p>
                  Todos os direitos não concedidos expressamente são reservados.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Tem dúvidas sobre nossos termos?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Entre em contato com nossa equipe de suporte
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
