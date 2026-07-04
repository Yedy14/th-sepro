import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { createOrder, getUserOrders } from '@/lib/data-service';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { serviceSlug, optionType, totalAmount, notes } = body;

    if (!serviceSlug || !optionType || !totalAmount) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Find service by slug
    const service = await prisma.service.findUnique({
      where: { slug: serviceSlug },
    });
    if (!service) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }

    const order = await createOrder({
      serviceId: service.id,
      clientId: user.id,
      optionType: optionType.toUpperCase(),
      totalAmount,
      notes,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Erreur lors de la commande' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const role = user.role === 'FREELANCE' ? 'freelance' : 'client';
    const orders = await getUserOrders(user.id, role as 'client' | 'freelance');

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des commandes' }, { status: 500 });
  }
}
