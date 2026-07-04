'use client';

import Link from 'next/link';
import { Heart, Mail, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export function Footer() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Array<{ slug: string; name: string }>>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-neutral-950 border-t border-white/5">
      {/* Section principale */}
      <div className="container-responsive py-16">
        {/* Brand message */}
        <div className="text-center mb-12 pb-10 border-b border-white/5">
          <Link href="/" className="inline-block mb-4 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xl font-black text-black">T</span>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  THÈSE<span className="text-gradient">PRO</span>
                </span>
                <span className="block text-[10px] text-neutral-500 -mt-1 tracking-wider">{t('header.academicExperts')}</span>
              </div>
            </div>
          </Link>
          <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
            {t('footer.aboutUs')}
          </p>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary-400 rounded-full" />
              {t('footer.ourServices')}
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/services?category=${cat.slug}`} className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors flex items-center gap-1 group">
                  {t('footer.allServices')}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Freelances */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary-400 rounded-full" />
              {t('footer.freelances')}
            </h4>
            <ul className="space-y-3">
              <li><Link href="/freelances" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.bestFreelances')}</Link></li>
              <li><Link href="/register" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.becomeFreelance')}</Link></li>
              <li><Link href="/help" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.freelanceGuide')}</Link></li>
              <li><Link href="/messages" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.community')}</Link></li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary-400 rounded-full" />
              {t('footer.about')}
            </h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.ourStory')}</Link></li>
              <li><Link href="/about" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.ourTeam')}</Link></li>
              <li><Link href="/help" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.helpCenter')}</Link></li>
              <li><Link href="/help" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.blog')}</Link></li>
              <li><Link href="/contact" className="text-sm text-neutral-500 hover:text-primary-400 transition-colors">{t('footer.contactUs')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary-400 rounded-full" />
              {t('footer.question')}
            </h4>
            <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
              {t('footer.teamAvailable')}
            </p>
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-neutral-400">contact@thesepro.fr</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-neutral-400">{t('footer.response24h')}</span>
              </div>
            </div>
            <Link href="/help" className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors group">
              {t('footer.helpCenter')}
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <p className="text-sm text-neutral-500 flex items-center gap-2">
              &copy; {new Date().getFullYear()} ThèsePro &mdash; Fait avec <Heart className="w-4 h-4 text-red-400 fill-red-400" /> {t('footer.madeWith')}
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="#" className="hover:text-primary-400 transition-colors">{t('footer.terms')}</Link>
              <Link href="#" className="hover:text-primary-400 transition-colors">{t('footer.privacy')}</Link>
              <Link href="#" className="hover:text-primary-400 transition-colors">{t('footer.cookies')}</Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600">Français &bull; XOF (F CFA) &bull; EUR (&euro;)</p>
            <div className="flex items-center gap-3">
              {['LinkedIn', 'YouTube', 'Facebook', 'TikTok'].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition-all duration-300 group" aria-label={s}>
                  <span className="text-xs font-bold text-neutral-500 group-hover:text-primary-400 transition-colors">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
