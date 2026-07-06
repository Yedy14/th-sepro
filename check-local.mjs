import { PrismaClient } from '@prisma/client';
const p = new PrismaClient({ log: [] });
try {
  await p.$connect();
  const [cats, frees, servs, opts, tags, users, tests] = await Promise.all([
    p.category.count(), p.freelance.count(), p.service.count(),
    p.serviceOption.count(), p.serviceTag.count(), p.user.count(), p.testimonial.count()
  ]);
  console.log('📊 État de la base Supabase :');
  console.log(`  Categories:       ${cats}`);
  console.log(`  Freelances:       ${frees}`);
  console.log(`  Services:         ${servs}`);
  console.log(`  Service Options:  ${opts}`);
  console.log(`  Service Tags:     ${tags}`);
  console.log(`  Users:            ${users}`);
  console.log(`  Témoignages:      ${tests}`);
  await p.$disconnect();
} catch (e) {
  console.log('❌', e.message?.substring(0, 300));
}
