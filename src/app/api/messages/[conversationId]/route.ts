import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getMessages, sendMessage } from '@/lib/data-service';

export async function GET(_request: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const messages = await getMessages(params.conversationId);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

    const body = await request.json();
    const { content } = body;
    if (!content) return NextResponse.json({ error: 'Message vide' }, { status: 400 });

    const message = await sendMessage({
      conversationId: params.conversationId,
      senderId: user.id,
      content,
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
