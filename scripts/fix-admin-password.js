// Script para redefinir a senha do admin para "Tappy2025@"
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    // Gerar um novo hash para a senha "Tappy2025@"
    const saltRounds = 10;
    const plainPassword = 'Tappy2025@';
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    console.log('Nova senha hash gerada:', hashedPassword);

    // Atualizar o admin com o novo hash
    const admin = await prisma.admin.update({
      where: {
        email: 'admin@tappy.id'
      },
      data: {
        password: hashedPassword
      }
    });

    console.log('Admin atualizado com sucesso:', admin.email);
    console.log('Use a senha: Tappy2025@');
    
  } catch (error) {
    console.error('Erro ao resetar senha do admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a função
resetAdminPassword()
  .then(() => console.log('Operação concluída'))
  .catch(console.error);
