'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Star, Bookmark, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { Service, Freelance } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface ServiceCardProps {
  service: Service;
  freelance?: Freelance;
  className?: string;
}

export function ServiceCard({ service, freelance, className }: ServiceCardProps) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn('group relative bg-white rounded-2xl overflow-hidden border border-blue/8 shadow-sm hover:shadow-lg hover:border-blue/15 transition-all duration-400', className)}
    >
      {/* Image du service */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-bg">
        {service.image && !imgError ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-bg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue to-navy flex items-center justify-center mx-auto mb-2 shadow-md">
                <span className="text-2xl font-bold text-white">{service.category.split('-').map(w => w[0]?.toUpperCase()).join('')}</span>
              </div>
              <p className="text-xs text-navy/50 capitalize">{service.category.replace(/-/g, ' ')}</p>
            </div>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Badge Top service */}
        {service.sponsored && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue to-navy text-white text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3" /> {t('services.topService')}
          </div>
        )}

        {/* Bouton bookmark */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm"
        >
          <Bookmark className="w-4 h-4 text-navy" />
        </button>
      </div>

      {/* Corps de la carte */}
      <div className="p-5 flex flex-col flex-1">
        {/* Info freelance */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-bg flex-shrink-0 ring-2 ring-blue/10">
              {freelance?.avatar ? (
                <Image src={freelance.avatar} alt={freelance.name} width={32} height={32} className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue to-navy flex items-center justify-center text-xs font-bold text-white">
                  {freelance?.name?.[0] || '?'}
                </div>
              )}
            </div>
            {freelance?.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[6px] text-white">✓</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-navy truncate">{freelance?.name}</p>
            <p className="text-[10px] text-navy/50 truncate">{freelance?.title}</p>
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-sm text-navy line-clamp-2 mb-4 group-hover:text-blue transition-colors leading-relaxed flex-1 font-medium">
          {service.title}
        </h3>

        {/* Notation */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(service.rating) ? 'fill-blue text-blue' : 'text-blue/15'}`} />
            ))}
          </div>
          <span className="text-xs font-bold text-navy">{service.rating.toFixed(1)}</span>
          <span className="text-xs text-navy/40">({service.reviewCount})</span>
        </div>

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-navy/50 bg-blue/5 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer avec infos */}
        <div className="mt-auto pt-4 border-t border-blue/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-navy/40" />
            <span className="text-xs text-navy/50">{service.deliveryDays}j</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-navy/40" />
            <span className="text-xs text-navy/50">{service.revisions || '∞'} {t('services.revisions')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
