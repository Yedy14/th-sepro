'use client';

import Link from 'next/link';
import { User, LayoutDashboard, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface UserMenuProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    freelance?: { id: string; slug: string } | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const { t } = useTranslation();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    document.cookie = 'thesepro_token=; path=/; max-age=0';
    window.location.href = '/login';
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-200 hover:border-primary-300 transition-colors">
        <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{user.name[0].toUpperCase()}</span>
        </div>
        <span className="text-sm text-primary-800 hidden md:inline">{user.name}</span>
        <ChevronDown className="w-3 h-3 text-neutral-400" />
      </button>

      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-primary-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3 border-b border-primary-100">
          <p className="text-sm font-semibold text-primary-800 truncate">{user.name}</p>
          <p className="text-xs text-neutral-400 truncate">{user.email}</p>
        </div>
        <div className="p-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            {t('userMenu.dashboard')}
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            {t('userMenu.settings')}
          </Link>
          {user.role === 'FREELANCE' && user.freelance && (
            <Link
              href={`/freelances/${user.freelance.slug}`}
              className="flex items-center gap-3 px-3 py-2 text-sm text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              {t('userMenu.publicProfile')}
            </Link>
          )}
        </div>
        <div className="p-2 border-t border-primary-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t('userMenu.logout')}
          </button>
        </div>
      </div>
    </div>
  );
}
