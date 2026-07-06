'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield, MessageCircle, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface TierOption {
  key: string;
  label: string;
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
}

interface OrderSidebarProps {
  tiers: TierOption[];
  startingPrice: number;
  serviceSlug?: string;
}

export function OrderSidebar({ tiers, startingPrice, serviceSlug }: OrderSidebarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState(tiers[0]?.key || 'basic');
  const selected = tiers.find(tier => tier.key === selectedTier);
  const displayPrice = selected?.price || startingPrice;

  const handleOrder = async () => {
    try {
      const meRes = await fetch('/api/auth/me');
      if (!meRes.ok) {
        router.push('/login?callbackUrl=/services/' + serviceSlug);
        return;
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug,
          optionType: selectedTier.toUpperCase(),
          totalAmount: displayPrice,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push('/dashboard/orders/' + data.order.id);
      }
    } catch {
      router.push('/login');
    }
  };

  return (
    <div className="sticky top-[110px] glass rounded-3xl p-6 animate-fade-in">
      {/* Tier selection */}
      <div className="space-y-3 mb-6">
        {tiers.map((tier) => (
          <label
            key={tier.key}
            className={`block cursor-pointer rounded-2xl border-2 p-5 transition-all ${
              selectedTier === tier.key
                ? 'border-blue bg-blue/10 glow-sm'
                : 'glass hover:bg-blue/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="tier"
                value={tier.key}
                checked={selectedTier === tier.key}
                onChange={() => setSelectedTier(tier.key)}
                className="mt-1 accent-blue"
              />
              <div className="flex-1">
                <span className="text-sm font-bold text-navy">{tier.label}</span>
                <p className="text-xs text-navy/70 mt-1">{tier.description}</p>
                <p className="text-xs text-navy/70 mt-1">{tier.deliveryDays} {t('orderSidebar.deliveryDays')}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Order button */}
      <button
        onClick={handleOrder}
        className="w-full h-12 bg-gradient-to-r from-blue to-navy hover:from-blue hover:to-navy text-white font-bold text-sm rounded-xl transition-all shadow-md/20 glow-sm flex items-center justify-center gap-2 group mb-3"
      >
        <Sparkles className="w-4 h-4" />
        {t('orderSidebar.order')}
      </button>

      {/* Price */}
      <div className="text-center mb-3">
        <span className="text-2xl font-black text-gradient">{formatPrice(displayPrice)}</span>
      </div>

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-xs text-navy/70">{t('orderSidebar.payment')}</span>
        <Lock className="w-3 h-3 text-blue" />
        <span className="text-xs text-blue font-semibold">{t('orderSidebar.secure')}</span>
      </div>
      <p className="text-center text-[10px] text-navy/70 mb-6">{t('orderSidebar.tls')}</p>

      {/* Contact button */}
      <button className="w-full h-12 glass rounded-xl text-navy font-semibold text-sm hover:bg-blue/5 transition-all flex items-center justify-center gap-2 group">
        <MessageCircle className="w-4 h-4 group-hover:text-blue transition-colors" />
        {t('orderSidebar.contactSeller')}
      </button>
    </div>
  );
}
