import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
