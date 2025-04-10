'use server';

type DeepSeekMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type DeepSeekResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

/**
 * Serviço para comunicação com a API DeepSeek
 */
export async function sendMessageToDeepSeek(
  messages: DeepSeekMessage[],
  modelId: string = 'deepseek-chat'
): Promise<{ content: string; error: string | null }> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.error('API Key do DeepSeek não configurada');
    return {
      content: '',
      error: 'API Key do DeepSeek não configurada. Adicione DEEPSEEK_API_KEY ao arquivo .env.',
    };
  }

  try {
    const endpoint = 'https://api.deepseek.com/v1/chat/completions';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      console.error('Erro na API DeepSeek:', errorDetail);
      return {
        content: '',
        error: `Erro ao comunicar com a API DeepSeek: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json() as DeepSeekResponse;
    return {
      content: data.choices[0].message.content,
      error: null,
    };
  } catch (error) {
    console.error('Erro ao enviar mensagem para DeepSeek:', error);
    return {
      content: '',
      error: 'Falha na comunicação com a API DeepSeek. Por favor, tente novamente mais tarde.',
    };
  }
}
