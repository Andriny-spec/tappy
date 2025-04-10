import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// Removendo a dependência de next-auth por enquanto
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Temporariamente removendo a verificação de autenticação
    // const session = await getServerSession(authOptions);
    
    // if (!session || !session.user) {
    //   return NextResponse.json(
    //     { error: "Não autorizado" },
    //     { status: 401 }
    //   );
    // }
    
    // Buscar pagamentos do banco de dados
    // Aqui podemos usar os modelos de orders para representar pagamentos
    const pagamentosDB = await prisma.orders.findMany({
      include: {
        users: {
          select: {
            email: true,
          },
        },
        plans: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // Limitar a 100 resultados para performance
    });
    
    // Buscar resumo de dados para os cards
    const totalRecebido = await prisma.orders.aggregate({
      where: {
        paymentStatus: "APROVADO",
      },
      _sum: {
        amount: true,
      },
    });
    
    const reembolsos = await prisma.orders.aggregate({
      where: {
        paymentStatus: "REEMBOLSADO",
      },
      _sum: {
        amount: true,
      },
    });
    
    const transacoes = await prisma.orders.count();
    
    // Calcular ticket médio
    let ticketMedio = 0;
    if (transacoes > 0 && totalRecebido._sum.amount) {
      ticketMedio = Number(totalRecebido._sum.amount) / transacoes;
    }
    
    // Formatar dados para o frontend
    const pagamentos = pagamentosDB.map((pagamento) => {
      // Determinar plataforma com base no ID do plano ou em outros critérios
      let plataforma = "Tappy Link"; // Padrão
      
      if (pagamento.planId.includes("whatsapp")) {
        plataforma = "Tappy WhatsApp";
      } else if (pagamento.planId.includes("espacos")) {
        plataforma = "Tappy Espaços";
      }
      
      // Determinar método de pagamento
      let metodo = "Desconhecido";
      if (pagamento.paymentMethod === "PIX") {
        metodo = "PIX";
      } else if (pagamento.paymentMethod === "CARTAO_CREDITO") {
        metodo = "Cartão de Crédito";
      } else if (pagamento.paymentMethod === "BOLETO") {
        metodo = "Boleto";
      }
      
      // Formatar status
      let status = "Pendente";
      switch (pagamento.paymentStatus) {
        case "APROVADO":
          status = "Aprovado";
          break;
        case "RECUSADO":
          status = "Recusado";
          break;
        case "REEMBOLSADO":
          status = "Reembolsado";
          break;
        case "CANCELADO":
          status = "Cancelado";
          break;
        default:
          status = "Pendente";
      }
      
      // Formatar data
      const data = pagamento.paymentDate || pagamento.createdAt;
      const dataFormatada = new Date(data).toLocaleDateString("pt-BR");
      
      // Formatar valor
      const valorFormatado = `R$ ${Number(pagamento.amount).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      
      return {
        id: pagamento.id,
        cliente: pagamento.users?.email || "Cliente sem email",
        email: pagamento.users?.email || "Não informado",
        data: dataFormatada,
        valor: valorFormatado,
        metodo: metodo,
        plano: pagamento.plans?.name || "Plano não identificado",
        status: status,
        plataforma: plataforma,
        inicio: pagamento.createdAt.toISOString(),
        fim: pagamento.paymentDate?.toISOString() || null,
      };
    });
    
    // Preparar dados de resumo
    const resumo = {
      totalRecebido: Number(totalRecebido._sum.amount || 0),
      reembolsos: Number(reembolsos._sum.amount || 0),
      transacoes: transacoes,
      ticketMedio: ticketMedio,
    };
    
    return NextResponse.json({ 
      pagamentos, 
      resumo 
    });
    
  } catch (erro) {
    console.error("Erro ao buscar pagamentos:", erro);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
