export interface Freelance {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  title: string;
  speciality: string;
  category: string;
  sales: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  bio: string;
  skills: string[];
  memberSince: string;
  responseTime: string;
  location: string;
}

export interface ServiceOption {
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  freelancerId: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  budget: number;
  tags: string[];
  sponsored: boolean;
  description: string;
  longDescription: string;
  options: {
    basic: ServiceOption;
    standard: ServiceOption;
    premium: ServiceOption;
  };
  deliveryDays: number;
  revisions: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  serviceCount: number;
  freelancerCount: number;
  color: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}
