import { NextRequest, NextResponse } from "next/server";

// Tipo para a mensagem no histórico
interface Mensagem {
  id: string;
  conteudo: string;
  remetente: "usuario" | "agente";
  timestamp: Date;
}

// Informações sobre cada produto Tappy para o contexto do modelo
const informacoesProdutos = `
TAPPY ID:
- Sistema de identificação e autenticação com Inteligência Artificial
- Permite autenticação segura de usuários com verificação em duas etapas
- Inclui recursos de detecção de fraudes e análise comportamental
- Integra-se com outros sistemas via API
- Planos de R$39/mês a R$299/mês dependendo do volume de autenticações

TAPPY LINK:
- Plataforma de cartão virtual com IA, geração de QR code e NFC
- Similar ao Linktree, mas com recursos avançados de personalização
- Permite criar landing pages personalizadas com análise de conversão
- Inclui estatísticas detalhadas de visitantes e interações
- Planos de R$29/mês a R$199/mês dependendo dos recursos

TAPPY IMOB:
- CRM para imobiliárias automatizado com agentes de IA
- Inclui criador automático de sites para imobiliárias e corretores
- Gerencia todo o ciclo de vendas imobiliárias, desde prospecção até pós-venda
- Oferece recursos de IA para qualificação de leads e recomendação de imóveis
- Planos de R$199/mês a R$999/mês dependendo do tamanho da imobiliária

TAPPY WHATS:
- CRM Kanban para WhatsApp com recursos de IA
- Gerencia múltiplos atendentes e conversas de WhatsApp em uma única plataforma
- Permite automação de respostas e segmentação de clientes
- Inclui análise de sentimento e classificação automática de mensagens
- Planos de R$99/mês a R$499/mês dependendo do volume de conversas
`;

// Função para gerar o prompt com contexto adequado para cada tipo de agente
function gerarPromptDeepseek(
  mensagemAtual: string,
  historico: Mensagem[],
  agente: string,
  instrucoes: string
) {
  // Converter o histórico para formato de chat
  const historicoFormatado = historico.map((msg) => ({
    role: msg.remetente === "usuario" ? "user" : "assistant",
    content: msg.conteudo,
  }));

  // Contexto base sobre os produtos Tappy
  const contextoBase = informacoesProdutos;

  // Cria o sistema prompt com as instruções específicas do agente
  const sistemaPrompt = `${instrucoes}

${contextoBase}

Responda sempre em português do Brasil, de forma clara e objetiva.
Mantenha suas respostas concisas mas completas, focando nas informações mais relevantes.
`;

  // Prepara a mensagem de sistema
  const mensagemSistema = {
    role: "system",
    content: sistemaPrompt,
  };

  // Adiciona a mensagem atual do usuário
  const mensagens = [
    mensagemSistema,
    ...historicoFormatado,
    { role: "user", content: mensagemAtual },
  ];

  return mensagens;
}

// Função para chamar a API Deepseek
async function chamarDeepseekAPI(mensagens: any[]) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error("API key do Deepseek não encontrada");
  }

  try {
    const resposta = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: mensagens,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(JSON.stringify(erro));
    }

    const dados = await resposta.json();
    return dados.choices[0].message.content;
  } catch (erro) {
    console.error("Erro ao chamar a API Deepseek:", erro);
    throw erro;
  }
}

// Rota de API para processar as mensagens
export async function POST(req: NextRequest) {
  try {
    const { mensagem, historico, agente, instrucoes } = await req.json();

    // Valida os dados recebidos
    if (!mensagem || !agente || !instrucoes) {
      return NextResponse.json(
        { erro: "Dados incompletos na requisição" },
        { status: 400 }
      );
    }

    // Gera o prompt para o modelo
    const mensagens = gerarPromptDeepseek(
      mensagem,
      historico || [],
      agente,
      instrucoes
    );

    // Chama a API Deepseek
    const resposta = await chamarDeepseekAPI(mensagens);

    // Retorna a resposta
    return NextResponse.json({ resposta });
  } catch (erro) {
    console.error("Erro ao processar a mensagem:", erro);
    return NextResponse.json(
      { erro: "Erro ao processar a mensagem" },
      { status: 500 }
    );
  }
}
