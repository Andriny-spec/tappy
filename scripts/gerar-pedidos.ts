import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as path from 'path';

// Definir tipos para os enums que precisamos
type PaymentMethod = 'PIX' | 'CARTAO_CREDITO' | 'BOLETO';
type PaymentStatus = 'APROVADO' | 'PENDENTE' | 'RECUSADO' | 'REEMBOLSADO' | 'CANCELADO';
type SubscriptionStatus = 'ATIVA' | 'CANCELADA' | 'EXPIRADA' | 'PENDENTE';

// Inicializando o Prisma apontando para o schema.prisma do projeto principal
const prisma = new PrismaClient({});

console.log('Cliente Prisma inicializado');

// Array de nomes brasileiros para geração de usuários
const nomes = [
  'Ana Silva', 'Carlos Oliveira', 'Mariana Santos', 'João Pereira', 'Juliana Costa',
  'Rafael Almeida', 'Patricia Sousa', 'Fernando Lima', 'Camila Rodrigues', 'Bruno Martins',
  'Luciana Gomes', 'Gustavo Ferreira', 'Daniela Ribeiro', 'Eduardo Carvalho', 'Aline Barbosa',
  'Marcelo Nascimento', 'Roberta Melo', 'Alexandre Cardoso', 'Cristina Araújo', 'Lucas Moreira'
];

// Array de emails correspondentes aos nomes
const emails = nomes.map(nome => {
  const [primeiro, ultimo] = nome.toLowerCase().split(' ');
  return `${primeiro}.${ultimo}@email.com`;
});

// Interface para tipagem dos planos
interface Plano {
  id: string;
  nome: string;
  preco: number;
  plataforma: string;
  duracao: number;
}

// Array de planos disponíveis
const planos: Plano[] = [
  { id: 'tappylink-basico', nome: 'Tappy Link Básico', preco: 49.90, plataforma: 'tappylink', duracao: 30 },
  { id: 'tappylink-premium', nome: 'Tappy Link Premium', preco: 97.00, plataforma: 'tappylink', duracao: 30 },
  { id: 'whatsapp-standard', nome: 'Tappy WhatsApp Standard', preco: 59.90, plataforma: 'whatsapp', duracao: 30 },
  { id: 'whatsapp-pro', nome: 'Tappy WhatsApp Pro', preco: 89.90, plataforma: 'whatsapp', duracao: 30 },
  { id: 'espacos-basic', nome: 'Tappy Espaços Basic', preco: 69.90, plataforma: 'espacos', duracao: 30 },
  { id: 'espacos-plus', nome: 'Tappy Espaços Plus', preco: 127.00, plataforma: 'espacos', duracao: 30 }
];

// Array de métodos de pagamento
const metodosPagamento: PaymentMethod[] = ['PIX', 'CARTAO_CREDITO', 'BOLETO'];

// Array de status de pagamento com pesos para distribuição
const statusPagamento: { status: PaymentStatus; peso: number }[] = [
  { status: 'APROVADO', peso: 70 }, // 70% de chance
  { status: 'PENDENTE', peso: 10 }, // 10% de chance
  { status: 'RECUSADO', peso: 8 },  // 8% de chance
  { status: 'REEMBOLSADO', peso: 7 }, // 7% de chance
  { status: 'CANCELADO', peso: 5 }  // 5% de chance
];

// Função para gerar data aleatória entre dois limites
function gerarDataAleatoria(inicio: Date, fim: Date): Date {
  return new Date(inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime()));
}

