// Script para resetar a senha do admin
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    // Hash pré-calculado para a senha "Tappy2025@"
    const hashedPassword = '$2b$10$LIH29ZtYhzvZZVAkYTgkYu6WKtQsGBxVZCYN55tYdEDiQYZuofBOa';

    // Atualiza o admin com o hash pré-calculado
    const admin = await prisma.admin.update({
      where: { email: 'admin@tappy.id' },
      data: {
        password: hashedPassword,
      },
    });

    console.log('✅ Senha do admin resetada com sucesso');
    console.log('Email: admin@tappy.id');
    console.log('Senha: Tappy2025@');
  } catch (error) {
    console.error('❌ Erro ao resetar senha do admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();
