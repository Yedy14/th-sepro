import { getFreelances, getCategories } from '@/lib/data-service';
import { FreelancesClient } from './FreelancesClient';

export default async function FreelancesPage() {
  const [freelances, categories] = await Promise.all([
    getFreelances(),
    getCategories(),
  ]);

  return <FreelancesClient freelances={freelances} categories={categories} />;
}
