'use server';

// Abstração para variáveis de ambiente
export const env = {
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || '',
  // Outras variáveis de ambiente podem ser adicionadas aqui
};
