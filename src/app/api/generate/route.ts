import { NextResponse } from 'next/server';

// Simulando uma API de geração de conteúdo com IA
// Em produção, você utilizaria uma API real como OpenAI, Anthropic, Gemini, etc.
async function generateContent(prompt: string): Promise<string> {
  // Simulando uma resposta da IA com base no tipo de conteúdo solicitado
  if (prompt.includes('descrição do plano')) {
    const descriptions = [
      "Um plano completo e versátil projetado para empresas que desejam expandir sua presença digital. Oferece ferramentas avançadas de gerenciamento, análise de dados em tempo real e suporte prioritário.",
      "Solução ideal para pequenos negócios em crescimento, proporcionando recursos essenciais de marketing, gestão de clientes e automação de processos de forma intuitiva.",
      "Plano premium com recursos ilimitados, incluindo integrações personalizadas, IA avançada para análise de mercado e atendimento ao cliente 24/7.",
      "Pacote básico para profissionais autônomos e microempreendedores que buscam uma presença online profissional com ferramentas simples e eficazes."
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } 
  else if (prompt.includes('recursos do plano')) {
    const features = [
      "Dashboard personalizado;Relatórios avançados;API completa;Suporte prioritário;Backup automático;Integrações com 30+ ferramentas",
      "Gerenciamento de contatos;Automação de marketing;Chatbot inteligente;Análise de dados;Personalização de interface",
      "Acesso a todos os módulos;Usuários ilimitados;Armazenamento ilimitado;Suporte 24/7;Consultoria estratégica mensal;IA avançada para previsões",
      "Gerenciamento básico;Até 5 usuários;10GB de armazenamento;Modelos prontos;Suporte por email"
    ];
    return features[Math.floor(Math.random() * features.length)];
  }
  else if (prompt.includes('benefícios do plano')) {
    const benefits = [
      "Aumento de produtividade;Redução de custos operacionais;Melhor experiência do cliente;Tomada de decisão baseada em dados",
      "ROI acelerado;Processos otimizados;Satisfação do cliente aumentada;Vantagem competitiva no mercado",
      "Escalabilidade garantida;Proteção de dados reforçada;Atualizações prioritárias;Acesso a recursos beta",
      "Implantação rápida;Curva de aprendizado reduzida;Custo-benefício superior;Foco no core business"
    ];
    return benefits[Math.floor(Math.random() * benefits.length)];
  }
  
  return "Não foi possível gerar conteúdo para este prompt.";
}

export async function POST(request: Request) {
  try {
    const { prompt, type } = await request.json();
    
    if (!prompt || !type) {
      return NextResponse.json(
        { error: 'Prompt e tipo são obrigatórios' },
        { status: 400 }
      );
    }
    
    const fullPrompt = `Gere ${type} do plano chamado "${prompt}"`;
    const generatedContent = await generateContent(fullPrompt);
    
    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error('Erro na geração de conteúdo:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}
