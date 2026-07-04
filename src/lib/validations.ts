import { z } from 'zod';

// ============================================
// AUTH VALIDATION
// ============================================

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  role: z.enum(['client', 'freelance']).default('client'),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

// ============================================
// ORDER VALIDATION
// ============================================

export const createOrderSchema = z.object({
  serviceSlug: z.string().min(1, 'Service requis'),
  optionType: z.enum(['BASIC', 'STANDARD', 'PREMIUM']),
  totalAmount: z.number().positive('Le montant doit être positif'),
  notes: z.string().max(1000).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'DISPUTED']),
  reason: z.string().max(500).optional(),
});

// ============================================
// REVIEW VALIDATION
// ============================================

export const createReviewSchema = z.object({
  orderId: z.string().min(1, 'Commande requise'),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
});

// ============================================
// SERVICE VALIDATION
// ============================================

export const createServiceSchema = z.object({
  title: z.string().min(10, 'Le titre doit contenir au moins 10 caractères').max(200),
  category: z.string().min(1, 'Catégorie requise'),
  description: z.string().min(50, 'La description doit contenir au moins 50 caractères').max(5000),
  longDescription: z.string().max(10000).optional(),
  price: z.number().positive('Le prix doit être positif'),
  budget: z.number().min(0),
  deliveryDays: z.number().int().positive(),
  revisions: z.number().int().min(0),
  tags: z.array(z.string()).max(10).optional(),
  image: z.string().url('URL d\'image invalide').optional(),
  options: z.object({
    basic: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number().positive(),
      deliveryDays: z.number().int().positive(),
    }),
    standard: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number().positive(),
      deliveryDays: z.number().int().positive(),
    }),
    premium: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number().positive(),
      deliveryDays: z.number().int().positive(),
    }),
  }),
});

// ============================================
// MESSAGE VALIDATION
// ============================================

export const sendMessageSchema = z.object({
  content: z.string().min(1, 'Le message est requis').max(5000),
});

export const createConversationSchema = z.object({
  freelanceId: z.string().min(1, 'Freelance requis'),
});

// ============================================
// CONTACT VALIDATION
// ============================================

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis').max(100),
  email: z.string().email('Email invalide'),
  subject: z.string().min(3, 'Le sujet est requis').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
});

// ============================================
// SETTINGS VALIDATION
// ============================================

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email('Email invalide').optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').optional(),
}).refine(
  (data) => {
    if (data.newPassword && !data.currentPassword) return false;
    return true;
  },
  { message: 'Mot de passe actuel requis', path: ['currentPassword'] }
);

export const updateFreelanceSettingsSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  speciality: z.string().min(3).max(200).optional(),
  bio: z.string().max(2000).optional(),
  location: z.string().max(100).optional(),
  skillsText: z.string().max(500).optional(),
});

// ============================================
// WITHDRAWAL VALIDATION
// ============================================

export const createWithdrawalSchema = z.object({
  amount: z.number().positive('Le montant doit être positif'),
  method: z.enum(['bank_transfer', 'paypal', 'mobile_money']),
});

// ============================================
// REPORT VALIDATION
// ============================================

export const createReportSchema = z.object({
  targetType: z.enum(['service', 'review', 'user', 'message']),
  targetId: z.string().min(1, 'Cible requise'),
  reason: z.string().min(10, 'La raison doit contenir au moins 10 caractères').max(500),
  details: z.string().max(2000).optional(),
});

// ============================================
// SEARCH VALIDATION
// ============================================

export const searchSchema = z.object({
  query: z.string().max(200).optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sortBy: z.enum(['rating', 'price_asc', 'price_desc', 'newest', 'popular']).default('rating'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

// ============================================
// HELPER
// ============================================

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type CreateWithdrawalInput = z.infer<typeof createWithdrawalSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
