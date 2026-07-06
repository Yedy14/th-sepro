'use client';

import Link from 'next/link';
import { ToggleServiceClient } from './ToggleServiceClient';
import { Briefcase, ArrowRight, Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { formatPrice } from '@/lib/utils';

interface Service {
  id: string;
  title: string;
  category: string;
  price: number;
  reviewCount: number;
  active: boolean;
}

interface DashboardServicesClientProps {
  hasFreelance: boolean;
  services: Service[];
}

export default function DashboardServicesClient({ hasFreelance, services }: DashboardServicesClientProps) {
  const { t } = useTranslation();

  if (!hasFreelance) {
    return (
      <div className="min-h-screen bg-bg noise-bg">
        <div className="container-responsive py-10">
          <div className="glass rounded-3xl p-16 text-center">
            <div className="w-24 h-24 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-blue/50" />
            </div>
            <p className="text-xl text-navy/70 mb-4">{t('dashboardServices.needProfile')}</p>
            <a href="/settings/freelance" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue to-navy hover:from-blue hover:to-navy text-white font-bold text-sm rounded-xl transition-all shadow-md/20 glow-sm group">
              {t('earnings.createProfile')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg noise-bg">
      <div className="container-responsive py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <Briefcase className="w-4 h-4 text-blue" />
            <span className="text-xs font-semibold text-navy">{t('dashboardServices.badge')}</span>
          </div>
          <h1 className="text-4xl font-black text-navy mb-2">{t('dashboardServices.title')}</h1>
          <p className="text-navy/70">{t('dashboardServices.subtitle')}</p>
        </div>

        {/* Services list */}
        {services.length > 0 ? (
          <div className="space-y-3 animate-fade-in">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="glass rounded-2xl p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue/20 to-navy/20 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-navy mb-1">{service.title}</p>
                      <div className="flex items-center gap-3 text-xs text-navy/70">
                        <span className="px-3 py-1 rounded-full bg-blue/5 border border-blue/20">{service.category}</span>
                        <span>•</span>
                        <span className="text-blue font-bold">{formatPrice(service.price)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-blue text-blue" />
                          {service.reviewCount} {t('dashboardServices.reviews')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ToggleServiceClient serviceId={service.id} active={service.active} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-16 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-blue/50" />
            </div>
            <p className="text-xl text-navy/70 mb-4">{t('dashboardServices.noService')}</p>
            <a href="/services/create" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue to-navy hover:from-blue hover:to-navy text-white font-bold text-sm rounded-xl transition-all shadow-md/20 glow-sm group">
              {t('dashboardServices.createFirst')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
