'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Calendar, Shield, Star, ChevronRight, CheckCircle, Award } from 'lucide-react';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface FreelanceData {
  name: string;
  slug: string;
  title: string;
  avatar: string | null;
  verified: boolean;
  location: string;
  responseTime: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
  sales: number;
  bio: string | null;
  skills: string[];
}

interface ServiceData {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string | null;
  rating: number;
  reviewCount: number;
  deliveryDays: number;
  revisions: number;
  price: number;
  sponsored: boolean;
  tags: string[];
}

interface FreelanceProfileClientProps {
  freelance: FreelanceData;
  freelanceServices: ServiceData[];
}

export default function FreelanceProfileClient({ freelance, freelanceServices }: FreelanceProfileClientProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#edf6fd] noise-bg">
      {/* Breadcrumb */}
      <div className="border-b border-primary-100">
        <div className="container-responsive py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 animate-fade-in">
            <Link href="/" className="hover:text-primary-400 transition-colors">{t('common.home')}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/freelances" className="hover:text-primary-400 transition-colors">{t('header.bestFreelances')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-700">{freelance.name}</span>
          </nav>
        </div>
      </div>

      {/* Profile header */}
      <div className="border-b border-primary-100">
        <div className="container-responsive py-10">
          <div className="flex flex-col md:flex-row gap-8 items-start animate-fade-in">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-primary-700 flex-shrink-0 ring-4 ring-primary-400/20">
              <Image 
                src={freelance.avatar || '/placeholder-avatar.jpg'} 
                alt={freelance.name} 
                width={112} 
                height={112} 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
                priority
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-black text-primary-800">{freelance.name}</h1>
                {freelance.verified && (
                  <span className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {t('freelanceDetail.verified')}
                  </span>
                )}
              </div>
              <p className="text-lg text-neutral-400 mb-4">{freelance.title}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-neutral-500">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> {freelance.location}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary-400" /> {t('freelanceDetail.responseTime')} {freelance.responseTime}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary-400" /> {t('freelanceDetail.memberSince')} {freelance.memberSince}</span>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-primary-400 text-primary-400" />
                  <span className="text-primary-800 font-bold">{freelance.rating.toFixed(1)}</span>
                  <span className="text-neutral-600">({freelance.reviewCount} {t('freelanceDetail.reviews')})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {freelance.bio && (
              <div className="glass rounded-2xl p-8 animate-fade-in">
                <h2 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-400" />
                  {t('freelanceDetail.about')}
                </h2>
                <p className="text-neutral-400 leading-relaxed">{freelance.bio}</p>
              </div>
            )}

            {/* Skills */}
            {freelance.skills.length > 0 && (
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-primary-800 mb-4">{t('freelanceDetail.skills')}</h2>
                <div className="flex flex-wrap gap-2">
                  {freelance.skills.map((skill) => (
                    <span key={skill} className="text-xs text-primary-700 glass px-4 py-2 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-primary-800 mb-6">{t('freelanceDetail.services')}</h2>
              {freelanceServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {freelanceServices.map((s) => (
                    <ServiceCard key={s.id} service={s as any} freelance={freelance as any} />
                  ))}
                </div>
              ) : (
                <div className="glass rounded-2xl p-12 text-center">
                  <p className="text-neutral-500">{t('freelanceDetail.noService')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar stats */}
          <div className="lg:col-span-1">
            <div className="sticky top-[110px] space-y-4">
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h3 className="text-sm font-bold text-primary-800 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary-400" />
                  {t('freelanceDetail.statistics')}
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Star, label: t('freelanceDetail.averageRating'), value: `${freelance.rating}/5`, sub: `${freelance.reviewCount} ${t('freelanceDetail.reviews')}` },
                    { icon: Shield, label: t('freelanceDetail.sales'), value: `+ ${freelance.sales}` },
                    { icon: Clock, label: t('freelanceDetail.responseTimeLabel'), value: freelance.responseTime },
                    { icon: Calendar, label: t('freelanceDetail.memberSinceLabel'), value: freelance.memberSince },
                  ].map(({ icon: Icon, label, value, sub }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-400/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-neutral-500 mb-1">{label}</p>
                        <p className="text-sm font-bold text-primary-800">{value}</p>
                        {sub && <p className="text-xs text-neutral-600">{sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h3 className="text-sm font-bold text-primary-800 mb-3">{t('freelanceDetail.status')}</h3>
                <span className="inline-flex items-center gap-2 text-xs text-primary-400 glass px-4 py-2 rounded-full font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  PRO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
