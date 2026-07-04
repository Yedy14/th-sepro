import { getCurrentUser } from '@/lib/auth';
import { getUserOrders } from '@/lib/data-service';
import OrdersPageClient from './OrdersPageClient';

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const role = user.role === 'FREELANCE' ? 'freelance' : 'client';
  const orders = await getUserOrders(user.id, role as 'client' | 'freelance');

  return <OrdersPageClient orders={orders} />;
}
