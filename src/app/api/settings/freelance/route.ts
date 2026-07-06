import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const freelance = await prisma.freelance.findUnique({ where: { userId: user.id } });
    if (!freelance) return NextResponse.json({ error: 'Profil freelance non trouvé' }, { status: 404 });

    const body = await request.json();
    const { title, speciality, bio, skills, location, responseTime, avatar } = body;

    const updateData: Record<string, unknown> = {};
    if (title) updateData.title = title;
    if (speciality) updateData.speciality = speciality;
    if (bio !== undefined) updateData.bio = bio;
    if (skills) updateData.skills = skills;
    if (location) updateData.location = location;
    if (responseTime) updateData.responseTime = responseTime;
    if (avatar) updateData.avatar = avatar;

    const updated = await prisma.freelance.update({
      where: { id: freelance.id },
      data: updateData,
    });

    return NextResponse.json({ freelance: updated });
  } catch (error) {
    console.error('Update freelance settings error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
