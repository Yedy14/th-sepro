import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { getFreelancerEarnings } from '@/lib/data-service';
import EarningsPageClient from './EarningsPageClient';

export default async function EarningsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const freelance = await prisma.freelance.findUnique({ where: { userId: user.id } });
  if (!freelance) {
    return <EarningsPageClient hasFreelance={false} earnings={null} />;
  }

  const earnings = await getFreelancerEarnings(freelance.id);
  return <EarningsPageClient hasFreelance={true} earnings={earnings} />;
}
