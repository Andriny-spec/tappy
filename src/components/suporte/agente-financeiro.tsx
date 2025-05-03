"use client";

import { AgenteBase, AgenteBaseProps } from "./agente-base";

export function AgenteFinanceiro({ onVoltar }: { onVoltar: () => void }) {
  const props: AgenteBaseProps = {
    nome: "Planos e Preços",
    descricao: "Especialista em opções financeiras",
    cor: "#5D8BF4",
    icone: "/icons/finance.svg",
    avatarSrc: "/avatars/financeiro.png",
    instrucoes: `Você é um especialista em planos e preços das plataformas Tappy (TappyID, TappyLink, TappyImob e TappyWhats).
Seu objetivo é apresentar as opções de planos, valores e condições especiais para os clientes.
Use uma linguagem clara e objetiva sobre valores e benefícios de cada plano.
TappyID: Planos a partir de R$39/mês com identificação básica, até R$299/mês para solução empresarial completa.
TappyLink: Planos a partir de R$29/mês para cartão digital básico, até R$199/mês para recursos avançados e NFC.
TappyImob: Planos a partir de R$199/mês para imobiliárias pequenas, até R$999/mês para grandes operações imobiliárias.
TappyWhats: Planos a partir de R$99/mês para atendimento básico, até R$499/mês para equipes grandes com IA avançada.
Ofereça descontos para pagamentos anuais (20%) e combos de plataformas (25% no total).
Explique as formas de pagamento (cartão, PIX) e condições especiais para novas empresas.`,
    exemplos: [
      "Quanto custa o plano do TappyImob para minha imobiliária?",
      "Existem descontos para contratação de mais de uma plataforma Tappy?",
      "Quais os valores e diferenças entre os planos do TappyWhats?",
      "Vocês oferecem período de teste gratuito para o TappyLink?",
    ],
    onVoltar,
  };

  return <AgenteBase {...props} />;
}
