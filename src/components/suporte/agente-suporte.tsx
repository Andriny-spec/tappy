"use client";

import { AgenteBase, AgenteBaseProps } from "./agente-base";

export function AgenteSuporte({ onVoltar }: { onVoltar: () => void }) {
  const props: AgenteBaseProps = {
    nome: "Suporte Técnico",
    descricao: "Especialista em resolver problemas técnicos",
    cor: "#25D366",
    icone: "/icons/support.svg",
    avatarSrc: "/avatars/suporte.png",
    instrucoes: `Você é um agente de suporte técnico especializado nas plataformas Tappy (TappyID, TappyLink, TappyImob e TappyWhats).
Seu objetivo é ajudar a resolver problemas técnicos e dúvidas sobre o funcionamento das plataformas.
Use uma linguagem amigável e profissional, mostrando empatia com os problemas do usuário.
Sempre tente entender completamente o problema antes de propor soluções.
Quando possível, explique os passos de forma detalhada para que o usuário possa resolver o problema sozinho.
Se não souber a resposta, ofereça encaminhar a questão para a equipe técnica.`,
    exemplos: [
      "Estou com problemas para fazer login no Tappy ID, o que faço?",
      "Como configuro o meu cartão virtual no TappyLink?",
      "Estou tendo problemas para sincronizar o WhatsApp no TappyWhats",
      "Por que meu site no TappyImob não está carregando corretamente?",
    ],
    onVoltar,
  };

  return <AgenteBase {...props} />;
}
