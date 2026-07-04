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
      className={cn('group relative bg-white/80 backdrop-blur-sm border border-primary-100 rounded-2xl overflow-hidden hover:border-primary-400/30 transition-all duration-400 card-hover shine-effect', className)}
    >
      {/* Image du service */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-primary-50">
        {service.image && !imgError ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-400/10 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-primary-400">{service.category.split('-').map(w => w[0]?.toUpperCase()).join('')}</span>
              </div>
              <p className="text-xs text-neutral-400 capitalize">{service.category.replace(/-/g, ' ')}</p>
            </div>
          </div>
        )}
        
        {/* Overlay gradient léger */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-800/10 via-transparent to-transparent pointer-events-none" />
        
        {/* Badge Top service */}
        {service.sponsored && (
          <div className="absolute top-3 left-3 glass text-primary-600 text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> {t('services.topService')}
          </div>
        )}

        {/* Bouton bookmark */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-400/20"
        >
          <Bookmark className="w-4 h-4 text-primary-700" />
        </button>
      </div>

      {/* Corps de la carte */}
      <div className="p-5 flex flex-col flex-1">
        {/* Info freelance */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-100 flex-shrink-0 ring-2 ring-primary-400/20">
              {freelance?.avatar ? (
                <Image src={freelance.avatar} alt={freelance.name} width={32} height={32} className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
              ) : (
                <div className="w-full h-full bg-primary-400 flex items-center justify-center text-xs font-bold text-white">
                  {freelance?.name?.[0] || '?'}
                </div>
              )}
            </div>
            {freelance?.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary-400 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[6px] text-white">✓</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary-700 truncate">{freelance?.name}</p>
            <p className="text-[10px] text-neutral-400 truncate">{freelance?.title}</p>
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-sm text-primary-800 line-clamp-2 mb-4 group-hover:text-primary-600 transition-colors leading-relaxed flex-1">
          {service.title}
        </h3>

        {/* Notation */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(service.rating) ? 'fill-primary-400 text-primary-400' : 'text-primary-100'}`} />
            ))}
          </div>
          <span className="text-xs font-semibold text-primary-800">{service.rating.toFixed(1)}</span>
          <span className="text-xs text-neutral-400">({service.reviewCount})</span>
        </div>

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-neutral-500 bg-primary-50 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer avec infos */}
        <div className="mt-auto pt-4 border-t border-primary-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-400">{service.deliveryDays}j</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-400">{service.revisions || '∞'} {t('services.revisions')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
