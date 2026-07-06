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
      className={cn('group relative bg-white rounded-2xl overflow-hidden border border-blue/8 shadow-sm hover:shadow-lg hover:border-blue/15 transition-all duration-400', className)}
    >
      {/* Couverture avec gradient */}
      <div className="h-20 bg-gradient-to-r from-blue/8 via-bg to-blue/5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blue/10 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-blue/5 blur-3xl" />
        
        {/* Avatar */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-white bg-bg ring-4 ring-blue/8 group-hover:ring-blue/15 transition-all duration-400 shadow">
              {freelance.avatar ? (
                <Image src={freelance.avatar} alt={freelance.name} width={96} height={96} className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue to-navy flex items-center justify-center text-2xl font-bold text-white">
                  {freelance.name[0]}
                </div>
              )}
            </div>
            {freelance.verified && (
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Corps de la carte */}
      <div className="pt-14 pb-6 px-6 flex flex-col items-center text-center">
        {/* Nom et titre */}
        <h3 className="text-base font-bold text-navy mb-1 group-hover:text-blue transition-colors">
          {freelance.name}
        </h3>
        <p className="text-xs text-navy/60 mb-3 line-clamp-2 leading-relaxed max-w-[200px]">{freelance.title}</p>

        {/* Localisation et temps de réponse */}
        <div className="flex items-center gap-4 mb-4 text-[10px] text-navy/50">
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
              <Star key={i} className={`w-4 h-4 ${i < Math.round(freelance.rating) ? 'fill-blue text-blue' : 'text-blue/15'}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-navy">{freelance.rating.toFixed(1)}</span>
          <span className="text-xs text-navy/40">({freelance.reviewCount})</span>
        </div>

        {/* Compétences */}
        {freelance.skills && freelance.skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
            {freelance.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="text-[10px] text-navy/50 bg-blue/5 px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
            {freelance.skills.length > 3 && (
              <span className="text-[10px] text-blue font-medium">+{freelance.skills.length - 3}</span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="pt-5 border-t border-blue/5 w-full grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg mb-1.5">
              <TrendingUp className="w-4 h-4 text-blue" />
            </div>
            <p className="text-sm font-bold text-navy">{freelance.sales}+</p>
            <p className="text-[9px] text-navy/40 uppercase tracking-wider">{t('freelanceCard.sales')}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg mb-1.5">
              <Star className="w-4 h-4 text-blue" />
            </div>
            <p className="text-sm font-bold text-navy">{freelance.rating}</p>
            <p className="text-[9px] text-navy/40 uppercase tracking-wider">{t('freelanceCard.rating')}</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg mb-1.5">
              <Clock className="w-4 h-4 text-blue" />
            </div>
            <p className="text-sm font-bold text-navy">{freelance.memberSince.split(' ')[1] || freelance.memberSince}</p>
            <p className="text-[9px] text-navy/40 uppercase tracking-wider">{t('freelanceCard.member')}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
