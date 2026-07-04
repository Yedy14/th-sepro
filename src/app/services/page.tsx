import { getServices, getCategories, getFreelances } from '@/lib/data-service';
import { ServicesClient } from './ServicesClient';

export default async function ServicesPage() {
  const [services, categories, freelances] = await Promise.all([
    getServices(),
    getCategories(),
    getFreelances(),
  ]);

  return <ServicesClient services={services} categories={categories} freelances={freelances} />;
}
