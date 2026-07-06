'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Send, ChevronRight, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { useRealtimeMessages } from '@/lib/use-realtime-messages';

type Message = {
  id: string;
  content: string;
  senderId: string;
  sender: { name: string };
  createdAt: string;
};

export default function ChatPage() {
  const { t } = useTranslation();
  const params = useParams();
  const conversationId = params.id as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  useRealtimeMessages(conversationId, handleNewMessage);

  useEffect(() => {
    Promise.all([
      fetch(`/api/messages/${conversationId}`).then((r) => r.json()),
      fetch('/api/auth/me').then((r) => r.json()),
    ]).then(([msgData, userData]) => {
      setMessages(msgData.messages || []);
      setCurrentUserId(userData.user?.id || '');
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/messages/${conversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data.message]);
        setNewMessage('');
      }
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg noise-bg flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <MessageCircle className="w-8 h-8 text-blue" />
          </div>
          <p className="text-navy/70">{t('messages.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-108px)] bg-bg noise-bg flex flex-col">
      <div className="container-responsive flex-1 flex flex-col py-6">
        <div className="flex items-center gap-2 text-sm text-navy/70 mb-6 animate-fade-in">
          <Link href="/messages" className="hover:text-blue transition-colors">Messages</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-semibold">{t('messages.conversation')}</span>
        </div>

        <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col animate-fade-in">
          <div className="flex-1 overflow-y-auto p-8 space-y-4 min-h-[400px]">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue/50" />
                </div>
                <p className="text-navy/70">{t('messages.noMessages')}</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                  msg.senderId === currentUserId
                    ? 'bg-gradient-to-r from-blue to-navy text-white'
                    : 'glass text-navy'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.senderId === currentUserId ? 'text-white/60' : 'text-navy/70'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-blue/8">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={t('messages.writePlaceholder')}
                className="flex-1 h-12 px-5 text-sm rounded-xl glass text-navy placeholder:text-navy/70 focus:border-blue/50 outline-none transition-all"
              />
              <button
                onClick={handleSend}
                disabled={sending || !newMessage.trim()}
                className="w-12 h-12 bg-gradient-to-r from-blue to-navy hover:from-blue hover:to-navy text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-md/20 glow-sm"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
