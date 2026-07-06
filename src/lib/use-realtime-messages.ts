'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase-client';

type Message = {
  id: string;
  content: string;
  senderId: string;
  sender: { name: string };
  createdAt: string;
};

export function useRealtimeMessages(
  conversationId: string,
  onMessage: (message: Message) => void,
) {
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>['channel']> | null>(null);

  const subscribe = useCallback(() => {
    const supabase = createClient();

    channelRef.current = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Message',
          filter: `conversationId=eq.${conversationId}`,
        },
        (payload) => {
          onMessage(payload.new as Message);
        },
      )
      .subscribe();
  }, [conversationId, onMessage]);

  useEffect(() => {
    subscribe();
    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [subscribe]);

  return { subscribe };
}
