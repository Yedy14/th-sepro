'use client';

import Link from 'next/link';
import { Home, Search, ArrowRight, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[calc(100vh-108px)] bg-dark noise-bg flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(234,179,8,0.05),transparent_50%)]" />
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/3 rounded-full blur-3xl animate-float-slow" />

      <div className="text-center relative z-10 animate-fade-in px-4">
        {/* 404 number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-gradient leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="w-20 h-20 text-primary-400/20" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {t('notFound.title')}
        </h2>
        <p className="text-lg text-neutral-400 mb-10 max-w-md mx-auto">
          {t('notFound.desc')}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary-400/20 glow-sm flex items-center gap-2 group"
          >
            <Home className="w-4 h-4" />
            {t('notFound.backHome')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="px-8 py-3 glass rounded-xl text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2 group"
          >
            <Search className="w-4 h-4" />
            {t('notFound.exploreServices')}
          </Link>
        </div>
      </div>
    </div>
  );
}
