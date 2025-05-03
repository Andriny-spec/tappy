import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToDeepSeek } from '@/lib/services/deepseek-service';

export async function POST(req: NextRequest) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'O prompt é obrigatório' },
        { status: 400 }
      );
    }

    const messages = [
      {
        role: 'system',
        content: `Você é um assistente especializado em gerar conteúdo para blog de alta qualidade focado na Tappy, uma plataforma de automação para empresas que oferece soluções para WhatsApp, sites e mais. Responda em português e seja preciso, direto e informativo. O conteúdo deve atrair visitantes e clientes, destacando a inovação e eficiência que a Tappy proporciona.

Para diferentes tipos de conteúdo, siga estas diretrizes:
- Para título: Crie algo cativante e SEO-friendly com no máximo 60 caracteres
- Para excerpt: Crie uma descrição atrativa com no máximo 160 caracteres
- Para conteúdo: Crie conteúdo estruturado com subtítulos, parágrafos, listas e conclusão, usando Markdown para formatação`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const { content, error } = await sendMessageToDeepSeek(messages);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({
      content: content.trim(),
      type,
    });
  } catch (error) {
    console.error('Erro na API de geração de blog:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar sua solicitação' },
      { status: 500 }
    );
  }
}
