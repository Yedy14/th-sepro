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
    <div className="min-h-screen bg-[#edf6fd] noise-overlay">
      {/* Hero header with gradient */}
      <div className="relative overflow-hidden border-b border-primary-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-dark to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.08),transparent_50%)]" />
        
        <div className="container-responsive relative z-10 py-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <div className="animate-slide-up">
              <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                <Link href="/" className="hover:text-primary-800 transition-colors">{t('common.home')}</Link>
                <span>/</span>
                <span className="text-primary-700">{t('services.breadcrumb')}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black text-primary-800 mb-3">
                {t('services.title1')} <span className="text-gradient-primary">{t('services.title2')}</span>
              </h1>
              <p className="text-neutral-400 text-lg">{filtered.length} {t('services.available')}</p>
            </div>

            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 animate-slide-in-right">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('services.searchPlaceholder')}
                  className="w-full h-12 pl-11 pr-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-500 focus:border-primary-400/50 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 h-12 px-5 rounded-xl text-sm font-medium transition-all ${
                  showFilters ? 'glass text-primary-400 border-primary-400/30' : 'glass text-primary-700 hover:text-primary-800'
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
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-bold text-primary-800 mb-5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  {t('services.categories')}
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all ${
                      selectedCategory === 'all' ? 'glass text-primary-400 font-semibold' : 'text-neutral-400 hover:bg-primary-50 hover:text-primary-800'
                    }`}
                  >
                    {t('services.allCategories')}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                        selectedCategory === cat.slug ? 'glass text-primary-400 font-semibold' : 'text-neutral-400 hover:bg-primary-50 hover:text-primary-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-xs text-neutral-600">{cat.serviceCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-bold text-primary-800 mb-5">{t('services.maxBudget')}</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-full h-10 px-3 text-sm rounded-xl glass text-primary-800 outline-none focus:border-primary-400/50"
                    placeholder="Min"
                  />
                  <span className="text-neutral-600">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full h-10 px-3 text-sm rounded-xl glass text-primary-800 outline-none focus:border-primary-400/50"
                    placeholder="Max"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-3">{t('services.perProject')}</p>
              </div>

              {/* Reset */}
              <button
                onClick={() => { setSelectedCategory('all'); setSearch(''); setPriceRange([0, 500]); setSort('popular'); }}
                className="w-full flex items-center justify-center gap-2 h-11 text-sm text-neutral-400 hover:text-primary-800 glass rounded-xl hover:text-primary-400 transition-all"
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
              <span className="text-sm text-neutral-500 flex-shrink-0 mr-2">{t('services.sort')}</span>
              {sortOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                      sort === opt.value ? 'glass text-primary-400 font-semibold' : 'text-neutral-400 glass hover:text-primary-800'
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
              <div className="text-center py-20 glass rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-neutral-600" />
                </div>
                <p className="text-neutral-400 text-lg font-semibold mb-2">{t('services.noService')}</p>
                <p className="text-neutral-600 text-sm">{t('services.noServiceDesc')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
