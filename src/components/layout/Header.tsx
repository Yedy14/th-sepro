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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark shadow-lg' : 'bg-black/80 backdrop-blur-md'}`}>
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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

            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header.search')}
                  className="w-full h-11 pl-12 pr-12 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-primary-400/50 focus:bg-white/10 outline-none transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-primary-400 transition-colors" />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary-400 hover:bg-primary-500 flex items-center justify-center transition-all duration-300 hover:scale-105">
                  <Search className="w-4 h-4 text-black" />
                </button>
              </div>
            </form>

            {/* Actions droite */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="h-10 px-3 rounded-xl glass hover:bg-white/10 flex items-center gap-2 transition-all duration-300 group"
                >
                  <Globe className="w-4 h-4 text-neutral-400 group-hover:text-primary-400 transition-colors" />
                  <span className="text-xs font-bold text-neutral-300 uppercase">{locale}</span>
                  <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl z-50 overflow-hidden">
                    <button
                      onClick={() => switchLang('fr')}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${locale === 'fr' ? 'text-primary-400 font-semibold' : 'text-neutral-300'}`}
                    >
                      <span>🇫🇷</span> Français
                    </button>
                    <button
                      onClick={() => switchLang('en')}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${locale === 'en' ? 'text-primary-400 font-semibold' : 'text-neutral-300'}`}
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
                  <button className="h-11 px-6 rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-black font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-primary-400/20">
                    {t('header.login')}
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white hover:text-primary-400 transition-colors">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation secondaire */}
        <nav className="border-t border-white/5">
          <div className="container-responsive">
            <div className="flex items-center gap-1 h-11 overflow-x-auto hide-scrollbar">
              <Link href="/" className="flex-shrink-0 px-4 py-2 text-sm text-white font-medium hover:text-primary-400 transition-colors relative group">
                {t('header.forYou')}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              <Link href="/services" className="flex-shrink-0 px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">
                {t('header.bestServices')}
              </Link>
              <Link href="/freelances" className="flex-shrink-0 px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">
                {t('header.bestFreelances')}
              </Link>
              <span className="w-px h-4 bg-white/10 flex-shrink-0 mx-2" />
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/services?category=${cat.slug}`}
                  className="flex-shrink-0 px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
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
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 max-h-[calc(100vh-64px)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-4">
              {/* Language switcher mobile */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => switchLang('fr')}
                  className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium transition-all ${locale === 'fr' ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30' : 'glass text-neutral-400'}`}
                >
                  🇫🇷 Français
                </button>
                <button
                  onClick={() => switchLang('en')}
                  className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium transition-all ${locale === 'en' ? 'bg-primary-400/20 text-primary-400 border border-primary-400/30' : 'glass text-neutral-400'}`}
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
                  className="w-full h-12 pl-12 pr-4 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 outline-none focus:border-primary-400/50"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              </form>

              {/* Navigation */}
              <div className="space-y-1">
                <Link href="/" className="block px-4 py-3 text-white font-medium rounded-xl hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('header.forYou')}
                </Link>
                <Link href="/services" className="block px-4 py-3 text-neutral-400 rounded-xl hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('header.bestServices')}
                </Link>
                <Link href="/freelances" className="block px-4 py-3 text-neutral-400 rounded-xl hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {t('header.bestFreelances')}
                </Link>
              </div>

              {/* Catégories */}
              <div className="pt-4 border-t border-white/10">
                <p className="px-4 text-xs text-neutral-500 uppercase tracking-wider mb-3">{t('header.categories')}</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link key={cat.slug} href={`/services?category=${cat.slug}`} className="block px-4 py-2.5 text-sm text-neutral-400 rounded-xl hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth */}
              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block px-4 py-3 text-white font-medium rounded-xl hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.dashboard')}
                    </Link>
                    <Link href="/settings" className="block px-4 py-3 text-neutral-400 rounded-xl hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.settings')}
                    </Link>
                    <button onClick={() => { fetch('/api/auth/logout', { method: 'POST' }); document.cookie = 'thesepro_token=; path=/; max-age=0'; window.location.href = '/login'; }} className="block w-full text-left px-4 py-3 text-red-400 rounded-xl hover:bg-red-400/10 transition-colors">
                      {t('header.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-3 text-neutral-400 rounded-xl hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      {t('header.loginMobile')}
                    </Link>
                    <Link href="/register" className="block px-4 py-3 text-black font-semibold bg-primary-400 rounded-xl text-center mt-2" onClick={() => setMobileMenuOpen(false)}>
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
