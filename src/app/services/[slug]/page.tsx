import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices, getFreelanceById } from '@/lib/data-service';
import ServiceDetailClient from './ServiceDetailClient';

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return notFound();

  const freelance = await getFreelanceById(service.freelancerId);
  if (!freelance) return notFound();

  const allServices = await getServices();
  const relatedServices = allServices
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  const tiers = [
    { key: 'basic', label: 'Standard', name: service.options.basic.name, description: service.options.basic.description, price: service.options.basic.price || service.price, deliveryDays: service.options.basic.deliveryDays || 7 },
    { key: 'standard', label: 'Premium', name: service.options.standard.name, description: service.options.standard.description, price: service.options.standard.price || service.price, deliveryDays: service.options.standard.deliveryDays || 7 },
    { key: 'premium', label: 'Enterprise', name: service.options.premium.name, description: service.options.premium.description, price: service.options.premium.price || service.price, deliveryDays: service.options.premium.deliveryDays || 7 },
  ].filter(t => t.price > 0);

  return (
    <ServiceDetailClient
      service={service}
      freelance={freelance}
      relatedServices={relatedServices}
      tiers={tiers}
    />
  );
}
