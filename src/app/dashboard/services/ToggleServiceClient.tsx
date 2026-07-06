'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export function ToggleServiceClient({ serviceId, active }: { serviceId: string; active: boolean }) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(active);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/services/${serviceId}/toggle`, { method: 'POST' });
      if (res.ok) setIsActive(!isActive);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
        isActive
          ? 'bg-blue/10 text-blue hover:bg-blue/20'
          : 'bg-blue/5 text-navy/70 hover:bg-blue/10'
      }`}
    >
      {isActive ? t('dashboardServices.active') : t('dashboardServices.inactive')}
    </button>
  );
}
