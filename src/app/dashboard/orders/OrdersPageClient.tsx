'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { formatPrice } from '@/lib/utils';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  serviceTitle: string;
  createdAt: string | Date;
}

interface OrdersPageClientProps {
  orders: Order[];
}

export default function OrdersPageClient({ orders }: OrdersPageClientProps) {
  const { t } = useTranslation();

  const statusConfig: Record<string, { labelKey: string; icon: any; color: string; bg: string }> = {
    PENDING: { labelKey: 'orders.status.pending', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    IN_PROGRESS: { labelKey: 'orders.status.inProgress', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    DELIVERED: { labelKey: 'orders.status.delivered', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
    COMPLETED: { labelKey: 'orders.status.completed', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    CANCELLED: { labelKey: 'orders.status.cancelled', icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
    DISPUTED: { labelKey: 'orders.status.disputed', icon: XCircle, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  };

  return (
    <div className="min-h-screen bg-[#edf6fd] noise-bg">
      <div className="container-responsive py-10">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <ShoppingBag className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-primary-700">{t('orders.badge')}</span>
          </div>
          <h1 className="text-4xl font-black text-primary-800 mb-2">{t('orders.history')}</h1>
          <p className="text-neutral-400">{t('orders.historyDesc')}</p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-3 animate-fade-in">
            {orders.map((order, i) => {
              const config = statusConfig[order.status] || { labelKey: '', icon: Clock, color: 'text-neutral-400', bg: 'bg-primary-50' };
              const Icon = config.icon;
              return (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="glass rounded-2xl p-6 card-hover group block animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShoppingBag className="w-6 h-6 text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-primary-800 group-hover:text-primary-400 transition-colors mb-1">{order.serviceTitle}</p>
                        <div className="flex items-center gap-3 text-xs text-neutral-500">
                          <span className="font-mono">{order.orderNumber}</span>
                          <span>•</span>
                          <span>{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg}`}>
                        <Icon className={`w-4 h-4 ${config.color}`} />
                        <span className={`text-xs font-bold ${config.color}`}>{config.labelKey ? t(config.labelKey as any) : order.status}</span>
                      </div>
                      <span className="text-lg font-black text-primary-400 min-w-[100px] text-right">{formatPrice(order.totalAmount)}</span>
                      <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="glass rounded-3xl p-16 text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-primary-400/50" />
            </div>
            <p className="text-xl text-neutral-400 mb-4">{t('orders.noOrders')}</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary-400/20 glow-sm group"
            >
              <ShoppingBag className="w-4 h-4" />
              {t('orders.discoverServices')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
