'use client';

import { useState } from 'react';
import { Mail, MessageSquare, AlertCircle, CheckCircle, Clock, MapPin, Send } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t('contact.sendError'));
      } else {
        setSuccess(t('contact.successMessage'));
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch {
      setError(t('contact.connectionError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark noise-bg">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.08),transparent_50%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl animate-float" />
        
        <div className="container-responsive text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 mb-6 mx-auto">
            <Mail className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            {t('contact.title').split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{t('contact.title').split(' ').pop()}</span>
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-responsive max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8 animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary-400" />
                {t('contact.sendMessage')}
              </h2>
              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-5">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-5">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-400">{success}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('contact.fullName')}</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder={t('contact.yourName')} className="w-full h-12 px-4 text-sm rounded-xl glass text-white placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('contact.email')}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="votre@email.com" className="w-full h-12 px-4 text-sm rounded-xl glass text-white placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('contact.subject')}</label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full h-12 px-4 text-sm rounded-xl glass text-white focus:border-primary-400/50 outline-none transition-all">
                    <option value="">{t('contact.chooseSubject')}</option>
                    <option value="question">{t('contact.generalQuestion')}</option>
                    <option value="support">{t('contact.techSupport')}</option>
                    <option value="billing">{t('contact.billing')}</option>
                    <option value="partnership">{t('contact.partnership')}</option>
                    <option value="other">{t('contact.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-2">{t('contact.message')}</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder={t('contact.messagePlaceholder')} className="w-full p-4 text-sm rounded-xl glass text-white placeholder:text-neutral-600 focus:border-primary-400/50 outline-none resize-none transition-all" />
                </div>
                <button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-black font-bold text-sm rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-primary-400/20 glow-sm flex items-center justify-center gap-2">
                  {loading ? t('contact.sending') : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('contact.send')}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-4 animate-fade-in">
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-400/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">Email</p>
                    <p className="text-sm text-neutral-400">contact@thesepro.fr</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{t('contact.responseTime')}</p>
                    <p className="text-sm text-neutral-400">{t('contact.responseTimeValue')}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{t('contact.hours')}</p>
                    <p className="text-sm text-neutral-400">{t('contact.hoursValue')}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-primary-400" />
                  <h3 className="text-sm font-bold text-white">{t('contact.quickHelp')}</h3>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t('contact.quickHelpDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
