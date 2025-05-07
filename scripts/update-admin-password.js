// Script para atualizar a senha do admin com o novo hash
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateAdminPassword() {
  try {
    // Novo hash gerado para a senha "Tappy2025@"
    const newHash = '$2b$10$sF0QVxKPeJgPyoCG2KFjr.ogllN.ClJicK3qVg02cdEDP5aTkF52K';

    // Atualiza o admin com o novo hash
    const admin = await prisma.admin.update({
      where: { email: 'admin@tappy.id' },
      data: {
        password: newHash,
      },
    });

    console.log('✅ Senha do admin atualizada com sucesso');
    console.log('Email: admin@tappy.id');
    console.log('Senha: Tappy2025@');
    console.log('Hash atualizado para o gerado no teste');
  } catch (error) {
    console.error('❌ Erro ao atualizar senha do admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
