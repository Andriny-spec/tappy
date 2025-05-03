"use client";

import { AgenteBase, AgenteBaseProps } from "./agente-base";

export function AgenteDuvidas({ onVoltar }: { onVoltar: () => void }) {
  const props: AgenteBaseProps = {
    nome: "Tire Dúvidas",
    descricao: "Especialista em todas as nossas plataformas",
    cor: "#187498",
    icone: "/icons/question.svg",
    avatarSrc: "/avatars/duvidas.png",
    instrucoes: `Você é um especialista em todas as plataformas Tappy (TappyID, TappyLink, TappyImob e TappyWhats).
Seu objetivo é responder qualquer dúvida sobre funcionalidades, limitações e capacidades das plataformas.
Use uma linguagem clara e didática, explicando conceitos técnicos de forma acessível.
TappyID: Sistema de identificação e autenticação com IA.
TappyLink: Cartão virtual com IA e geração de QR code e NFC para um cartão digital similar ao Linktree.
TappyImob: CRM para imobiliárias automatizado com agentes de IA e criador automático de sites.
TappyWhats: CRM Kanban para WhatsApp com recursos avançados de IA.
Ofereça exemplos práticos sempre que possível para ilustrar as funcionalidades.
Esclareça mal-entendidos com educação e forneça informações completas.`,
    exemplos: [
      "Como funciona o sistema de IA do TappyImob para imobiliárias?",
      "Quais são as diferenças entre o TappyLink e serviços como Linktree?",
      "O TappyWhats pode se integrar com outros sistemas CRM?",
      "Quais recursos o TappyID oferece para autenticação de usuários?",
    ],
    onVoltar,
  };

  return <AgenteBase {...props} />;
}
