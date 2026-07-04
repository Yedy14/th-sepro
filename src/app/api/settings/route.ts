import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import prisma from '@/lib/db';

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    const updateData: Record<string, unknown> = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Mot de passe actuel requis' }, { status: 400 });
      }
      const existingUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (!existingUser) return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });

      const { verifyPassword } = await import('@/lib/auth');
      const isValid = await verifyPassword(currentPassword, existingUser.password);
      if (!isValid) return NextResponse.json({ error: 'Mot de passe actuel incorrect' }, { status: 400 });

      updateData.password = await hashPassword(newPassword);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ user: updated });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
