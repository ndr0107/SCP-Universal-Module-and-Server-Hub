import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  // Example: create a placeholder category
  await prisma.category.upsert({
    where: { id: 'default-category' },
    update: {},
    create: { id: 'default-category', name: 'General', color: 'purple' },
  });
  console.log('Done.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
