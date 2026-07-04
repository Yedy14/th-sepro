'use client';

import { BookOpen, Shield, MessageCircle, CreditCard, HelpCircle, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function HelpPage() {
  const { t } = useTranslation();

  const faqs = [
    { q: t('help.q1'), a: t('help.a1'), icon: BookOpen },
    { q: t('help.q2'), a: t('help.a2'), icon: Shield },
    { q: t('help.q3'), a: t('help.a3'), icon: MessageCircle },
    { q: t('help.q4'), a: t('help.a4'), icon: CreditCard },
    { q: t('help.q5'), a: t('help.a5'), icon: MessageCircle },
    { q: t('help.q6'), a: t('help.a6'), icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-dark noise-bg">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.08),transparent_50%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl animate-float" />
        
        <div className="container-responsive text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 mb-6 mx-auto">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            {t('help.title').split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{t('help.title').split(' ').pop()}</span>
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto">{t('help.subtitle')}</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container-responsive max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const Icon = faq.icon;
              return (
                <details key={i} className="group glass rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-400/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <span className="text-sm font-bold text-white">{faq.q}</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-neutral-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-sm text-neutral-400 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
