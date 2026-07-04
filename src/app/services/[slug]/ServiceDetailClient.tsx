'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, CheckCircle, Shield, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { OrderSidebar } from '@/components/ui/OrderSidebar';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface ServiceData {
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string | null;
  rating: number;
  reviewCount: number;
  price: number;
  tags?: string[];
  options: {
    basic: { name: string; description: string; price: number; deliveryDays: number };
    standard: { name: string; description: string; price: number; deliveryDays: number };
    premium: { name: string; description: string; price: number; deliveryDays: number };
  };
}

interface FreelanceData {
  name: string;
  slug: string;
  title: string;
  avatar: string | null;
  verified: boolean;
  location: string;
  responseTime: string;
  memberSince: string;
}

interface RelatedService {
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

interface Tier {
  key: string;
  label: string;
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
}

interface ServiceDetailClientProps {
  service: ServiceData;
  freelance: FreelanceData;
  relatedServices: RelatedService[];
  tiers: Tier[];
}

export default function ServiceDetailClient({ service, freelance, relatedServices, tiers }: ServiceDetailClientProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#edf6fd] noise-bg">
      {/* Breadcrumb */}
      <div className="border-b border-primary-100">
        <div className="container-responsive py-4">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 animate-fade-in">
            <Link href="/" className="hover:text-primary-400 transition-colors">{t('common.home')}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-primary-400 transition-colors">{t('services.breadcrumb')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-700">{service.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-responsive py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden aspect-video glass animate-fade-in">
              <Image
                src={service.image || '/placeholder-service.jpg'}
                alt={service.title}
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary-800">{service.category}</span>
                  {freelance.verified && (
                    <span className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-primary-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {t('serviceDetail.verified')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Title & rating */}
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-black text-primary-800 mb-4">{service.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-primary-400 text-primary-400" />
                  <span className="text-primary-800 font-bold">{service.rating.toFixed(1)}</span>
                  <span className="text-neutral-500">({service.reviewCount} {t('serviceDetail.reviews')})</span>
                </div>
                <span className="text-neutral-600">|</span>
                <span className="text-neutral-400">{service.reviewCount} {t('serviceDetail.ordersCompleted')}</span>
                <span className="text-neutral-600">|</span>
                <span className="text-neutral-400">{t('serviceDetail.by')} <Link href={`/freelances/${freelance.slug}`} className="text-primary-400 font-bold hover:text-primary-300 transition-colors">{freelance.name}</Link></span>
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-8 animate-fade-in">
              <h2 className="text-xl font-bold text-primary-800 mb-4">{t('serviceDetail.description')}</h2>
              <p className="text-neutral-400 leading-relaxed whitespace-pre-line">{service.description}</p>
            </div>

            {/* Tags */}
            {service.tags && service.tags.length > 0 && (
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h2 className="text-xl font-bold text-primary-800 mb-4">{t('serviceDetail.skills')}</h2>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-xs text-primary-700 glass px-4 py-2 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Freelance card */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-700 flex-shrink-0 ring-2 ring-primary-400/20">
                  <Image 
                    src={freelance.avatar || '/placeholder-avatar.jpg'} 
                    alt={freelance.name} 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Link href={`/freelances/${freelance.slug}`} className="text-lg font-bold text-primary-800 hover:text-primary-400 transition-colors">{freelance.name}</Link>
                    {freelance.verified && <CheckCircle className="w-4 h-4 text-primary-400" />}
                  </div>
                  <p className="text-sm text-neutral-400 mb-2">{freelance.title}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {freelance.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t('serviceDetail.responseTime')} {freelance.responseTime}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t('serviceDetail.memberSince')} {freelance.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related services */}
            {relatedServices.length > 0 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-primary-800 mb-4">{t('serviceDetail.similarServices')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedServices.map((s) => (
                    <ServiceCard key={s.id} service={s as any} freelance={freelance as any} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[110px]">
              <OrderSidebar tiers={tiers} startingPrice={service.price} serviceSlug={service.slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
