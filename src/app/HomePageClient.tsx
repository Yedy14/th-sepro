'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShieldCheck, Lock, Rocket, ThumbsUp, Users, ArrowRight, Sparkles, Zap, MessageCircle, Clock, CheckCircle2, Heart, Award } from 'lucide-react';
import { Service, Freelance, Category, Testimonial, Stat } from '@/types';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { FreelanceCard } from '@/components/ui/FreelanceCard';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { getAvatarUrl } from '@/lib/utils';

interface HomePageClientProps {
  services: Service[];
  freelances: Freelance[];
  categories: Category[];
  testimonials: Testimonial[];
  stats: Stat[];
  popularServices: Service[];
  topFreelances: Freelance[];
}

const testimonialPhotos = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
];

export default function HomePageClient({ services, freelances, categories, testimonials, stats, popularServices, topFreelances }: HomePageClientProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-bg">
      {/* HERO - White background for maximum readability */}
      <section className="py-24 bg-white relative">
        <div className="container-responsive relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-bg rounded-full px-4 py-2 mb-6">
                <div className="flex -space-x-2">
                  {freelances.slice(0, 3).map((f) => (
                    <div key={f.id} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                      {f.avatar ? (
                        <Image src={f.avatar} alt={f.name} width={28} height={28} className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
                      ) : (
                        <Image src={getAvatarUrl(f.name)} alt={f.name} width={28} height={28} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-navy font-semibold">+10 000 {t('home.verifiedExperts')}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-navy leading-[1.05] mb-8 tracking-tight">
                {t('home.heroTitle1')}{' '}
                <span className="text-gradient">{t('home.heroTitle2')}</span>
              </h1>

              <p className="text-lg text-navy/70 mb-10 max-w-xl leading-relaxed">
                {t('home.heroDesc')}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                <Link href="/services" className="group h-14 px-8 bg-gradient-to-r from-blue to-navy text-white hover:shadow-lg font-bold text-base rounded-xl transition-all flex items-center gap-3 shadow-md">
                  <Sparkles className="w-5 h-5" />
                  {t('home.findExpert')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/freelances" className="h-14 px-8 bg-bg text-navy font-bold text-base rounded-xl hover:shadow-md transition-all flex items-center gap-3 border border-blue/10">
                  {t('home.discoverFreelances')}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-navy/70">
                <span className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-blue" />
                  </div>
                  {t('home.freeStart')}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue" />
                  </div>
                  {t('home.response2h')}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-blue" />
                  </div>
                  {t('home.securePayment')}
                </span>
              </div>
            </div>

            <div className="hidden lg:block relative animate-fade-in-right">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/5] animate-float-slow">
                  <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Expert académique" fill className="object-cover object-top" sizes="(max-width: 1024px) 0px, 50vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {freelances.slice(2, 5).map((f) => (
                          <div key={f.id} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                            {f.avatar ? (
                              <Image src={f.avatar} alt={f.name} width={40} height={40} className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
                            ) : (
                              <Image src={getAvatarUrl(f.name)} alt={f.name} width={40} height={40} className="w-full h-full object-cover" />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-blue text-blue" />
                          ))}
                        </div>
                        <p className="text-xs text-navy/60">{t('home.drKouassi')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities - bg-bg background */}
      <section className="bg-bg border-y border-blue/8 py-10">
        <div className="container-responsive">
          <p className="text-center text-xs text-navy/40 uppercase tracking-[0.3em] mb-8 font-medium">{t('home.studentsFrom')}</p>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            {[{ name: 'Sorbonne', icon: '🏛' }, { name: 'Sciences Po', icon: '📚' }, { name: 'HEC Paris', icon: '🎓' }, { name: 'CNRS', icon: '🔬' }, { name: 'ENS', icon: '📖' }, { name: 'Polytechnique', icon: '⚡' }].map(({ name, icon }) => (
              <div key={name} className="flex items-center gap-2 opacity-50 hover:opacity-80 transition-opacity duration-300">
                <span className="text-xl">{icon}</span>
                <span className="text-navy/60 text-sm font-semibold tracking-wider">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - White background */}
      <section className="py-24 bg-white relative">
        <div className="container-responsive relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-bg rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue" />
              <span className="text-sm text-navy font-semibold">{t('home.simpleAndFast')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">{t('home.howItWorks')}</h2>
            <p className="text-navy/60 max-w-lg mx-auto text-lg">{t('home.howDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MessageCircle, step: '01', title: t('home.step1Title'), desc: t('home.step1Desc') },
              { icon: Users, step: '02', title: t('home.step2Title'), desc: t('home.step2Desc') },
              { icon: Heart, step: '03', title: t('home.step3Title'), desc: t('home.step3Desc') },
            ].map(({ icon: Icon, step, title, desc }, i) => (
              <div key={i} className="relative group bg-bg rounded-3xl p-8 hover:shadow-lg transition-all duration-400 overflow-hidden border border-blue/8">
                <div className="absolute top-4 right-4 text-7xl font-black text-blue/10 group-hover:text-blue/20 transition-colors leading-none">{step}</div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue to-navy flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
                  <p className="text-sm text-navy/70 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - bg-bg background */}
      <section className="py-20 bg-bg relative">
        <div className="container-responsive relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
              <Rocket className="w-4 h-4 text-blue" />
              <span className="text-sm text-navy font-semibold">{t('home.verifiedExperts')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">{t('home.heroTitle2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, i) => {
              const icons = [Rocket, ThumbsUp, Users];
              const Icon = icons[i] || Rocket;
              return (
                <div key={i} className="group bg-white rounded-3xl p-8 shadow hover:shadow-lg transition-all duration-400">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue to-navy flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-4xl font-black text-navy mb-1">{stat.value}</p>
                      <p className="text-sm text-navy/60">{stat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular services - White background */}
      <section className="py-24 bg-white relative">
        <div className="container-responsive relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-bg rounded-full px-4 py-2 mb-4">
                <Zap className="w-4 h-4 text-blue" />
                <span className="text-sm text-navy font-semibold">{t('home.mostRequested')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-navy mb-3">{t('home.popularServices')}</h2>
              <p className="text-navy/60 text-lg">{t('home.popularDesc')}</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-sm text-blue hover:text-navy font-semibold group">
              {t('home.seeAll')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((s, i) => {
              const freelance = freelances.find((f) => f.id === s.freelancerId);
              return (
                <div key={s.id} className={`animate-fade-in stagger-${i + 1}`}>
                  <ServiceCard service={s} freelance={freelance} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top freelances - bg-bg background */}
      <section className="py-24 bg-bg relative">
        <div className="container-responsive relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
                <Award className="w-4 h-4 text-blue" />
                <span className="text-sm text-navy font-semibold">{t('home.topPerformers')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-navy mb-3">{t('home.ourTalents')}</h2>
              <p className="text-navy/60 text-lg">{t('home.talentsDesc')}</p>
            </div>
            <Link href="/freelances" className="hidden md:flex items-center gap-2 text-sm text-blue hover:text-navy font-semibold group">
              {t('home.seeAll')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFreelances.map((f, i) => (
              <div key={f.id} className={`animate-fade-in stagger-${i + 1}`}>
                <FreelanceCard freelance={f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us - White background */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container-responsive relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-bg rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 text-blue fill-blue" />
              <span className="text-sm text-navy font-semibold">{t('home.whyChooseUs')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">{t('home.whatMakesUsDifferent')}</h2>
            <p className="text-navy/60 max-w-lg mx-auto text-lg">{t('home.whyDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, title: t('home.humansNotRobots'), desc: t('home.humansDesc') },
              { icon: Lock, title: t('home.moneyProtected'), desc: t('home.moneyDesc') },
              { icon: Star, title: t('home.rating'), desc: t('home.ratingDesc') },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="group bg-bg rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-400 border border-blue/8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue to-navy mb-6 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{title}</h3>
                <p className="text-sm text-navy/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - bg-bg background */}
      <section className="py-24 bg-bg relative overflow-hidden">
        <div className="container-responsive relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
              <MessageCircle className="w-4 h-4 text-blue" />
              <span className="text-sm text-navy font-semibold">{t('home.testimonials')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">{t('home.theySucceeded')}</h2>
            <p className="text-navy/60 max-w-lg mx-auto text-lg">{t('home.testimonialsDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <div key={testimonial.id} className="group bg-white rounded-3xl p-8 shadow hover:shadow-lg transition-all duration-400">
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-blue text-blue' : 'text-blue/15'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-navy/70 leading-relaxed mb-8">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-4 pt-5 border-t border-blue/8">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-blue/10 ring-2 ring-blue/15">
                      <Image src={testimonialPhotos[idx] || getAvatarUrl(testimonial.author)} alt={testimonial.author} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">{testimonial.author}</p>
                      <p className="text-xs text-navy/50">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - White background with gradient card */}
      <section className="py-24 bg-white relative">
        <div className="container-responsive relative z-10 text-center">
          <div className="bg-gradient-to-br from-blue to-navy rounded-3xl p-12 shadow-xl max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2.5 mb-8">
              <Heart className="w-4 h-4 text-white fill-white" />
              <span className="text-sm text-white font-semibold">{t('home.join10k')}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
              {t('home.notAlone')} <span className="underline decoration-white/30 decoration-4 underline-offset-4">thèse</span>
            </h2>
            <p className="text-white/70 mb-12 max-w-2xl mx-auto text-xl leading-relaxed">
              {t('home.notAloneDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/services" className="group h-16 px-12 bg-white text-navy hover:shadow-lg font-bold text-base rounded-xl transition-all flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                {t('home.startNow')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/register" className="h-16 px-12 bg-white/10 text-white font-bold text-base rounded-xl hover:bg-white/20 transition-all flex items-center gap-3 border border-white/20">
                {t('home.becomeFreelance')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}