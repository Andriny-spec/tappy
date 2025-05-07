// Script para testar a comparação de senha
const bcrypt = require('bcrypt');

async function testPasswordMatch() {
  // Hash pré-calculado da senha "Tappy2025@"
  const storedHash = '$2b$10$LIH29ZtYhzvZZVAkYTgkYu6WKtQsGBxVZCYN55tYdEDiQYZuofBOa';
  
  // A senha que estamos tentando usar para login
  const password = 'Tappy2025@';
  
  try {
    // Teste direto da senha
    console.log('Testando senha:', password);
    console.log('Hash armazenado:', storedHash);
    
    const isMatch = await bcrypt.compare(password, storedHash);
    console.log('Senha corresponde:', isMatch ? 'SIM' : 'NÃO');
    
    // Se não corresponder, vamos gerar um novo hash para ver como ele fica
    if (!isMatch) {
      console.log('\nGerando novo hash para a mesma senha:');
      const newHash = await bcrypt.hash(password, 10);
      console.log('Novo hash gerado:', newHash);
    }
  } catch (error) {
    console.error('Erro ao testar senha:', error);
  }
}

testPasswordMatch();
