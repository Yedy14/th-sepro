import { PrismaClient, ServiceOptionType } from '@prisma/client';
import { categories } from '../src/data/categories';
import { freelances } from '../src/data/freelances';
import { services } from '../src/data/services';
import { testimonials } from '../src/data/testimonials';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.serviceTag.deleteMany();
  await prisma.serviceOption.deleteMany();
  await prisma.review.deleteMany();
  await prisma.order.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.withdrawal.deleteMany();
  await prisma.service.deleteMany();
  await prisma.freelance.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Existing data cleared\n');

  // Seed categories
  console.log('📁 Seeding categories...');
  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    const created = await prisma.category.create({
      data: {
        slug: cat.slug,
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        color: cat.color,
        serviceCount: cat.serviceCount,
        freelancerCount: cat.freelancerCount,
      },
    });
    categoryMap.set(cat.slug, created.id);
    console.log(`   ✓ ${cat.name}`);
  }
  console.log(`✅ ${categories.length} categories seeded\n`);

  // Seed freelances (create users first, then freelance profiles)
  console.log('👤 Seeding freelances...');
  const freelanceMap = new Map<string, string>(); // old ID -> new freelance ID
  
  for (const f of freelances) {
    // Create user account for each freelance
    const user = await prisma.user.create({
      data: {
        email: `${f.slug}@thesepro.local`,
        name: f.name,
        password: 'hashed_password_placeholder', // In production, use bcrypt
        role: 'FREELANCE',
        emailVerified: true,
      },
    });

    // Get category ID
    const categoryId = categoryMap.get(f.category) || null;

    // Create freelance profile
    const freelance = await prisma.freelance.create({
      data: {
        userId: user.id,
        slug: f.slug,
        avatar: f.avatar,
        title: f.title,
        speciality: f.speciality,
        bio: f.bio,
        skills: f.skills as any,
        sales: f.sales,
        rating: f.rating,
        reviewCount: f.reviewCount,
        verified: f.verified,
        memberSince: f.memberSince,
        responseTime: f.responseTime,
        location: f.location,
        categoryId: categoryId,
      },
    });
    freelanceMap.set(f.id, freelance.id);
    console.log(`   ✓ ${f.name}`);
  }
  console.log(`✅ ${freelances.length} freelances seeded\n`);

  // Seed services
  console.log('🛠️  Seeding services...');
  for (const s of services) {
    const freelanceId = freelanceMap.get(s.freelancerId);
    const categoryId = categoryMap.get(s.category);

    if (!freelanceId || !categoryId) {
      console.log(`   ⚠️  Skipping ${s.title} (missing freelance or category)`);
      continue;
    }

    const service = await prisma.service.create({
      data: {
        slug: s.slug,
        title: s.title,
        freelancerId: freelanceId,
        categoryId: categoryId,
        price: s.price,
        image: s.image,
        rating: s.rating,
        reviewCount: s.reviewCount,
        budget: s.budget,
        sponsored: s.sponsored,
        description: s.description,
        longDescription: s.longDescription,
        deliveryDays: s.deliveryDays,
        revisions: s.revisions,
      },
    });

    // Seed service options
    if (s.options) {
      const optionTypes = ['basic', 'standard', 'premium'] as const;
      for (const type of optionTypes) {
        const option = s.options[type];
        if (option) {
          await prisma.serviceOption.create({
            data: {
              serviceId: service.id,
              type: type.toUpperCase() as ServiceOptionType,
              name: option.name,
              description: option.description,
              price: option.price,
              deliveryDays: option.deliveryDays,
            },
          });
        }
      }
    }

    // Seed service tags
    if (s.tags && s.tags.length > 0) {
      for (const tag of s.tags) {
        await prisma.serviceTag.create({
          data: {
            serviceId: service.id,
            tag: tag,
          },
        });
      }
    }

    console.log(`   ✓ ${s.title.substring(0, 50)}...`);
  }
  console.log(`✅ ${services.length} services seeded\n`);

  // Seed testimonials
  console.log('💬 Seeding testimonials...');
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        author: t.author,
        role: t.role,
        text: t.text,
        rating: t.rating,
        avatar: t.avatar || null,
      },
    });
    console.log(`   ✓ ${t.author}`);
  }
  console.log(`✅ ${testimonials.length} testimonials seeded\n`);

  // Summary
  const stats = await prisma.$transaction([
    prisma.category.count(),
    prisma.freelance.count(),
    prisma.service.count(),
    prisma.serviceOption.count(),
    prisma.serviceTag.count(),
    prisma.testimonial.count(),
    prisma.user.count(),
  ]);

  console.log('═══════════════════════════════════════');
  console.log('📊 Database seed completed successfully!');
  console.log('═══════════════════════════════════════');
  console.log(`   Categories:       ${stats[0]}`);
  console.log(`   Freelances:       ${stats[1]}`);
  console.log(`   Services:         ${stats[2]}`);
  console.log(`   Service Options:  ${stats[3]}`);
  console.log(`   Service Tags:     ${stats[4]}`);
  console.log(`   Testimonials:     ${stats[5]}`);
  console.log(`   Users:            ${stats[6]}`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
