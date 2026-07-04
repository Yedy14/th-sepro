'use client';

import Link from 'next/link';
import { ShoppingBag, DollarSign, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { formatPrice } from '@/lib/utils';

interface DashboardData {
  activeOrders: number;
  totalSpent: number;
  reviewsGiven: number;
  favoritesCount: number;
  recentOrders: any[];
}

interface DashboardPageClientProps {
  user: { name: string | null; email: string };
  dashboardData: DashboardData;
}

export default function DashboardPageClient({ user, dashboardData }: DashboardPageClientProps) {
  const { t } = useTranslation();

  const stats = [
    {
      label: t('dashboard.activeOrders'),
      value: dashboardData.activeOrders,
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
    },
    {
      label: t('dashboard.totalSpent'),
      value: formatPrice(dashboardData.totalSpent),
      icon: DollarSign,
      color: 'from-primary-400 to-primary-600',
      bgColor: 'bg-primary-400/10',
      textColor: 'text-primary-400',
    },
    {
      label: t('dashboard.reviewsGiven'),
      value: dashboardData.reviewsGiven,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400',
    },
    {
      label: t('dashboard.favorites'),
      value: dashboardData.favoritesCount,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
    },
  ];

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      COMPLETED: t('orders.status.completed'),
      IN_PROGRESS: t('orders.status.inProgress'),
      PENDING: t('orders.status.pending'),
    };
    return map[status] || status;
  };

  return (
    <div className="min-h-screen bg-dark noise-bg">
      <div className="container-responsive py-10">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-300">{t('dashboard.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            {t('dashboard.hello')} <span className="text-gradient">{user.name?.split(' ')[0] || user.email}</span>
          </h1>
          <p className="text-lg text-neutral-400">{t('dashboard.welcome')}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="glass rounded-2xl p-6 card-hover animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mb-1 relative z-10">{stat.label}</p>
                <p className={`text-3xl font-black ${stat.textColor} relative z-10`}>{stat.value}</p>
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl absolute -top-4 -right-4`} />
              </div>
            );
          })}
        </div>

        {/* Recent orders */}
        <div className="glass rounded-3xl p-8 mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{t('dashboard.recentOrders')}</h2>
              <p className="text-sm text-neutral-400">{t('dashboard.recentActivity')}</p>
            </div>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl hover:bg-white/10 transition-all group"
            >
              <span className="text-sm font-semibold text-white">{t('dashboard.seeAll')}</span>
              <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {dashboardData.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.recentOrders.map((order: any) => (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary-400/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">{order.serviceTitle}</p>
                      <p className="text-xs text-neutral-500">{order.orderNumber} • {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                      order.status === 'COMPLETED' ? 'text-green-400 bg-green-400/10' :
                      order.status === 'IN_PROGRESS' ? 'text-blue-400 bg-blue-400/10' :
                      order.status === 'PENDING' ? 'text-yellow-400 bg-yellow-400/10' :
                      'text-neutral-400 bg-neutral-800'
                    }`}>
                      {statusLabel(order.status)}
                    </span>
                    <span className="text-sm font-black text-primary-400">{formatPrice(order.totalAmount)}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-primary-400/50" />
              </div>
              <p className="text-neutral-400 mb-2">{t('dashboard.noOrders')}</p>
              <Link href="/services" className="text-primary-400 hover:text-primary-300 font-semibold text-sm transition-colors">
                {t('dashboard.discoverServices')}
              </Link>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in">
          <Link href="/services" className="glass rounded-2xl p-6 card-hover group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{t('dashboard.exploreServices')}</h3>
            <p className="text-sm text-neutral-400">{t('dashboard.exploreDesc')}</p>
          </Link>
          <Link href="/freelances" className="glass rounded-2xl p-6 card-hover group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{t('dashboard.topFreelances')}</h3>
            <p className="text-sm text-neutral-400">{t('dashboard.topFreelancesDesc')}</p>
          </Link>
          <Link href="/messages" className="glass rounded-2xl p-6 card-hover group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{t('dashboard.messages')}</h3>
            <p className="text-sm text-neutral-400">{t('dashboard.messagesDesc')}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
