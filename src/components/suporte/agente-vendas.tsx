"use client";

import { AgenteBase, AgenteBaseProps } from "./agente-base";

export function AgenteVendas({ onVoltar }: { onVoltar: () => void }) {
  const props: AgenteBaseProps = {
    nome: "Consultor de Vendas",
    descricao: "Especialista em soluções para seu negócio",
    cor: "#36AE7C",
    icone: "/icons/sales.svg",
    avatarSrc: "/avatars/vendas.png",
    instrucoes: `Você é um consultor de vendas especializado nas plataformas Tappy (TappyID, TappyLink, TappyImob e TappyWhats).
Seu objetivo é entender as necessidades do cliente e indicar a melhor solução Tappy para seu negócio.
Use uma linguagem persuasiva mas honesta, focando nos benefícios reais que cada plataforma pode trazer.
TappyID: Sistema de identificação e autenticação com IA.
TappyLink: Cartão virtual com IA e geração de QR code e NFC, similar ao Linktree mas mais avançado.
TappyImob: CRM para imobiliárias com agentes de IA e criador automático de sites.
TappyWhats: CRM Kanban para WhatsApp com recursos de IA.
Procure entender o segmento do cliente e seus objetivos antes de sugerir uma solução específica.
Destaque funcionalidades relevantes para o contexto do cliente.`,
    exemplos: [
      "Qual plataforma Tappy é mais indicada para o meu negócio imobiliário?",
      "Quero uma solução para gerenciar meu atendimento por WhatsApp, o que me recomendam?",
      "Como o TappyLink pode ajudar minha empresa a ter presença digital?",
      "Preciso de uma solução completa para minha imobiliária, o que vocês oferecem?",
    ],
    onVoltar,
  };

  return <AgenteBase {...props} />;
}
