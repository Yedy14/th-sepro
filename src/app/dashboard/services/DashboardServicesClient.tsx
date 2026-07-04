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
      <div className="min-h-screen bg-[#edf6fd] noise-bg">
        <div className="container-responsive py-10">
          <div className="glass rounded-3xl p-16 text-center">
            <div className="w-24 h-24 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-primary-400/50" />
            </div>
            <p className="text-xl text-neutral-400 mb-4">{t('dashboardServices.needProfile')}</p>
            <a href="/settings/freelance" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary-400/20 glow-sm group">
              {t('earnings.createProfile')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf6fd] noise-bg">
      <div className="container-responsive py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <Briefcase className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-primary-700">{t('dashboardServices.badge')}</span>
          </div>
          <h1 className="text-4xl font-black text-primary-800 mb-2">{t('dashboardServices.title')}</h1>
          <p className="text-neutral-400">{t('dashboardServices.subtitle')}</p>
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
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-primary-800 mb-1">{service.title}</p>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span className="px-3 py-1 rounded-full bg-primary-50/50 border border-primary-200">{service.category}</span>
                        <span>•</span>
                        <span className="text-primary-400 font-bold">{formatPrice(service.price)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-primary-400 text-primary-400" />
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
            <div className="w-24 h-24 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-primary-400/50" />
            </div>
            <p className="text-xl text-neutral-400 mb-4">{t('dashboardServices.noService')}</p>
            <a href="/services/create" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary-400/20 glow-sm group">
              {t('dashboardServices.createFirst')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
