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
                <span className="text-primary-700">{t('freelances.breadcrumb')}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black text-primary-800 mb-3">
                {t('freelances.title1')} <span className="text-gradient-primary">{t('freelances.title2')}</span> {t('freelances.title3')}
              </h1>
              <p className="text-neutral-400 text-lg">{t('freelances.subtitle')}</p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80 animate-slide-in-right">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('freelances.searchPlaceholder')}
                className="w-full h-12 pl-11 pr-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-500 focus:border-primary-400/50 outline-none transition-all"
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
            className={`text-sm px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'glass text-primary-400'
                : 'glass text-neutral-400 hover:text-primary-800'
            }`}
          >
            <Users className="w-4 h-4" />
            {t('freelances.all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`text-sm px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedCategory === cat.slug
                  ? 'glass text-primary-400'
                  : 'glass text-neutral-400 hover:text-primary-800'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="flex items-center gap-1 text-sm px-3 py-2.5 text-neutral-500 hover:text-primary-400 transition-all"
            >
              <X className="w-3.5 h-3.5" /> {t('freelances.clear')}
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-primary-50" />
          <p className="text-sm text-neutral-500 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary-400" />
            {filtered.length} {filtered.length !== 1 ? t('freelances.foundPlural') : t('freelances.found')}
          </p>
          <div className="h-px flex-1 bg-primary-50" />
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
          <div className="text-center py-20 glass rounded-3xl">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-600" />
            </div>
            <p className="text-neutral-400 text-lg font-semibold mb-2">{t('freelances.noFreelance')}</p>
            <p className="text-neutral-600 text-sm">{t('freelances.noFreelanceDesc')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
