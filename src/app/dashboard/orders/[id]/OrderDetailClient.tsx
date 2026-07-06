'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, CheckCircle, XCircle, ChevronRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface OrderData {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  optionType: string;
  createdAt: string | Date;
  deliveryDate: string | Date | null;
  notes: string | null;
  service: {
    title: string;
    slug: string;
    description: string;
    category: string;
    image?: string | null;
    options?: any[];
    tags?: string[];
  };
  freelance: {
    id: string;
    slug: string;
    name: string | null;
    title: string;
    avatar?: string | null;
  };
  client: {
    id: string;
    name: string | null;
    email?: string;
  };
  revisions?: { id: string; message: string; createdAt: string | Date }[];
  review: { rating: number; comment: string | null; createdAt?: string | Date } | null;
}

export function OrderDetailClient({ order, currentUserId }: { order: OrderData; currentUserId: string }) {
  const { t } = useTranslation();
  const [reviewRating, setReviewRating] = useState(5);

  const statusSteps = [
    { key: 'PENDING', label: t('orders.status.pending'), icon: Clock },
    { key: 'IN_PROGRESS', label: t('orders.status.inProgress'), icon: Clock },
    { key: 'DELIVERED', label: t('orders.status.delivered'), icon: CheckCircle },
    { key: 'COMPLETED', label: t('orders.status.completed'), icon: CheckCircle },
  ];

  const statusLabels: Record<string, string> = {
    PENDING: t('orders.status.pending'), IN_PROGRESS: t('orders.status.inProgress'), DELIVERED: t('orders.status.delivered'),
    COMPLETED: t('orders.status.completed'), CANCELLED: t('orders.status.cancelled'), DISPUTED: t('orders.status.disputed'),
  };
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isClient = order.client.id === currentUserId;
  const currentStepIndex = statusSteps.findIndex((s) => s.key === order.status);

  const handleSubmitReview = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/orders/${order.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: reviewRating, comment: reviewComment }),
      });
      if (res.ok) setReviewSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg noise-bg">
      <div className="container-responsive py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-navy/70 mb-8 animate-fade-in">
          <Link href="/dashboard/orders" className="hover:text-blue transition-colors">{t('orderDetail.orders')}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-semibold">{order.orderNumber}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service info */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <Link href={`/services/${order.service.slug}`} className="text-xl font-bold text-navy hover:text-blue transition-colors block mb-2">
                {order.service.title}
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue/5 border border-blue/20 text-xs text-navy/70">{order.service.category}</span>
                <span className="px-3 py-1 rounded-full bg-blue/10 border border-blue/20 text-xs text-blue font-semibold">{t('orderDetail.option')} {order.optionType}</span>
              </div>
              <p className="text-sm text-navy/70 leading-relaxed">{order.service.description}</p>
            </div>

            {/* Status timeline */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-navy mb-6">{t('orderDetail.progress')}</h2>
              <div className="flex items-center justify-between">
                {statusSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step.key} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isActive ? 'bg-gradient-to-br from-blue to-navy text-white glow-sm' : 'bg-blue/5 text-navy/70 border border-blue/20'
                        } ${isCurrent ? 'ring-2 ring-blue/30 ring-offset-2 ring-offset-dark' : ''}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs mt-2 font-semibold ${isActive ? 'text-navy' : 'text-navy/70'}`}>{step.label}</span>
                      </div>
                      {i < statusSteps.length - 1 && (
                        <div className={`w-12 sm:w-20 h-1 mx-1 rounded-full ${i < currentStepIndex ? 'bg-gradient-to-r from-blue to-navy' : 'bg-blue/5'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review */}
            {isClient && order.status === 'COMPLETED' && !order.review && !reviewSubmitted && (
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-navy mb-4">{t('orderDetail.leaveReview')}</h2>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setReviewRating(star)} className="hover:scale-110 transition-transform">
                      <Star className={`w-7 h-7 ${star <= reviewRating ? 'fill-blue text-blue' : 'text-navy'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={t('orderDetail.reviewPlaceholder')}
                  className="w-full h-28 p-4 text-sm rounded-xl glass text-navy placeholder:text-navy/70 focus:border-blue/50 outline-none resize-none mb-4"
                />
                <button
                  onClick={handleSubmitReview}
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue to-navy hover:from-blue hover:to-navy text-white font-bold text-sm rounded-xl transition-all disabled:opacity-50 shadow-md/20 glow-sm"
                >
                  {submitting ? t('orderDetail.submitting') : t('orderDetail.publishReview')}
                </button>
              </div>
            )}

            {order.review && (
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-navy mb-4">{t('orderDetail.reviewGiven')}</h2>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-6 h-6 ${star <= order.review!.rating ? 'fill-blue text-blue' : 'text-navy'}`} />
                  ))}
                </div>
                {order.review.comment && <p className="text-sm text-navy/70 leading-relaxed">{order.review.comment}</p>}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-sm font-bold text-navy mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-blue" />
                {t('orderDetail.summary')}
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-navy/70">{t('orderDetail.status')}</span>
                  <span className="text-navy font-bold">{statusLabels[order.status]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy/70">{t('orderDetail.amount')}</span>
                  <span className="text-blue font-black text-lg">{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy/70">{t('orderDetail.orderedOn')}</span>
                  <span className="text-navy">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>
                {order.deliveryDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-navy/70">{t('orderDetail.deliveryDate')}</span>
                    <span className="text-navy">{new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-sm font-bold text-navy mb-3">{t('orderDetail.freelance')}</h3>
              <Link href={`/freelances/${order.freelance.slug}`} className="text-sm text-blue hover:text-blue/60 font-bold transition-colors">
                {order.freelance.name}
              </Link>
              <p className="text-xs text-navy/70 mt-1">{order.freelance.title}</p>
            </div>

            <Link
              href="/messages"
              className="block w-full text-center py-3 glass rounded-xl text-navy font-semibold text-sm hover:bg-blue/5 transition-all group"
            >
              <MessageCircle className="w-4 h-4 inline mr-2 group-hover:text-blue transition-colors" />
              {t('orderDetail.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
