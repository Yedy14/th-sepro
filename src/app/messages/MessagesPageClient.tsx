'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface Conversation {
  id: string;
  participant: string;
  lastMessage: string;
  lastMessageAt: string | Date;
}

interface MessagesPageClientProps {
  conversations: Conversation[];
}

export default function MessagesPageClient({ conversations }: MessagesPageClientProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#edf6fd] noise-bg">
      <div className="container-responsive py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <MessageCircle className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-primary-700">{t('messages.badge')}</span>
          </div>
          <h1 className="text-4xl font-black text-primary-800 mb-2">{t('messages.title')}</h1>
          <p className="text-neutral-400">{t('messages.subtitle')}</p>
        </div>

        {/* Conversations list */}
        {conversations.length > 0 ? (
          <div className="space-y-3 animate-fade-in">
            {conversations.map((conv, i) => (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className="glass rounded-2xl p-6 card-hover block animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400/20 to-primary-600/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-400">{conv.participant.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-base font-bold text-primary-800">{conv.participant}</p>
                      <span className="text-xs text-neutral-500">{new Date(conv.lastMessageAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-sm text-neutral-400 truncate">{conv.lastMessage}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-16 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-primary-400/50" />
            </div>
            <p className="text-xl text-neutral-400 mb-4">{t('messages.noConversations')}</p>
            <Link href="/services" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold text-sm transition-colors group">
              {t('messages.discoverServices')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
