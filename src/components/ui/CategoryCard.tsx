'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { PenTool, SpellCheck, BarChart3, GraduationCap, Languages, BookOpen } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  PenTool, SpellCheck, BarChart3, GraduationCap, Languages, BookOpen,
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  const { t } = useTranslation();
  const Icon = iconMap[category.icon] || BookOpen;

  return (
    <Link href={`/services?category=${category.slug}`}>
      <div className={cn(
        'group relative bg-white rounded-xl border border-neutral-200 p-6 card-hover cursor-pointer overflow-hidden',
        className
      )}>
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-8 translate-x-8" style={{ backgroundColor: category.color }} />
        <div className="relative">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${category.color}15` }}>
            <Icon className="w-6 h-6" style={{ color: category.color }} />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{category.description}</p>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span>{category.freelancerCount} {t('categoryCard.freelances')}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span>{category.serviceCount} {t('categoryCard.services')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
