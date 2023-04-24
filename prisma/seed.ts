import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      hash: '$2b$10$DF7HTrkUD8At9r6zT8xUIu.XMMtIoLQ2yePc.HNEsxo/UyX7fTYDG',
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
