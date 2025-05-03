// Script para redefinir senha do admin
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function resetAdmin() {
  try {
    // Gerar nova senha com hash
    const plainPassword = "admin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    // Atualizar admin com nova senha simples
    const admin = await prisma.admin.update({
      where: { 
        email: 'admin@tappy.id'
      },
      data: {
        password: hashedPassword
      }
    });
    
    console.log('✅ Senha do admin redefinida com sucesso!');
    console.log('Email: admin@tappy.id');
    console.log('Nova senha: admin123');
    
  } catch (error) {
    console.error('❌ Erro ao redefinir senha:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar
resetAdmin();
