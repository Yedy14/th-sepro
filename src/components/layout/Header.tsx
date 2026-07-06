'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Globe, User, Menu, X, ChevronDown } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import type { Locale } from '@/lib/i18n/translations';

export function Header() {
  const { t, locale, setLocale } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    freelance?: { id: string; slug: string } | null;
  } | null>(null);
  const [categories, setCategories] = useState<Array<{ slug: string; name: string }>>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});

    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const switchLang = (lang: Locale) => {
    setLocale(lang);
    setLangOpen(false);
  };

  return (
    <>
      {/* Header principal */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-md'}`}>
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue to-navy flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-xl font-black text-white">T</span>
                </div>
                <div>
                  <span className="text-xl font-black text-navy tracking-tight">
                    THÈSE<span className="text-gradient">PRO</span>
                  </span>
                  <span className="block text-[10px] text-navy/50 -mt-1 tracking-wider">{t('header.academicExperts')}</span>
                </div>
              </div>
            </Link>

            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header.search')}
                  className="w-full h-11 pl-11 pr-12 text-sm rounded-xl bg-bg border border-blue/8 text-navy placeholder:text-navy/40 focus:border-blue/30 focus:bg-white focus:shadow-sm outline-none transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50 group-focus-within:text-blue transition-colors" />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gradient-to-br from-blue to-navy hover:from-navy hover:to-navy flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm">
                  <Search className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </form>

            {/* Actions droite */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="h-10 px-3 rounded-xl bg-bg hover:bg-blue/5 flex items-center gap-2 transition-all duration-300 group"
                >
                  <Globe className="w-4 h-4 text-navy/50 group-hover:text-blue transition-colors" />
                  <span className="text-xs font-bold text-navy uppercase">{locale}</span>
                  <ChevronDown className={`w-3 h-3 text-navy/50 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-blue/10 rounded-xl shadow z-50 overflow-hidden">
                    <button
                      onClick={() => switchLang('fr')}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-blue/5 transition-colors ${locale === 'fr' ? 'text-blue font-semibold' : 'text-navy'}`}
                    >
                      <span>🇫🇷</span> Français
                    </button>
                    <button
                      onClick={() => switchLang('en')}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-blue/5 transition-colors ${locale === 'en' ? 'text-blue font-semibold' : 'text-navy'}`}
                    >
                      <span>🇬🇧</span> English
                    </button>
                  </div>
                )}
              </div>

              {user ? (
                <UserMenu user={user} />
              ) : (
                <Link href="/login">
                  <button className="h-11 px-6 rounded-xl bg-gradient-to-r from-blue to-navy hover:from-navy hover:to-navy text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md">
                    {t('header.login')}
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-navy hover:text-blue transition-colors">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation secondaire */}
        <nav className="border-t border-blue/10">
          <div className="container-responsive">
            <div className="flex items-center gap-1 h-11 overflow-x-auto hide-scrollbar">
              <Link href="/" className="flex-shrink-0 px-4 py-2 text-sm text-navy font-semibold hover:text-blue transition-colors relative group">
                {t('header.forYou')}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              <Link href="/services" className="flex-shrink-0 px-4 py-2 text-sm text-navy/50 hover:text-navy transition-colors">
                {t('header.bestServices')}
              </Link>
              <Link href="/freelances" className="flex-shrink-0 px-4 py-2 text-sm text-navy/50 hover:text-navy transition-colors">
                {t('header.bestFreelances')}
              </Link>
              <span className="w-px h-4 bg-blue/10 flex-shrink-0 mx-2" />
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/services?category=${cat.slug}`}
                  className="flex-shrink-0 px-4 py-2 text-sm text-navy/50 hover:text-navy transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Espacement pour header fixe */}
      <div className="h-[108px]" />

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 max-h-[calc(100vh-64px)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-4">
              {/* Language switcher mobile */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => switchLang('fr')}
                  className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium transition-all ${locale === 'fr' ? 'bg-blue/10 text-blue border border-blue/20' : 'bg-bg text-navy/60'}`}
                >
                  🇫🇷 Français
                </button>
                <button
                  onClick={() => switchLang('en')}
                  className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium transition-all ${locale === 'en' ? 'bg-blue/10 text-blue border border-blue/20' : 'bg-bg text-navy/60'}`}
                >
                  🇬🇧 English
                </button>
              </div>

              {/* Search mobile */}
              <form onSubmit={handleSearch} className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header.searchShort')}
                  className="w-full h-12 pl-12 pr-4 text-sm rounded-xl bg-bg border border-blue/8 text-navy placeholder:text-navy/40 outline-none focus:border-blue/30 focus:shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/50" />
              </form>

              {/* Navigation */}
              <div className="space-y-1">
                <Link href="/" className="block px-4 py-3 text-navy font-semibold rounded-xl hover:bg-blue/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('header.forYou')}
                </Link>
                <Link href="/services" className="block px-4 py-3 text-navy/50 rounded-xl hover:bg-blue/5 hover:text-navy transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('header.bestServices')}
                </Link>
                <Link href="/freelances" className="block px-4 py-3 text-navy/50 rounded-xl hover:bg-blue/5 hover:text-navy transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('header.bestFreelances')}
                </Link>
              </div>

              {/* Catégories */}
              <div className="pt-4 border-t border-blue/10">
                <p className="px-4 text-xs text-navy/50 uppercase tracking-wider mb-3">{t('header.categories')}</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link key={cat.slug} href={`/services?category=${cat.slug}`} className="block px-4 py-2.5 text-sm text-navy/50 rounded-xl hover:bg-blue/5 hover:text-navy transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth */}
              <div className="pt-4 border-t border-blue/10">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block px-4 py-3 text-navy font-semibold rounded-xl hover:bg-blue/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.dashboard')}
                    </Link>
                    <Link href="/settings" className="block px-4 py-3 text-navy/50 rounded-xl hover:bg-blue/5 hover:text-navy transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.settings')}
                    </Link>
                    <button onClick={() => { fetch('/api/auth/logout', { method: 'POST' }); document.cookie = 'thesepro_token=; path=/; max-age=0'; window.location.href = '/login'; }} className="block w-full text-left px-4 py-3 text-navy rounded-xl hover:bg-blue/5 transition-colors">
                      {t('header.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-3 text-navy/50 rounded-xl hover:bg-blue/5 hover:text-navy transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.loginMobile')}
                    </Link>
                    <Link href="/register" className="block px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue to-navy rounded-xl text-center mt-2 shadow-md" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.register')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
