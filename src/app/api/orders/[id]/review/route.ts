import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { createReview } from '@/lib/data-service';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const body = await request.json();
    const { rating, comment } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Note invalide' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { review: true },
    });

    if (!order) return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    if (order.clientId !== user.id) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    if (order.review) return NextResponse.json({ error: 'Avis déjà donné' }, { status: 409 });

    const review = await createReview({
      orderId: params.id,
      clientId: user.id,
      freelanceId: order.freelanceId,
      serviceId: order.serviceId,
      rating,
      comment,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
