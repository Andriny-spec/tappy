// C:\Users\bbsso\OneDrive\Área de Trabalho\Tappy\Tappy\src\app\api\ai\assistente\route.ts

import { NextRequest, NextResponse } from "next/server";

// Obter dados da base de conhecimento de suporte (simulação)
const obterBaseDeConhecimento = () => {
  return [
    {
      titulo: "Tappy Whats",
      conteudo: "O Tappy Whats é uma plataforma que permite automatizar o atendimento via WhatsApp para empresas. Inclui recursos como chatbot, disparo em massa (respeitando as políticas do WhatsApp), gerenciamento de múltiplos atendentes e integração com CRM."
    },
    {
      titulo: "Tappy Imob",
      conteudo: "O Tappy Imob é uma solução completa para imobiliárias e corretores. Permite criar sites responsivos, gerenciar imóveis, integrar com portais, controlar leads e gerar relatórios de desempenho."
    },
    {
      titulo: "Tappy Link",
      conteudo: "O Tappy Link é uma plataforma para criar cartões virtuais interativos. Cada usuário pode criar seu próprio cartão com links personalizados, redes sociais, portfólio, serviços e aceitação de pagamentos."
    },
    {
      titulo: "Diferença entre produtos",
      conteudo: "O Tappy Link é focado em cartões virtuais, enquanto o Tappy ID era a versão anterior dessa plataforma (agora descontinuada). O Tappy Whats é específico para automação de WhatsApp e o Tappy Imob é voltado para o mercado imobiliário."
    }
  ];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mensagem, historico, baseDeConhecimento } = body;

    if (!mensagem) {
      return NextResponse.json({ erro: "Mensagem não fornecida" }, { status: 400 });
    }

    // Verificar se a API key existe
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ erro: "API key não configurada" }, { status: 500 });
    }

    // Formatar o contexto com as informações da base de conhecimento
    let sistemaMensagem = "Você é um assistente especializado da Tappy, uma empresa de soluções tecnológicas com plataformas como Tappy Whats, Tappy Imob e Tappy Link. Seja claro e objetivo nas suas respostas.";
    
    if (baseDeConhecimento) {
      const conhecimento = obterBaseDeConhecimento();
      sistemaMensagem += "\n\nBase de conhecimento:\n";
      conhecimento.forEach(item => {
        sistemaMensagem += `\n- ${item.titulo}: ${item.conteudo}`;
      });
    }

    // Preparar mensagens para a API DeepSeek
    const messages = [
      { role: "system", content: sistemaMensagem },
      ...historico,
      { role: "user", content: mensagem }
    ];

    // Fazer requisição para a API DeepSeek
    const deepseekResponse = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    // Verificar se a resposta foi bem-sucedida
    if (!deepseekResponse.ok) {
      const errorData = await deepseekResponse.json();
      console.error("Erro na API DeepSeek:", errorData);
      return NextResponse.json({ erro: "Erro ao processar a solicitação com a IA" }, { status: 500 });
    }

    const data = await deepseekResponse.json();
    const resposta = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua solicitação.";

    return NextResponse.json({ resposta });
    
  } catch (error) {
    console.error("Erro no processamento:", error);
    return NextResponse.json({ erro: "Erro interno do servidor" }, { status: 500 });
  }
}