'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('login.error'));
        return;
      }

      if (data.token) {
        document.cookie = `thesepro_token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=lax`;
      }

      window.location.href = '/dashboard';
    } catch {
      setError(t('login.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-108px)] flex items-center justify-center bg-[#edf6fd] noise-bg relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(234,179,8,0.05),transparent_50%)]" />
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-400/3 rounded-full blur-3xl animate-float-slow" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-white">T</span>
            </div>
            <div>
              <span className="text-2xl font-black text-primary-800 tracking-tight">
                THÈSE<span className="text-gradient">PRO</span>
              </span>
              <span className="block text-[10px] text-neutral-500 -mt-1 tracking-wider">{t('header.academicExperts')}</span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-primary-800 mb-2">{t('login.welcomeBack')}</h1>
          <p className="text-neutral-500">{t('login.accessSpace')}</p>
        </div>

        <div className="glass rounded-3xl p-8">
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-primary-700 mb-2">{t('login.email')}</label>
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary-700 mb-2">{t('login.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 pr-12 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-primary-400 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-neutral-600 bg-primary-50 text-primary-400 focus:ring-primary-500" />
                <span className="text-sm text-neutral-400">{t('login.remember')}</span>
              </label>
              <Link href="#" className="text-sm text-primary-400 hover:text-primary-300 font-semibold transition-colors">{t('login.forgotPassword')}</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-400/20 glow-sm flex items-center justify-center gap-2 group"
            >
              {loading ? t('login.submitting') : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t('login.submit')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-neutral-500">
          {t('login.noAccount')}{' '}
          <Link href="/register" className="text-primary-400 hover:text-primary-300 font-bold transition-colors">
            {t('login.createAccount')}
          </Link>
        </p>
      </div>
    </div>
  );
}
