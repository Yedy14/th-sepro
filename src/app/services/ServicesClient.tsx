'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, Sparkles, TrendingUp, Filter } from 'lucide-react';
import { Service, Freelance, Category } from '@/types';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useTranslation } from '@/lib/i18n/LanguageContext';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface ServicesClientProps {
  services: Service[];
  categories: Category[];
  freelances: Freelance[];
}

export function ServicesClient({ services, categories, freelances }: ServicesClientProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sort, setSort] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filtered = useMemo(() => {
    let result = [...services];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }
    result = result.filter((s) => s.price >= priceRange[0] && s.price <= priceRange[1]);
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [services, search, selectedCategory, sort, priceRange]);

  const sortOptions: { value: SortOption; label: string; icon: any }[] = [
    { value: 'popular', label: t('services.popular'), icon: TrendingUp },
    { value: 'rating', label: t('services.bestRated'), icon: Sparkles },
    { value: 'price-asc', label: `${t('services.perProject').split(' ')[0]} ↑`, icon: null },
    { value: 'price-desc', label: `${t('services.perProject').split(' ')[0]} ↓`, icon: null },
    { value: 'newest', label: t('services.recent'), icon: null },
  ];

  return (
    <div className="min-h-screen bg-bg noise-overlay">
      {/* Hero header */}
      <div className="border-b border-blue/8 bg-white">
        <div className="container-responsive relative z-10 py-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <div>
              <nav className="flex items-center gap-2 text-sm text-navy/60 mb-4">
                <Link href="/" className="hover:text-blue transition-colors">{t('common.home')}</Link>
                <span>/</span>
                <span className="text-navy">{t('services.breadcrumb')}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-3">
                {t('services.title1')} <span className="text-gradient">{t('services.title2')}</span>
              </h1>
              <p className="text-navy/60 text-lg">{filtered.length} {t('services.available')}</p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('services.searchPlaceholder')}
                  className="w-full h-12 pl-11 pr-4 text-sm rounded-xl bg-bg border border-blue/8 text-navy placeholder:text-navy/40 focus:border-blue/30 focus:shadow-sm outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 h-12 px-5 rounded-xl text-sm font-medium transition-all border ${
                  showFilters ? 'bg-blue/5 text-blue border-blue/20' : 'bg-bg text-navy border-blue/8 hover:bg-blue/5'
                }`}
              >
                <Filter className="w-4 h-4" />
                {t('services.filters')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive py-10">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="sticky top-[110px] space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue/8">
                <h3 className="text-sm font-bold text-navy mb-5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue" />
                  {t('services.categories')}
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all ${
                      selectedCategory === 'all' ? 'bg-blue/5 text-blue font-semibold' : 'text-navy/70 hover:bg-blue/5 hover:text-navy'
                    }`}
                  >
                    {t('services.allCategories')}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                        selectedCategory === cat.slug ? 'bg-blue/5 text-blue font-semibold' : 'text-navy/70 hover:bg-blue/5 hover:text-navy'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-xs text-navy/40">{cat.serviceCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue/8">
                <h3 className="text-sm font-bold text-navy mb-5">{t('services.maxBudget')}</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-full h-10 px-3 text-sm rounded-xl bg-bg border border-blue/8 text-navy outline-none focus:border-blue/30"
                    placeholder="Min"
                  />
                  <span className="text-navy/40">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full h-10 px-3 text-sm rounded-xl bg-bg border border-blue/8 text-navy outline-none focus:border-blue/30"
                    placeholder="Max"
                  />
                </div>
                <p className="text-xs text-navy/50 mt-3">{t('services.perProject')}</p>
              </div>

              {/* Reset */}
              <button
                onClick={() => { setSelectedCategory('all'); setSearch(''); setPriceRange([0, 500]); setSort('popular'); }}
                className="w-full flex items-center justify-center gap-2 h-11 text-sm text-navy/60 hover:text-blue bg-white rounded-xl border border-blue/8 hover:border-blue/20 transition-all"
              >
                <X className="w-4 h-4" />
                {t('services.resetFilters')}
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div>
            {/* Sort pills */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
              <span className="text-sm text-navy/60 flex-shrink-0 mr-2">{t('services.sort')}</span>
              {sortOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 border ${
                      sort === opt.value ? 'bg-blue/5 text-blue border-blue/20 font-semibold' : 'bg-white text-navy/70 border-blue/8 hover:text-navy'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Results */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((service, i) => {
                  const freelance = freelances.find((f) => f.id === service.freelancerId);
                  return (
                    <div key={service.id} className={`animate-slide-up stagger-${(i % 6) + 1}`}>
                      <ServiceCard service={service} freelance={freelance} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-blue/8">
                <div className="w-16 h-16 rounded-2xl bg-blue/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-navy/40" />
                </div>
                <p className="text-navy/70 text-lg font-semibold mb-2">{t('services.noService')}</p>
                <p className="text-navy/50 text-sm">{t('services.noServiceDesc')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
