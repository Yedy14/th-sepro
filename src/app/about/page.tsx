'use client';

import { Target, Heart, Shield, Users, Globe, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg noise-bg">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,80,138,0.08),transparent_50%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue/3 rounded-full blur-3xl animate-float-slow" />
        
        <div className="container-responsive text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue" />
            <span className="text-xs font-semibold text-navy">{t('about.badge')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-navy mb-6">
            {t('about.mission')} <span className="text-gradient">...</span>
          </h1>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            {t('about.missionDesc')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: t('about.ourMission'), desc: t('about.ourMissionDesc') },
              { icon: Heart, title: t('about.ourValues'), desc: t('about.ourValuesDesc') },
              { icon: Shield, title: t('about.ourCommitment'), desc: t('about.ourCommitmentDesc') },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="glass rounded-3xl p-8 text-center card-hover animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue/20 to-navy/20 mb-6">
                  <Icon className="w-8 h-8 text-blue" />
                </div>
                <h2 className="text-xl font-bold text-navy mb-3">{title}</h2>
                <p className="text-sm text-navy/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container-responsive">
          <div className="glass rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '10 000+', label: t('about.studentsHelped') },
                { value: '500+', label: t('about.verifiedFreelances') },
                { value: '4.8/5', label: t('about.averageRating') },
                { value: '98%', label: t('about.satisfaction') },
              ].map(({ value, label }, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <p className="text-4xl md:text-5xl font-black text-gradient mb-2">{value}</p>
                  <p className="text-sm text-navy/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-responsive text-center">
          <div className="glass rounded-3xl p-12 max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue to-navy mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-navy mb-4">{t('about.passionateTeam')}</h2>
            <p className="text-navy/70 leading-relaxed mb-6">
              {t('about.teamDesc')}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-navy/70">
              <Globe className="w-4 h-4 text-blue" />
              <span>{t('about.basedIn')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
