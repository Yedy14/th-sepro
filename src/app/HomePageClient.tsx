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
    <div className="bg-[#edf6fd]">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[720px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(234,179,8,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(234,179,8,0.06),transparent_50%)]" />
        <div className="absolute top-32 left-20 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-primary-400/3 rounded-full blur-3xl animate-float-slow" />
        
        <div className="container-responsive relative z-10 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 mb-8">
                <div className="flex -space-x-2">
                  {freelances.slice(0, 3).map((f) => (
                    <div key={f.id} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                      {f.avatar ? (
                        <Image src={f.avatar} alt={f.name} width={32} height={32} className="w-full h-full object-cover" style={{ objectPosition: 'center' }} />
                      ) : (
                        <Image src={getAvatarUrl(f.name)} alt={f.name} width={32} height={32} className="w-full h-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-primary-400 font-bold">+10 000</span>
                  <span className="text-sm text-neutral-400">{t('home.verifiedExperts')}</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-800 leading-[1.05] mb-8 tracking-tight">
                {t('home.heroTitle1')}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-gradient">{t('home.heroTitle2')}</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary-400/20 -skew-x-6" />
                </span>
              </h1>

              <p className="text-lg text-neutral-400 mb-10 max-w-xl leading-relaxed">
                {t('home.heroDesc')}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
                <Link href="/services" className="group h-14 px-8 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-base rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-primary-400/30 glow-sm">
                  <Sparkles className="w-5 h-5" /> 
                  {t('home.findExpert')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/freelances" className="h-14 px-8 glass text-primary-800 font-bold text-base rounded-xl hover:bg-primary-50 transition-all flex items-center gap-3">
                  {t('home.discoverFreelances')}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500">
                <span className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  {t('home.freeStart')}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  {t('home.response2h')}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-400/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-primary-400" />
                  </div>
                  {t('home.securePayment')}
                </span>
              </div>
            </div>

            <div className="hidden lg:block relative animate-fade-in-right">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 aspect-[4/5] animate-float-slow">
                  <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Expert académique" fill className="object-cover object-top" sizes="(max-width: 1024px) 0px, 50vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {freelances.slice(2, 5).map((f) => (
                          <div key={f.id} className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden">
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
                            <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
                          ))}
                        </div>
                        <p className="text-xs text-primary-800/80">{t('home.drKouassi')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="border-y border-primary-100 glass-dark py-10">
        <div className="container-responsive">
          <p className="text-center text-xs text-neutral-600 uppercase tracking-[0.3em] mb-8">{t('home.studentsFrom')}</p>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            {[{ name: 'Sorbonne', icon: '🏛' }, { name: 'Sciences Po', icon: '📚' }, { name: 'HEC Paris', icon: '🎓' }, { name: 'CNRS', icon: '🔬' }, { name: 'ENS', icon: '📖' }, { name: 'Polytechnique', icon: '⚡' }].map(({ name, icon }) => (
              <div key={name} className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity duration-300">
                <span className="text-xl">{icon}</span>
                <span className="text-neutral-400 text-sm font-semibold tracking-wider">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#edf6fd] relative">
        <div className="container-responsive relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-700">{t('home.simpleAndFast')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary-800 mb-4">{t('home.howItWorks')}</h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-lg">{t('home.howDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MessageCircle, step: '01', title: t('home.step1Title'), desc: t('home.step1Desc'), color: 'from-blue-500/10 to-blue-600/5' },
              { icon: Users, step: '02', title: t('home.step2Title'), desc: t('home.step2Desc'), color: 'from-primary-400/10 to-primary-400/5' },
              { icon: Heart, step: '03', title: t('home.step3Title'), desc: t('home.step3Desc'), color: 'from-green-500/10 to-green-600/5' },
            ].map(({ icon: Icon, step, title, desc, color }, i) => (
              <div key={i} className={`relative group rounded-3xl p-8 overflow-hidden bg-gradient-to-br ${color} card-hover`}>
                <div className="absolute inset-0 glass rounded-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-6xl font-black text-neutral-800 group-hover:text-neutral-700 transition-colors">{step}</span>
                    <div className="w-14 h-14 rounded-2xl bg-primary-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-3">{title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-neutral-950 relative">
        <div className="container-responsive relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const icons = [Rocket, ThumbsUp, Users];
              const Icon = icons[i] || Rocket;
              const colors = ['from-blue-500/10 to-blue-600/5', 'from-green-500/10 to-green-600/5', 'from-primary-400/10 to-primary-400/5'];
              return (
                <div key={i} className={`relative group rounded-3xl p-8 overflow-hidden bg-gradient-to-br ${colors[i]} card-hover`}>
                  <div className="absolute inset-0 glass rounded-3xl" />
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-4xl font-black text-gradient mb-1">{stat.value}</p>
                      <p className="text-sm text-neutral-400">{stat.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="py-24 bg-[#edf6fd] relative">
        <div className="container-responsive relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
                <Zap className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-700">{t('home.mostRequested')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-primary-800 mb-3">{t('home.popularServices')}</h2>
              <p className="text-neutral-500 text-lg">{t('home.popularDesc')}</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-semibold group">
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

      {/* Top freelances */}
      <section className="py-24 bg-neutral-950 relative">
        <div className="container-responsive relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
                <Award className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-700">{t('home.topPerformers')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-primary-800 mb-3">{t('home.ourTalents')}</h2>
              <p className="text-neutral-500 text-lg">{t('home.talentsDesc')}</p>
            </div>
            <Link href="/freelances" className="hidden md:flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-semibold group">
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

      {/* Why choose us */}
      <section className="py-24 bg-[#edf6fd] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.05),transparent_60%)]" />
        <div className="container-responsive relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />
              <span className="text-sm text-primary-700">{t('home.whyChooseUs')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary-800 mb-4">{t('home.whatMakesUsDifferent')}</h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-lg">{t('home.whyDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, title: t('home.humansNotRobots'), desc: t('home.humansDesc'), color: 'from-blue-500/10 to-blue-600/5' },
              { icon: Lock, title: t('home.moneyProtected'), desc: t('home.moneyDesc'), color: 'from-green-500/10 to-green-600/5' },
              { icon: Star, title: t('home.rating'), desc: t('home.ratingDesc'), color: 'from-primary-400/10 to-primary-400/5' },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className={`relative group rounded-3xl p-8 overflow-hidden bg-gradient-to-br ${color} card-hover`}>
                <div className="absolute inset-0 glass rounded-3xl" />
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary-400/10 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-10 h-10 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-4">{title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-950 relative">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4">
              <MessageCircle className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-700">{t('home.testimonials')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary-800 mb-4">{t('home.theySucceeded')}</h2>
            <p className="text-neutral-500 max-w-lg mx-auto text-lg">{t('home.testimonialsDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <div key={testimonial.id} className="relative group rounded-3xl p-8 overflow-hidden glass card-hover">
                <div className="absolute top-6 right-8 text-6xl text-primary-400/10 font-serif leading-none">&ldquo;</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-primary-400 text-primary-400' : 'text-neutral-700'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-primary-700 leading-relaxed mb-8">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-4 pt-5 border-t border-primary-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-100 ring-2 ring-primary-400/20">
                      <Image src={testimonialPhotos[idx] || getAvatarUrl(testimonial.author)} alt={testimonial.author} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary-800">{testimonial.author}</p>
                      <p className="text-xs text-neutral-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-black to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.1),transparent_60%)]" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400/3 rounded-full blur-3xl animate-float-slow" />
        
        <div className="container-responsive relative z-10 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 mb-8">
            <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />
            <span className="text-sm text-primary-400 font-semibold">{t('home.join10k')}</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-primary-800 mb-8 max-w-3xl mx-auto leading-tight">
            {t('home.notAlone')} <span className="text-gradient">thèse</span>
          </h2>
          <p className="text-neutral-400 mb-12 max-w-2xl mx-auto text-xl leading-relaxed">
            {t('home.notAloneDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services" className="group h-16 px-12 bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-base rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-primary-400/30 glow-md">
              <Sparkles className="w-5 h-5" /> 
              {t('home.startNow')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="h-16 px-12 glass text-primary-800 font-bold text-base rounded-xl hover:bg-primary-50 transition-all flex items-center gap-3">
              {t('home.becomeFreelance')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
