import { getCurrentUser } from '@/lib/auth';
import MessagesPageClient from './MessagesPageClient';

export default async function MessagesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // TODO: Fetch real conversations
  const conversations: any[] = [];

  return <MessagesPageClient conversations={conversations} />;
}
