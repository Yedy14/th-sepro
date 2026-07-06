import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { getOrderById, updateOrderStatus } from '@/lib/data-service';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const order = await getOrderById(params.id);
    if (!order) return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });

    // Check access
    if (order.client.id !== user.id && order.freelance.id !== user.id) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const body = await request.json();
    const { status, cancellationReason } = body;

    const order = await getOrderById(params.id);
    if (!order) return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });

    const updated = await updateOrderStatus(params.id, status);

    if (cancellationReason) {
      await prisma.order.update({
        where: { id: params.id },
        data: { cancellationReason },
      });
    }

    return NextResponse.json({ order: updated });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
