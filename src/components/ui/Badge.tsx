import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'sponsored';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-blue/10 text-navy',
    primary: 'bg-blue/5 text-navy',
    accent: 'bg-blue/5 text-navy',
    success: 'bg-blue/5 text-navy',
    sponsored: 'bg-blue/5 text-navy border border-blue/20',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}
