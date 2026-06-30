const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  'Pedreiro',
  'Eletricista',
  'Pintor',
  'Encanador',
  'Ajudante',
  'Ar Condicionado',
  'Carpinteiro',
];

async function main() {
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`Categorias cadastradas: ${categories.join(', ')}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
