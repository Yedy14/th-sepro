import { notFound } from 'next/navigation';
import { getFreelanceBySlug, getServices } from '@/lib/data-service';
import FreelanceProfileClient from './FreelanceProfileClient';

export default async function FreelanceProfilePage({ params }: { params: { slug: string } }) {
  const freelance = await getFreelanceBySlug(params.slug);
  if (!freelance) return notFound();

  const allServices = await getServices();
  const freelanceServices = allServices.filter((s) => s.freelancerId === freelance.id);

  return <FreelanceProfileClient freelance={freelance} freelanceServices={freelanceServices} />;
}
