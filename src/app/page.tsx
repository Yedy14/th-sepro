import { getServices, getFreelances, getCategories, getTestimonials, getStats } from '@/lib/data-service';
import HomePageClient from './HomePageClient';

export default async function HomePage() {
  const [services, freelances, categories, testimonials, stats] = await Promise.all([
    getServices(),
    getFreelances(),
    getCategories(),
    getTestimonials(),
    getStats(),
  ]);

  const popularServices = services.filter((s) => s.sponsored).slice(0, 8);
  const topFreelances = freelances.slice(0, 6);

  return (
    <HomePageClient
      services={services}
      freelances={freelances}
      categories={categories}
      testimonials={testimonials}
      stats={stats}
      popularServices={popularServices}
      topFreelances={topFreelances}
    />
  );
}
