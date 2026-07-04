import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getOrderById } from '@/lib/data-service';
import { formatPrice } from '@/lib/utils';
import { OrderDetailClient } from './OrderDetailClient';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return null;

  const order = await getOrderById(params.id);
  if (!order) notFound();

  if (order.client.id !== user.id && order.freelance.id !== user.id) notFound();

  return <OrderDetailClient order={order} currentUserId={user.id} />;
}
