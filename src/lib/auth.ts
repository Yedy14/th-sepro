import { createClient } from '@/lib/supabase';
import prisma from '@/lib/db';

export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      emailVerified: true,
      freelance: {
        select: { id: true, slug: true },
      },
    },
  });

  return dbUser;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Non authentifié');
  return user;
}
