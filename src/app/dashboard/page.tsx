import { getCurrentUser } from '@/lib/auth';
import { getUserOrders } from '@/lib/data-service';
import DashboardPageClient from './DashboardPageClient';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const role = user.role === 'FREELANCE' ? 'freelance' : 'client';
  const orders = await getUserOrders(user.id, role as 'client' | 'freelance');

  const dashboardData = {
    activeOrders: orders.filter(o => o.status === 'IN_PROGRESS' || o.status === 'PENDING').length,
    totalSpent: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    reviewsGiven: orders.filter(o => o.hasReview).length,
    favoritesCount: 0,
    recentOrders: orders.slice(0, 5),
  };

  return <DashboardPageClient user={user} dashboardData={dashboardData} />;
}
