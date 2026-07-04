'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Send, ChevronRight, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function ChatPage() {
  const { t } = useTranslation();
  const params = useParams();
  const conversationId = params.id as string;
  const [messages, setMessages] = useState<{ id: string; content: string; senderId: string; sender: { name: string }; createdAt: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/messages/${conversationId}`)
      .then((res) => res.json())
      .then((data) => { setMessages(data.messages || []); setLoading(false); })
      .catch(() => setLoading(false));
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
      <div className="min-h-screen bg-[#edf6fd] noise-bg flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <MessageCircle className="w-8 h-8 text-primary-400" />
          </div>
          <p className="text-neutral-400">{t('messages.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-108px)] bg-[#edf6fd] noise-bg flex flex-col">
      <div className="container-responsive flex-1 flex flex-col py-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6 animate-fade-in">
          <Link href="/messages" className="hover:text-primary-400 transition-colors">Messages</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary-800 font-semibold">{t('messages.conversation')}</span>
        </div>

        {/* Messages container */}
        <div className="flex-1 glass rounded-3xl overflow-hidden flex flex-col animate-fade-in">
          <div className="flex-1 overflow-y-auto p-8 space-y-4 min-h-[400px]">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary-400/50" />
                </div>
                <p className="text-neutral-400">{t('messages.noMessages')}</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                  msg.senderId === 'me'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white'
                    : 'glass text-primary-800'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.senderId === 'me' ? 'text-white/60' : 'text-neutral-500'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-primary-100">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={t('messages.writePlaceholder')}
                className="flex-1 h-12 px-5 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all"
              />
              <button
                onClick={handleSend}
                disabled={sending || !newMessage.trim()}
                className="w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-primary-400/20 glow-sm"
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
