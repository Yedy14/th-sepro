import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { getFreelancerServices } from '@/lib/data-service';
import DashboardServicesClient from './DashboardServicesClient';

export default async function DashboardServicesPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const freelance = await prisma.freelance.findUnique({ where: { userId: user.id } });
  if (!freelance) {
    return <DashboardServicesClient hasFreelance={false} services={[]} />;
  }

  const services = await getFreelancerServices(freelance.id);
  return <DashboardServicesClient hasFreelance={true} services={services} />;
}
