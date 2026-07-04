'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Briefcase, MapPin, FileText, Tag } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function FreelanceSettingsPage() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.freelance) {
          setTitle(data.user.freelance.title || '');
          setSpeciality(data.user.freelance.speciality || '');
          setBio(data.user.freelance.bio || '');
          setLocation(data.user.freelance.location || '');
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const skills = skillsText.split(',').map((s) => s.trim()).filter(Boolean);
      const res = await fetch('/api/settings/freelance', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, speciality, bio, location, skills }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else setSuccess(t('freelanceSettings.updated'));
    } catch { setError(t('settings.error')); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#edf6fd] noise-bg">
      <div className="container-responsive py-10 max-w-2xl">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
            <Briefcase className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-semibold text-primary-700">{t('freelanceSettings.badge')}</span>
          </div>
          <h1 className="text-4xl font-black text-primary-800 mb-2">{t('freelanceSettings.title')}</h1>
          <p className="text-neutral-400">{t('freelanceSettings.subtitle')}</p>
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
          <div className="glass rounded-3xl p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-primary-800 mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-400" />
              {t('freelanceSettings.professionalInfo')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">{t('freelanceSettings.professionalTitle')}</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('freelanceSettings.professionalTitlePlaceholder')} className="w-full h-12 px-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">{t('freelanceSettings.speciality')}</label>
                <input type="text" value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="w-full h-12 px-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2">{t('freelanceSettings.bio')}</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder={t('freelanceSettings.bioPlaceholder')} className="w-full p-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none resize-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  {t('freelanceSettings.location')}
                </label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Paris, France" className="w-full h-12 px-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary-400" />
                  {t('freelanceSettings.skills')}
                </label>
                <input type="text" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} placeholder={t('freelanceSettings.skillsPlaceholder')} className="w-full h-12 px-4 text-sm rounded-xl glass text-primary-800 placeholder:text-neutral-600 focus:border-primary-400/50 outline-none transition-all" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-primary-400/20 glow-sm">
            {loading ? t('freelanceSettings.saving') : t('freelanceSettings.save')}
          </button>
        </form>
      </div>
    </div>
  );
}
