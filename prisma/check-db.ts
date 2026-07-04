import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();

async function main() {
  const cats = await p.category.count();
  const frees = await p.freelance.count();
  const servs = await p.service.count();
  const opts = await p.serviceOption.count();
  const tags = await p.serviceTag.count();
  const tests = await p.testimonial.count();
  const users = await p.user.count();

  console.log('=== Vraie base SQLite (dev.db) ===');
  console.log('Fichier: prisma/dev.db (380 KB)');
  console.log('');
  console.log('Tables et nombres de lignes:');
  console.log('  Users:           ' + users);
  console.log('  Freelances:      ' + frees);
  console.log('  Categories:      ' + cats);
  console.log('  Services:        ' + servs);
  console.log('  Service Options: ' + opts);
  console.log('  Service Tags:    ' + tags);
  console.log('  Testimonials:    ' + tests);
  console.log('');
  console.log('Autres tables (vides, pretes a l emploi):');
  console.log('  Orders, Reviews, Payments, Withdrawals,');
  console.log('  Conversations, Messages, OrderRevisions');

  // Show a sample freelance
  const sample = await p.freelance.findFirst({ include: { user: true, category: true } });
  if (sample) {
    console.log('');
    console.log('Exemple de freelance en base:');
    console.log('  Nom:      ' + sample.user.name);
    console.log('  Slug:     ' + sample.slug);
    console.log('  Categorie:' + sample.category?.name);
    console.log('  Note:     ' + sample.rating);
    console.log('  Ventes:   ' + sample.sales);
  }

  await p.$disconnect();
}

main();
