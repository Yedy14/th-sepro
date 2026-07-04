'use client';

import Link from 'next/link';
import { DollarSign, TrendingUp, Clock, ArrowRight, Briefcase } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { formatPrice } from '@/lib/utils';

interface EarningsData {
  totalEarnings: number;
  orderCount: number;
  pendingWithdrawals: number;
}

interface EarningsPageClientProps {
  hasFreelance: boolean;
  earnings: EarningsData | null;
}

export default function EarningsPageClient({ hasFreelance, earnings }: EarningsPageClientProps) {
  const { t } = useTranslation();

  if (!hasFreelance) {
    return (
      <div className="min-h-screen bg-[#edf6fd] noise-bg">
        <div className="container-responsive py-10">
          <div className="glass rounded-3xl p-16 text-center">
            <div className="w-24 h-24 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-12 h-12 text-primary-400/50" />
            </div>
            <p className="text-xl text-neutral-400 mb-4">{t('earnings.needFreelanceProfile')}</p>
            <a href="/settings/freelance" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary-400/20 glow-sm group">
              {t('earnings.createProfile')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!earnings) return null;

  const stats = [
    {
      labelKey: 'earnings.totalEarned',
      value: formatPrice(earnings.totalEarnings),
      icon: DollarSign,
      color: 'text-primary-400',
      bgColor: 'bg-primary-400/10',
      gradient: 'from-primary-400 to-primary-600',
    },
    {
      labelKey: 'earnings.orders',
      value: earnings.orderCount,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      gradient: 'from-green-500 to-green-600',
    },
    {
      labelKey: 'earnings.pendingWithdrawals',
      value: earnings.pendingWithdrawals,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      gradient: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="min-h-screen bg-[#edf6fd] noise-bg">
      <div className="container-responsive py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <DollarSign className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-primary-700">{t('earnings.badge')}</span>
          </div>
          <h1 className="text-4xl font-black text-primary-800 mb-2">{t('earnings.title')}</h1>
          <p className="text-neutral-400">{t('earnings.subtitle')}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.labelKey}
                className="glass rounded-2xl p-6 card-hover animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mb-1 relative z-10">{t(stat.labelKey as any)}</p>
                <p className={`text-3xl font-black ${stat.color} relative z-10`}>{stat.value}</p>
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl absolute -top-4 -right-4`} />
              </div>
            );
          })}
        </div>

        {/* Withdrawal card */}
        <div className="glass rounded-3xl p-8 animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary-800 mb-2">{t('earnings.requestWithdrawal')}</h2>
              <p className="text-neutral-400 mb-6">
                {t('earnings.withdrawalDesc')} <span className="text-primary-400 font-bold">{t('earnings.minAmount')}</span>.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary-400/20 glow-sm flex items-center gap-2 group">
                {t('earnings.requestWithdrawal')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
