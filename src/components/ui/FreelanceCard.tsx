'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Freelance } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface FreelanceCardProps {
  freelance: Freelance;
  className?: string;
}

export function FreelanceCard({ freelance, className }: FreelanceCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      href={`/freelances/${freelance.slug}`}
      className={cn('group relative bg-white/80 backdrop-blur-sm border border-primary-100 rounded-2xl overflow-hidden hover:border-primary-400/30 transition-all duration-400 card-hover shine-effect', className)}
    >
      {/* Couverture avec gradient */}
      <div className="h-20 bg-gradient-to-r from-primary-200/50 via-primary-50 to-primary-100/30 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary-400/10 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary-400/5 blur-3xl" />
        
        {/* Avatar */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-white bg-primary-100 ring-4 ring-primary-400/20 group-hover:ring-primary-400/40 transition-all duration-400">
              {freelance.avatar ? (
                <Image src={freelance.avatar} alt={freelance.name} width={96} height={96} className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-2xl font-bold text-white">
                  {freelance.name[0]}
                </div>
              )}
            </div>
            {freelance.verified && (
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary-400 rounded-full border-2 border-white flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Corps de la carte */}
      <div className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        {/* Nom et titre */}
        <h3 className="text-base font-bold text-primary-800 mb-1 group-hover:text-primary-600 transition-colors">
          {freelance.name}
        </h3>
        <p className="text-xs text-neutral-500 mb-3 line-clamp-2 leading-relaxed max-w-[200px]">{freelance.title}</p>

        {/* Localisation et temps de réponse */}
        <div className="flex items-center gap-4 mb-4 text-[10px] text-neutral-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {freelance.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {freelance.responseTime}
          </span>
        </div>

        {/* Notation */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(freelance.rating) ? 'fill-primary-400 text-primary-400' : 'text-primary-100'}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-primary-800">{freelance.rating.toFixed(1)}</span>
          <span className="text-xs text-neutral-400">({freelance.reviewCount})</span>
        </div>

        {/* Compétences */}
        {freelance.skills && freelance.skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
            {freelance.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-[10px] text-neutral-500 bg-primary-50 px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
            {freelance.skills.length > 3 && (
              <span className="text-[10px] text-primary-400 font-medium">+{freelance.skills.length - 3}</span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="pt-5 border-t border-primary-100 w-full grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 mb-1.5">
              <TrendingUp className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-sm font-bold text-primary-800">{freelance.sales}+</p>
            <p className="text-[9px] text-neutral-400 uppercase tracking-wider">{t('freelanceCard.sales')}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 mb-1.5">
              <Star className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-sm font-bold text-primary-800">{freelance.rating}</p>
            <p className="text-[9px] text-neutral-400 uppercase tracking-wider">{t('freelanceCard.rating')}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-50 mb-1.5">
              <Clock className="w-4 h-4 text-primary-400" />
            </div>
            <p className="text-sm font-bold text-primary-800">{freelance.memberSince.split(' ')[1] || freelance.memberSince}</p>
            <p className="text-[9px] text-neutral-400 uppercase tracking-wider">{t('freelanceCard.member')}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
