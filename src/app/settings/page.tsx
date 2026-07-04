'use client';

import { useState, useEffect } from 'react';
import { Settings, AlertCircle, CheckCircle, User, Mail, Lock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name || '');
          setEmail(data.user.email || '');
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else setSuccess(t('settings.updated'));
    } catch { setError(t('settings.error')); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-dark noise-bg">
      <div className="container-responsive py-10 max-w-2xl">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <Settings className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-neutral-300">{t('settings.badge')}</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">{t('settings.title')}</h1>
          <p className="text-neutral-400">{t('settings.subtitle')}</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal info */}
          <div className="glass rounded-3xl p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-400" />
              {t('settings.personalInfo')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('settings.fullName')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 text-sm rounded-xl glass text-white placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('settings.email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 text-sm rounded-xl glass text-white placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="glass rounded-3xl p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary-400" />
              {t('settings.changePassword')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('settings.currentPassword')}</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 text-sm rounded-xl glass text-white placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('settings.newPassword')}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  className="w-full h-12 px-4 text-sm rounded-xl glass text-white placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-black font-bold text-sm rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-primary-400/20 glow-sm"
          >
            {loading ? t('settings.saving') : t('settings.saveChanges')}
          </button>
        </form>
      </div>
    </div>
  );
}
