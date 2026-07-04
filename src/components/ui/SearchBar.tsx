'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'md' | 'lg';
}

export function SearchBar({ value, onChange, placeholder, className, size = 'md' }: SearchBarProps) {
  const { t } = useTranslation();
  const displayPlaceholder = placeholder || t('searchBar.placeholder');
  const sizes = {
    md: 'h-12 text-sm',
    lg: 'h-14 text-base',
  };

  return (
    <div className={cn('relative w-full', className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={displayPlaceholder}
        className={cn(
          'w-full pl-12 pr-4 rounded-xl border-2 border-neutral-200 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all duration-200 placeholder:text-neutral-400',
          sizes[size]
        )}
      />
    </div>
  );
}
