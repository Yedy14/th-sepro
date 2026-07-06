import React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const initials = getInitials(name);
  const colors = [
    'bg-blue', 'bg-blue', 'bg-blue', 'bg-blue/50',
    'bg-navy', 'bg-blue', 'bg-navy', 'bg-blue',
  ];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  return (
    <div className={cn('relative rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white', sizes[size], className)}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className={cn('w-full h-full flex items-center justify-center text-white font-bold', colors[colorIndex])}>
          {initials}
        </div>
      )}
    </div>
  );
}

interface AvatarGroupProps {
  names: string[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({ names, max = 4, size = 'md', className }: AvatarGroupProps) {
  const visible = names.slice(0, max);
  const remaining = names.length - max;

  return (
    <div className={cn('flex -space-x-3', className)}>
      {visible.map((name, i) => (
        <Avatar key={i} name={name} size={size} className="ring-2 ring-white" />
      ))}
      {remaining > 0 && (
        <div className={cn(
          'rounded-full bg-blue/20 text-navy/70 font-semibold flex items-center justify-center ring-2 ring-white',
          size === 'sm' ? 'w-7 h-7 text-xs' : size === 'md' ? 'w-10 h-10 text-sm' : 'w-14 h-14 text-base'
        )}>
          +{remaining}
        </div>
      )}
    </div>
  );
}