// Interface para tipagem do usuário
interface Usuario {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface para tipagem do plano na base de dados
interface PlanoDB {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Função para escolher um item aleatório de um array
function escolherAleatorio<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Função para escolher um item com peso de um array
function escolherComPeso<T>(array: { item: T; peso: number }[]): T {
  const totalPeso = array.reduce((sum, item) => sum + item.peso, 0);
  let valorAleatorio = Math.random() * totalPeso;
  
  for (const elemento of array) {
    if (valorAleatorio <= elemento.peso) {
      return elemento.item;
    }
    valorAleatorio -= elemento.peso;
  }
  
  return array[0].item; // Fallback
}

// Gerar usuários
async function gerarUsuarios() {
  console.log('Gerando usuários...');
  
  for (let i = 0; i < nomes.length; i++) {
    const usuario = {
      id: randomUUID(),
      email: emails[i],
      password: '$2a$10$rqCPIztZxPVQH1V1LDnBYu5gfVY/tZJk1Z1YJ/7wU4QM8bOXvxU1O', // senha123
      role: 'ASSINANTE',
      createdAt: gerarDataAleatoria(new Date('2024-01-01'), new Date()),
      updatedAt: new Date()
    };
    
    try {
      // Verificar se o usuário já existe
      const usuarioExistente = await prisma.users.findUnique({
        where: { email: usuario.email }
      });
      
      if (!usuarioExistente) {
        await prisma.users.create({ data: usuario });
        console.log(`Usuário criado: ${usuario.email}`);
      } else {
        console.log(`Usuário já existe: ${usuario.email}`);
      }
    } catch (erro) {
      console.error(`Erro ao criar usuário ${usuario.email}:`, erro);
    }
  }
}

// Gerar planos
async function gerarPlanos() {
  console.log('Gerando planos...');
  
  for (const plano of planos) {
    const planoData = {
      id: plano.id,
      name: plano.nome,
      description: `Plano ${plano.nome} para a plataforma ${plano.plataforma}`,
      price: plano.preco,
      durationDays: plano.duracao,
      features: [`Acesso à plataforma ${plano.plataforma}`, 'Suporte por email'],
      isPopular: plano.nome.includes('Premium') || plano.nome.includes('Pro'),
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    };
    
    try {
      // Verificar se o plano já existe
      const planoExistente = await prisma.plans.findUnique({
        where: { id: plano.id }
      });
      
      if (!planoExistente) {
        await prisma.plans.create({ data: planoData });
        console.log(`Plano criado: ${plano.nome}`);
      } else {
        console.log(`Plano já existe: ${plano.nome}`);
      }
    } catch (erro) {
      console.error(`Erro ao criar plano ${plano.nome}:`, erro);
    }
  }
}

// Gerar assinaturas e pedidos
async function gerarPedidos(quantidade: number) {
  console.log(`Gerando ${quantidade} pedidos...`);
  
  // Buscar usuários existentes
  const usuarios = await prisma.users.findMany();
  if (usuarios.length === 0) {
    console.error('Nenhum usuário encontrado. Execute a função gerarUsuarios() primeiro.');
    return;
  }
  
  // Buscar planos existentes
  const planosExistentes = await prisma.plans.findMany();
  if (planosExistentes.length === 0) {
    console.error('Nenhum plano encontrado. Execute a função gerarPlanos() primeiro.');
    return;
  }
  
  // Data atual para referência
  const dataAtual = new Date();
  
  // Gerar pedidos
  for (let i = 0; i < quantidade; i++) {
    try {
      // Escolher usuário e plano aleatórios
      const usuario = escolherAleatorio(usuarios) as Usuario;
      const plano = escolherAleatorio(planosExistentes) as PlanoDB;
      
      // Gerar data de pedido (entre 1 ano atrás e agora)
      const dataInicio = gerarDataAleatoria(
        new Date(dataAtual.getFullYear() - 1, dataAtual.getMonth(), dataAtual.getDate()),
        dataAtual
      );
      
      // Calcular data de expiração
      const dataExpiracao = new Date(dataInicio);
      dataExpiracao.setDate(dataExpiracao.getDate() + plano.durationDays);
      
      // Escolher status de pagamento
      const statusPag = escolherComPeso(statusPagamento.map(s => ({ item: s.status, peso: s.peso })));
      
      // Escolher método de pagamento
      const metodoPag = escolherAleatorio(metodosPagamento);
      
      // Gerar data de pagamento (se aprovado)
      const dataPagamento = statusPag === 'APROVADO' ? 
        gerarDataAleatoria(dataInicio, new Date(dataInicio.getTime() + 1000 * 60 * 60 * 24)) : 
        null;
      
      // Criar ID único para o pedido
      const pedidoId = randomUUID();
      
      // Criar pedido
      const pedido = {
        id: pedidoId,
        userId: usuario.id,
        planId: plano.id,
        amount: plano.price,
        paymentMethod: metodoPag,
        paymentStatus: statusPag,
        paymentDate: dataPagamento,
        createdAt: dataInicio,
        updatedAt: dataInicio,
        transactionId: `tx_${randomUUID().split('-')[0]}`,
        receiptUrl: statusPag === 'APROVADO' ? `https://recibo.kirvano.com/${pedidoId}` : null,
        notes: null
      };
      
      // Criar o pedido
      await prisma.orders.create({ data: pedido });
      
      // Criar assinatura se o pagamento for aprovado
      if (statusPag === 'APROVADO') {
        // Mapear status de assinatura
        let statusAssinatura: SubscriptionStatus = 'ATIVA';
        if (dataExpiracao < dataAtual) {
          statusAssinatura = 'EXPIRADA';
        }
        
        // Criar assinatura
        await prisma.subscriptions.create({
          data: {
            id: randomUUID(),
            userId: usuario.id,
            planId: plano.id,
            status: statusAssinatura,
            startDate: dataInicio,
            endDate: dataExpiracao,
            createdAt: dataInicio,
            updatedAt: dataInicio,
            autoRenew: Math.random() > 0.2, // 80% de chance de renovação automática
            lastOrderId: pedidoId
          }
        });
      }
      
      console.log(`Pedido ${i+1}/${quantidade} criado: ${plano.name} para ${usuario.email}`);
    } catch (erro) {
      console.error(`Erro ao criar pedido ${i+1}:`, erro);
    }
  }
}

// Função principal para executar o script
async function main() {
  try {
    // Número de pedidos a gerar
    const numeroPedidos = 50;
    
    console.log('Iniciando geração de dados...');
    
    // Executar em sequência
    await gerarUsuarios();
    await gerarPlanos();
    await gerarPedidos(numeroPedidos);
    
    console.log('Geração de dados concluída com sucesso!');
  } catch (erro) {
    console.error('Erro ao gerar dados:', erro);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
main();
