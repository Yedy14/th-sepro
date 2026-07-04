'use client';

import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, MessageCircle, Settings, Briefcase, DollarSign, LogOut } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const handleLogout = () => {
    document.cookie = 'thesepro_token=; path=/; max-age=0';
    window.location.href = '/login';
  };

  const navItems = [
    { href: '/dashboard', label: t('dashboard.nav.dashboard'), icon: LayoutDashboard },
    { href: '/dashboard/orders', label: t('dashboard.nav.orders'), icon: ShoppingBag },
    { href: '/dashboard/services', label: t('dashboard.nav.services'), icon: Briefcase },
    { href: '/dashboard/earnings', label: t('dashboard.nav.earnings'), icon: DollarSign },
    { href: '/messages', label: t('dashboard.nav.messages'), icon: MessageCircle },
    { href: '/settings', label: t('dashboard.nav.settings'), icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#edf6fd]">
      <div className="container-responsive py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-[110px] space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-400 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-primary-50 rounded-lg transition-colors w-full">
                <LogOut className="w-4 h-4" />
                {t('dashboard.nav.logout')}
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
