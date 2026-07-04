import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { toggleServiceActive } from '@/lib/data-service';

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const updated = await toggleServiceActive(params.id);
    return NextResponse.json({ service: updated });
  } catch (error) {
    console.error('Toggle service error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
