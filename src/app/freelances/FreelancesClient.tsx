'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Award, Users, Filter } from 'lucide-react';
import { Freelance, Category } from '@/types';
import { FreelanceCard } from '@/components/ui/FreelanceCard';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface FreelancesClientProps {
  freelances: Freelance[];
  categories: Category[];
}

export function FreelancesClient({ freelances, categories }: FreelancesClientProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    let result = [...freelances];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) => f.name.toLowerCase().includes(q) || f.title.toLowerCase().includes(q) || f.speciality.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== 'all') {
      result = result.filter((f) => f.category === selectedCategory);
    }
    return result;
  }, [freelances, search, selectedCategory]);

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
                <span className="text-navy">{t('freelances.breadcrumb')}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black text-navy mb-3">
                {t('freelances.title1')} <span className="text-gradient">{t('freelances.title2')}</span> {t('freelances.title3')}
              </h1>
              <p className="text-navy/60 text-lg">{t('freelances.subtitle')}</p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('freelances.searchPlaceholder')}
                className="w-full h-12 pl-11 pr-4 text-sm rounded-xl bg-bg border border-blue/8 text-navy placeholder:text-navy/40 focus:border-blue/30 focus:shadow-sm outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive py-10">
        {/* Category pills with icons */}
        <div className="flex items-center gap-3 flex-wrap mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-sm px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 border ${
              selectedCategory === 'all'
                ? 'bg-blue/5 text-blue border-blue/20'
                : 'bg-white text-navy/70 border-blue/8 hover:text-navy'
            }`}
          >
            <Users className="w-4 h-4" />
            {t('freelances.all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`text-sm px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
                selectedCategory === cat.slug
                  ? 'bg-blue/5 text-blue border-blue/20'
                  : 'bg-white text-navy/70 border-blue/8 hover:text-navy'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-1 text-sm px-3 py-2.5 text-navy/60 hover:text-blue transition-all"
            >
              <X className="w-3.5 h-3.5" /> {t('freelances.clear')}
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-blue/8" />
          <p className="text-sm text-navy/60 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue" />
            {filtered.length} {filtered.length !== 1 ? t('freelances.foundPlural') : t('freelances.found')}
          </p>
          <div className="h-px flex-1 bg-blue/8" />
        </div>

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((freelance, i) => (
              <div key={freelance.id} className={`animate-slide-up stagger-${(i % 6) + 1}`}>
                <FreelanceCard freelance={freelance} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-blue/8">
            <div className="w-16 h-16 rounded-2xl bg-blue/5 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-navy/40" />
            </div>
            <p className="text-navy/70 text-lg font-semibold mb-2">{t('freelances.noFreelance')}</p>
            <p className="text-navy/50 text-sm">{t('freelances.noFreelanceDesc')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
