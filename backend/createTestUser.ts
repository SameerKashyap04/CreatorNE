import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create a Test Creator
  const creator = await prisma.user.upsert({
    where: { email: 'creator@test.com' },
    update: {},
    create: {
      email: 'creator@test.com',
      passwordHash: hashedPassword,
      role: 'CREATOR',
      status: 'APPROVED',
      creator: {
        create: {
          name: 'Test Creator',
          bio: 'I am a test creator.',
          state: 'Assam',
          city: 'Guwahati',
          languages: JSON.stringify(['English', 'Assamese']),
          followersCount: 100000,
          avgViews: 50000,
          engagementRate: 5.5,
          categories: {
            connectOrCreate: [
              { where: { name: 'Tech' }, create: { name: 'Tech' } },
              { where: { name: 'Lifestyle' }, create: { name: 'Lifestyle' } }
            ]
          },
          socialLinks: {
            create: [
              { platform: 'instagram', url: 'https://instagram.com/test_creator' }
            ]
          }
        }
      }
    }
  });

  // 2. Create a Test Brand
  const brand = await prisma.user.upsert({
    where: { email: 'brand@test.com' },
    update: {},
    create: {
      email: 'brand@test.com',
      passwordHash: hashedPassword,
      role: 'BRAND',
      status: 'APPROVED',
      brand: {
        create: {
          brandName: 'Acme Corp',
          industry: 'Tech',
          contactPerson: 'John Doe'
        }
      }
    }
  });

  // 3. Create a Test Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      status: 'APPROVED',
    }
  });

  console.log('✅ Test accounts created successfully!');
  console.log('-------------------------------------------');
  console.log('👩‍🎨 CREATOR: creator@test.com / password123');
  console.log('🏢 BRAND:   brand@test.com   / password123');
  console.log('🛡️  ADMIN:   admin@test.com   / password123');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
