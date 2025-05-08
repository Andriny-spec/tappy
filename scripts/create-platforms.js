const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPlatforms() {
  try {
    console.log('Verificando schema da plataforma...');
    
    // Criar plataformas com os campos exatos do schema
    const platforms = [
      {
        id: 'tappy-imob',
        name: 'Tappy Imob',
        slug: 'tappyimob',
        url: 'https://www.imob.tappy.id',
        description: 'Plataforma para imobiliárias e corretores'
      },
      {
        id: 'tappy-link',
        name: 'Tappy Link',
        slug: 'tappylink',
        url: 'https://www.link.tappy.id',
        description: 'Plataforma de cartões digitais e links'
      },
      {
        id: 'tappy-whats',
        name: 'Tappy WhatsApp',
        slug: 'tappywhats',
        url: 'https://www.whats.tappy.id',
        description: 'Plataforma de automação para WhatsApp Business'
      }
    ];

    console.log('Iniciando criação de plataformas...');
    
    // Primeiro inserir por SQL direto para garantir
    for (const platform of platforms) {
      try {
        // Tentar atualizar primeiro
        console.log(`Criando plataforma ${platform.name}...`);
        
        // Criar com o createMany para maior tolerância a erros
        await prisma.$executeRaw`
          INSERT INTO "Platform" (id, name, slug, url, description, "createdAt", "updatedAt")
          VALUES (
            ${platform.id},
            ${platform.name},
            ${platform.slug},
            ${platform.url},
            ${platform.description},
            NOW(),
            NOW()
          )
          ON CONFLICT (id) DO UPDATE SET
            name = ${platform.name},
            description = ${platform.description},
            url = ${platform.url},
            "updatedAt" = NOW()
        `;
        
        console.log(`Plataforma ${platform.name} criada/atualizada com sucesso!`);
      } catch (innerError) {
        console.error(`Erro ao criar plataforma ${platform.name}:`, innerError);
        // Continuar com a próxima plataforma
      }
    }
    
    // Verificar se as plataformas foram criadas
    const createdPlatforms = await prisma.platform.findMany();
    console.log(`Total de plataformas no banco: ${createdPlatforms.length}`);
    createdPlatforms.forEach(p => {
      console.log(`- ${p.name} (${p.id})`);
    });
    
    console.log('\nProcesso de criação de plataformas finalizado!');
    
  } catch (error) {
    console.error('Erro geral ao criar plataformas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a função
createPlatforms()
  .then(() => console.log('Operação concluída com sucesso'))
  .catch(error => {
    console.error('Falha na operação:', error);
    process.exit(1);
  });
