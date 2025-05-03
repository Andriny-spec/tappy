// admin-sql.js
// Executa uma inserção SQL direta para criar o admin
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Hash simples pré-calculado para a senha "Tappy2025@"
    const hashedPassword = '$2b$10$LIH29ZtYhzvZZVAkYTgkYu6WKtQsGBxVZCYN55tYdEDiQYZuofBOa';

    // Insere ou atualiza o admin com o hash pré-calculado
    const result = await prisma.$executeRaw`
      INSERT INTO "Admin" (id, name, email, password, rules, "createdAt", "updatedAt")
      VALUES (
        'admin1', 
        'Administrador', 
        'admin@tappy.id', 
        ${hashedPassword}, 
        ARRAY['admin', 'super'], 
        NOW(), 
        NOW()
      )
      ON CONFLICT (email) 
      DO UPDATE SET password = ${hashedPassword}, "updatedAt" = NOW();
    `;

    console.log('Admin criado/atualizado com SQL direto!');
    console.log('Email: admin@tappy.id');
    console.log('Senha: Tappy2025@');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();