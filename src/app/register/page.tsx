'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Briefcase, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'client' | 'freelance'>('client');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t('register.error'));
        return;
      }

      window.location.href = '/dashboard';
    } catch {
      setError(t('register.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-108px)] flex items-center justify-center bg-bg noise-bg relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,80,138,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,80,138,0.05),transparent_50%)]" />
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue/3 rounded-full blur-3xl animate-float-slow" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue to-navy flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl font-black text-white">T</span>
            </div>
            <div>
              <span className="text-2xl font-black text-navy tracking-tight">
                THÈSE<span className="text-gradient">PRO</span>
              </span>
              <span className="block text-[10px] text-navy/70 -mt-1 tracking-wider">{t('header.academicExperts')}</span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-navy mb-2">{t('register.joinCommunity')}</h1>
          <p className="text-navy/70">{t('register.createAccount')}</p>
        </div>

        <div className="glass rounded-3xl p-8">
          {error && (
            <div className="flex items-center gap-3 bg-navy/10 border border-navy/20 rounded-2xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-navy flex-shrink-0" />
              <p className="text-sm text-navy">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('client')}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                role === 'client' ? 'border-blue bg-blue/10 glow-sm' : 'glass hover:bg-blue/5'
              }`}
            >
              <User className={`w-6 h-6 ${role === 'client' ? 'text-blue' : 'text-navy/70'}`} />
              <span className={`text-sm font-bold ${role === 'client' ? 'text-blue' : 'text-navy/70'}`}>{t('register.client')}</span>
              <span className="text-[10px] text-navy/70">{t('register.findExpert')}</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('freelance')}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                role === 'freelance' ? 'border-blue bg-blue/10 glow-sm' : 'glass hover:bg-blue/5'
              }`}
            >
              <Briefcase className={`w-6 h-6 ${role === 'freelance' ? 'text-blue' : 'text-navy/70'}`} />
              <span className={`text-sm font-bold ${role === 'freelance' ? 'text-blue' : 'text-navy/70'}`}>{t('register.freelance')}</span>
              <span className="text-[10px] text-navy/70">{t('register.offerServices')}</span>
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">{t('register.firstName')}</label>
                <input
                  type="text"
                  placeholder="Jean"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full h-12 px-4 text-sm rounded-xl glass text-navy placeholder:text-navy/70 focus:border-blue/50 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">{t('register.lastName')}</label>
                <input
                  type="text"
                  placeholder="Dupont"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full h-12 px-4 text-sm rounded-xl glass text-navy placeholder:text-navy/70 focus:border-blue/50 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">{t('register.email')}</label>
              <input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 text-sm rounded-xl glass text-navy placeholder:text-navy/70 focus:border-blue/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">{t('register.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('register.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-12 px-4 pr-12 text-sm rounded-xl glass text-navy placeholder:text-navy/70 focus:border-blue/50 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/70 hover:text-blue transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2 cursor-pointer pt-2">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-blue/20 bg-blue/5 text-blue focus:ring-blue" />
              <span className="text-sm text-navy/70">
                {t('register.acceptTerms')}{' '}
                <Link href="#" className="text-blue font-semibold">{t('register.tos')}</Link>
                {' '}{t('register.and')}{' '}
                <Link href="#" className="text-blue font-semibold">{t('register.privacyPolicy')}</Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue to-navy hover:from-blue hover:to-navy text-white font-bold text-sm rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md/20 glow-sm flex items-center justify-center gap-2 group"
            >
              {loading ? t('register.creating') : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {role === 'freelance' ? t('register.becomeFreelance') : t('register.createMyAccount')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-navy/70">
          {t('register.alreadyAccount')}{' '}
          <Link href="/login" className="text-blue hover:text-blue/60 font-bold transition-colors">
            {t('register.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
