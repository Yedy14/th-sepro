import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export function Rating({ value, count, size = 'md', showCount = true, className }: RatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <Star className={cn(sizes[size], 'fill-blue text-blue')} />
      <span className={cn(textSizes[size], 'font-semibold text-navy')}>{value.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className={cn(textSizes[size], 'text-navy/70')}>({count})</span>
      )}
    </div>
  );
}
