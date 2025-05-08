// Script para criar um novo administrador diretamente
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createNewAdmin() {
  try {
    // Dados do admin
    const email = 'admin@tappy.id';
    const password = 'Tappy2025@';
    const name = 'Administrador';
    
    // Gerar hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hash da senha gerado:', hashedPassword);
    
    // Criar admin usando Prisma Client (não SQL direto)
    const admin = await prisma.admin.create({
      data: {
        id: 'admin2',
        email,
        name,
        password: hashedPassword,
        rules: ['admin', 'super']
      }
    });
    
    console.log('Novo admin criado com sucesso!');
    console.log('Use as seguintes credenciais:');
    console.log('Email:', email);
    console.log('Senha:', password);
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Este email já está em uso. Vamos atualizá-lo.');
      
      // Atualizar admin existente
      const email = 'admin@tappy.id';
      const password = 'Tappy2025@';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const admin = await prisma.admin.update({
        where: { email },
        data: {
          password: hashedPassword,
          name: 'Administrador'
        }
      });
      
      console.log('Admin atualizado com sucesso!');
      console.log('Use as seguintes credenciais:');
      console.log('Email:', email);
      console.log('Senha:', password);
    } else {
      console.error('Erro ao criar admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a função
createNewAdmin()
  .then(() => console.log('Operação concluída'))
  .catch(console.error);
