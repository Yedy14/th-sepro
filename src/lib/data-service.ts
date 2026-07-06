import prisma from '@/lib/db';
import type { Service, Freelance, Category, Testimonial, Stat } from '@/types';

// ============================================
// CATEGORIES
// ============================================

export async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    icon: c.icon,
    description: c.description,
    color: c.color,
    serviceCount: c.serviceCount,
    freelancerCount: c.freelancerCount,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: { slug },
  });
  if (!category) return null;
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    icon: category.icon,
    description: category.description,
    color: category.color,
    serviceCount: category.serviceCount,
    freelancerCount: category.freelancerCount,
  };
}

// ============================================
// FREELANCES
// ============================================

export async function getFreelances(): Promise<Freelance[]> {
  const freelances = await prisma.freelance.findMany({
    include: { category: true, user: true },
    orderBy: { rating: 'desc' },
  });
  return freelances.map((f) => ({
    id: f.id,
    slug: f.slug,
    name: f.user.name || 'Unknown',
    avatar: f.avatar || '',
    title: f.title,
    speciality: f.speciality,
    category: f.category?.slug || '',
    sales: f.sales,
    rating: f.rating,
    reviewCount: f.reviewCount,
    verified: f.verified,
    bio: f.bio || '',
    skills: (f.skills as string[]) || [],
    memberSince: f.memberSince,
    responseTime: f.responseTime,
    location: f.location,
  }));
}

export async function getFreelanceBySlug(slug: string): Promise<Freelance | null> {
  const freelance = await prisma.freelance.findUnique({
    where: { slug },
    include: { category: true, user: true },
  });
  if (!freelance) return null;
  return {
    id: freelance.id,
    slug: freelance.slug,
    name: freelance.user.name || 'Unknown',
    avatar: freelance.avatar || '',
    title: freelance.title,
    speciality: freelance.speciality,
    category: freelance.category?.slug || '',
    sales: freelance.sales,
    rating: freelance.rating,
    reviewCount: freelance.reviewCount,
    verified: freelance.verified,
    bio: freelance.bio || '',
    skills: (freelance.skills as string[]) || [],
    memberSince: freelance.memberSince,
    responseTime: freelance.responseTime,
    location: freelance.location,
  };
}

export async function getFreelanceById(id: string): Promise<Freelance | null> {
  const freelance = await prisma.freelance.findUnique({
    where: { id },
    include: { category: true, user: true },
  });
  if (!freelance) return null;
  return {
    id: freelance.id,
    slug: freelance.slug,
    name: freelance.user.name || 'Unknown',
    avatar: freelance.avatar || '',
    title: freelance.title,
    speciality: freelance.speciality,
    category: freelance.category?.slug || '',
    sales: freelance.sales,
    rating: freelance.rating,
    reviewCount: freelance.reviewCount,
    verified: freelance.verified,
    bio: freelance.bio || '',
    skills: (freelance.skills as string[]) || [],
    memberSince: freelance.memberSince,
    responseTime: freelance.responseTime,
    location: freelance.location,
  };
}

// ============================================
// SERVICES
// ============================================

export async function getServices(): Promise<Service[]> {
  const services = await prisma.service.findMany({
    where: { active: true },
    include: {
      options: true,
      tags: true,
      freelancer: { include: { user: true } },
      category: true,
    },
    orderBy: { rating: 'desc' },
  });

  return services.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    freelancerId: s.freelancerId,
    price: s.price,
    category: s.category.slug,
    image: s.image || '',
    rating: s.rating,
    reviewCount: s.reviewCount,
    budget: s.budget,
    tags: s.tags.map((t) => t.tag),
    sponsored: s.sponsored,
    description: s.description,
    longDescription: s.longDescription || '',
    options: {
      basic: mapOption(s.options.find((o) => o.type === 'BASIC')),
      standard: mapOption(s.options.find((o) => o.type === 'STANDARD')),
      premium: mapOption(s.options.find((o) => o.type === 'PREMIUM')),
    },
    deliveryDays: s.deliveryDays,
    revisions: s.revisions,
  }));
}

function mapOption(option: { name: string; description: string; price: number; deliveryDays: number } | undefined) {
  if (!option) return { name: '', description: '', price: 0, deliveryDays: 0 };
  return {
    name: option.name,
    description: option.description,
    price: option.price,
    deliveryDays: option.deliveryDays,
  };
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      options: true,
      tags: true,
      freelancer: { include: { user: true } },
      category: true,
    },
  });
  if (!service) return null;

  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    freelancerId: service.freelancerId,
    price: service.price,
    category: service.category.slug,
    image: service.image || '',
    rating: service.rating,
    reviewCount: service.reviewCount,
    budget: service.budget,
    tags: service.tags.map((t) => t.tag),
    sponsored: service.sponsored,
    description: service.description,
    longDescription: service.longDescription || '',
    options: {
      basic: mapOption(service.options.find((o) => o.type === 'BASIC')),
      standard: mapOption(service.options.find((o) => o.type === 'STANDARD')),
      premium: mapOption(service.options.find((o) => o.type === 'PREMIUM')),
    },
    deliveryDays: service.deliveryDays,
    revisions: service.revisions,
  };
}

export async function getServicesByCategory(categorySlug: string): Promise<Service[]> {
  const services = await prisma.service.findMany({
    where: {
      active: true,
      category: { slug: categorySlug },
    },
    include: {
      options: true,
      tags: true,
      freelancer: { include: { user: true } },
      category: true,
    },
    orderBy: { rating: 'desc' },
  });

  return services.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    freelancerId: s.freelancerId,
    price: s.price,
    category: s.category.slug,
    image: s.image || '',
    rating: s.rating,
    reviewCount: s.reviewCount,
    budget: s.budget,
    tags: s.tags.map((t) => t.tag),
    sponsored: s.sponsored,
    description: s.description,
    longDescription: s.longDescription || '',
    options: {
      basic: mapOption(s.options.find((o) => o.type === 'BASIC')),
      standard: mapOption(s.options.find((o) => o.type === 'STANDARD')),
      premium: mapOption(s.options.find((o) => o.type === 'PREMIUM')),
    },
    deliveryDays: s.deliveryDays,
    revisions: s.revisions,
  }));
}

// ============================================
// TESTIMONIALS
// ============================================

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return testimonials.map((t) => ({
    id: t.id,
    author: t.author,
    role: t.role,
    text: t.text,
    rating: t.rating,
    avatar: t.avatar || '',
  }));
}

// ============================================
// STATS
// ============================================

export async function getStats(): Promise<Stat[]> {
  const [serviceCount, freelanceCount, orderCount] = await Promise.all([
    prisma.service.count({ where: { active: true } }),
    prisma.freelance.count({ where: { verified: true } }),
    prisma.order.count({ where: { status: 'COMPLETED' } }),
  ]);

  return [
    {
      label: `${Math.max(orderCount, 1000)}+`,
      value: `${Math.max(orderCount, 1000)}+`,
      description: 'Commandes livrées avec succès',
    },
    {
      label: '98,9 %',
      value: '98.9%',
      description: 'Clients satisfaits',
    },
    {
      label: `${Math.max(freelanceCount, 200)}+`,
      value: `${Math.max(freelanceCount, 200)}+`,
      description: 'Freelances vérifiés disponibles',
    },
  ];
}

// ============================================
// SLUGS (for generateStaticParams replacement)
// ============================================

export async function getServiceSlugs(): Promise<string[]> {
  const services = await prisma.service.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return services.map((s) => s.slug);
}

export async function getFreelanceSlugs(): Promise<string[]> {
  const freelances = await prisma.freelance.findMany({
    select: { slug: true },
  });
  return freelances.map((f) => f.slug);
}

// ============================================
// USER HELPERS
// ============================================

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { freelance: true },
  });
}

// ============================================
// ORDERS
// ============================================

export async function getUserOrders(userId: string, role: 'client' | 'freelance') {
  const where = role === 'client'
    ? { clientId: userId }
    : { freelanceId: userId };

  const freelanceWhere = role === 'freelance'
    ? { freelance: { userId } }
    : {};

  const orders = await prisma.order.findMany({
    where: role === 'client' ? { clientId: userId } : { freelance: { userId } },
    include: {
      service: {
        include: { category: true },
      },
      client: { select: { id: true, name: true, email: true } },
      freelance: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    serviceId: o.serviceId,
    serviceTitle: o.service.title,
    serviceSlug: o.service.slug,
    serviceImage: o.service.image,
    categorySlug: o.service.category.slug,
    optionType: o.optionType,
    status: o.status,
    totalAmount: o.totalAmount,
    deliveryDate: o.deliveryDate,
    notes: o.notes,
    createdAt: o.createdAt,
    completedAt: o.completedAt,
    clientName: o.client.name,
    freelanceName: o.freelance.user.name,
    freelanceSlug: o.freelance.slug,
    hasReview: !!o.review,
  }));
}

export async function getOrderById(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      service: {
        include: {
          category: true,
          options: true,
          tags: true,
        },
      },
      client: { select: { id: true, name: true, email: true } },
      freelance: {
        include: {
          user: { select: { id: true, name: true, email: true } },
          category: true,
        },
      },
      revisions: { orderBy: { createdAt: 'desc' } },
      review: true,
      payment: true,
    },
  });

  if (!order) return null;

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    serviceId: order.serviceId,
    service: {
      title: order.service.title,
      slug: order.service.slug,
      image: order.service.image,
      description: order.service.description,
      category: order.service.category.slug,
      options: order.service.options.map((o) => ({
        type: o.type,
        name: o.name,
        description: o.description,
        price: o.price,
        deliveryDays: o.deliveryDays,
      })),
      tags: order.service.tags.map((t) => t.tag),
    },
    optionType: order.optionType,
    status: order.status,
    totalAmount: order.totalAmount,
    platformFee: order.platformFee,
    freelanceEarnings: order.freelanceEarnings,
    deliveryDate: order.deliveryDate,
    notes: order.notes,
    createdAt: order.createdAt,
    completedAt: order.completedAt,
    cancelledAt: order.cancelledAt,
    cancellationReason: order.cancellationReason,
    client: {
      id: order.client.id,
      name: order.client.name,
      email: order.client.email,
    },
    freelance: {
      id: order.freelance.id,
      slug: order.freelance.slug,
      name: order.freelance.user.name,
      title: order.freelance.title,
      avatar: order.freelance.avatar,
    },
    revisions: order.revisions.map((r) => ({
      id: r.id,
      message: r.message,
      createdAt: r.createdAt,
    })),
    review: order.review ? {
      rating: order.review.rating,
      comment: order.review.comment,
      createdAt: order.review.createdAt,
    } : null,
  };
}

export async function createOrder(data: {
  serviceId: string;
  clientId: string;
  optionType: string;
  totalAmount: number;
  notes?: string;
}) {
  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });
  if (!service) throw new Error('Service non trouvé');

  const platformFee = Math.round(data.totalAmount * 0.2);
  const freelanceEarnings = data.totalAmount - platformFee;

  const orderNumber = 'TP-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      serviceId: data.serviceId,
      clientId: data.clientId,
      freelanceId: service.freelancerId,
      optionType: data.optionType as 'BASIC' | 'STANDARD' | 'PREMIUM',
      totalAmount: data.totalAmount,
      platformFee,
      freelanceEarnings,
      notes: data.notes,
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  // Create payment record
  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: data.totalAmount,
      status: 'COMPLETED',
      method: 'stripe',
    },
  });

  return order;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const updateData: Record<string, unknown> = { status: status as 'PENDING' | 'IN_PROGRESS' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED' };
  if (status === 'COMPLETED') updateData.completedAt = new Date();
  if (status === 'CANCELLED') updateData.cancelledAt = new Date();

  return prisma.order.update({
    where: { id: orderId },
    data: updateData,
  });
}

// ============================================
// REVIEWS
// ============================================

export async function createReview(data: {
  orderId: string;
  clientId: string;
  freelanceId: string;
  serviceId: string;
  rating: number;
  comment?: string;
}) {
  const review = await prisma.review.create({
    data,
  });

  // Update freelance rating
  const reviews = await prisma.review.findMany({
    where: { freelanceId: data.freelanceId },
  });
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await prisma.freelance.update({
    where: { id: data.freelanceId },
    data: {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    },
  });

  // Update service rating
  const serviceReviews = await prisma.review.findMany({
    where: { serviceId: data.serviceId },
  });
  const serviceAvg = serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length;

  await prisma.service.update({
    where: { id: data.serviceId },
    data: {
      rating: Math.round(serviceAvg * 10) / 10,
      reviewCount: serviceReviews.length,
    },
  });

  return review;
}

export async function getServiceReviews(serviceId: string) {
  return prisma.review.findMany({
    where: { serviceId },
    include: {
      client: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ============================================
// MESSAGING
// ============================================

export async function getConversations(userId: string) {
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { clientId: userId },
        { freelance: { userId } },
      ],
    },
    include: {
      client: { select: { id: true, name: true } },
      freelance: {
        include: {
          user: { select: { id: true, name: true } },
        },
      },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  return conversations.map((c) => ({
    id: c.id,
    lastMessage: c.messages[0]?.content || '',
    lastMessageAt: c.messages[0]?.createdAt || c.createdAt,
    unreadCount: 0,
    otherUser: c.clientId === userId
      ? { name: c.freelance.user.name || 'Freelance', id: c.freelanceId }
      : { name: c.client.name || 'Client', id: c.clientId },
  }));
}

export async function getMessages(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    include: {
      sender: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: 'asc' },
  });
}

export async function sendMessage(data: {
  conversationId: string;
  senderId: string;
  content: string;
}) {
  const message = await prisma.message.create({ data });

  // Update conversation timestamp
  await prisma.conversation.update({
    where: { id: data.conversationId },
    data: { updatedAt: new Date() },
  });

  return message;
}

export async function getOrCreateConversation(clientId: string, freelanceId: string) {
  let conversation = await prisma.conversation.findUnique({
    where: { clientId_freelanceId: { clientId, freelanceId } },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { clientId, freelanceId },
    });
  }

  return conversation;
}

// ============================================
// DASHBOARD
// ============================================

export async function getDashboardStats(userId: string, role: string) {
  if (role === 'CLIENT') {
    const [totalOrders, activeOrders, completedOrders] = await Promise.all([
      prisma.order.count({ where: { clientId: userId } }),
      prisma.order.count({ where: { clientId: userId, status: { in: ['PENDING', 'IN_PROGRESS'] } } }),
      prisma.order.count({ where: { clientId: userId, status: 'COMPLETED' } }),
    ]);
    return { totalOrders, activeOrders, completedOrders };
  } else {
    const freelance = await prisma.freelance.findUnique({ where: { userId } });
    if (!freelance) return { totalOrders: 0, activeOrders: 0, completedOrders: 0, totalEarnings: 0 };

    const [totalOrders, activeOrders, completedOrders, earnings] = await Promise.all([
      prisma.order.count({ where: { freelanceId: freelance.id } }),
      prisma.order.count({ where: { freelanceId: freelance.id, status: { in: ['PENDING', 'IN_PROGRESS'] } } }),
      prisma.order.count({ where: { freelanceId: freelance.id, status: 'COMPLETED' } }),
      prisma.order.aggregate({
        where: { freelanceId: freelance.id, status: 'COMPLETED' },
        _sum: { freelanceEarnings: true },
      }),
    ]);

    return { totalOrders, activeOrders, completedOrders, totalEarnings: earnings._sum.freelanceEarnings || 0 };
  }
}

export async function getFreelancerEarnings(freelanceId: string) {
  const orders = await prisma.order.findMany({
    where: { freelanceId, status: 'COMPLETED' },
    select: { freelanceEarnings: true, completedAt: true },
    orderBy: { completedAt: 'desc' },
  });

  const totalEarnings = orders.reduce((sum, o) => sum + o.freelanceEarnings, 0);
  const pendingWithdrawals = await prisma.withdrawal.count({
    where: { freelanceId, status: 'PENDING' },
  });

  return { totalEarnings, pendingWithdrawals, orderCount: orders.length };
}

// ============================================
// SERVICE MANAGEMENT (Dashboard)
// ============================================

export async function getFreelancerServices(freelanceId: string) {
  const services = await prisma.service.findMany({
    where: { freelancerId: freelanceId },
    include: {
      options: true,
      tags: true,
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return services.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    price: s.price,
    category: s.category.name,
    categorySlug: s.category.slug,
    image: s.image,
    rating: s.rating,
    reviewCount: s.reviewCount,
    active: s.active,
    sponsored: s.sponsored,
    tags: s.tags.map((t) => t.tag),
    createdAt: s.createdAt,
  }));
}

export async function toggleServiceActive(serviceId: string) {
  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new Error('Service non trouvé');

  return prisma.service.update({
    where: { id: serviceId },
    data: { active: !service.active },
  });
}

// ============================================
// SEARCH
// ============================================

export async function searchServices(query: string, filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}) {
  const where: Record<string, unknown> = {
    active: true,
    ...(filters?.category && { category: { slug: filters.category } }),
    ...(filters?.minPrice && { price: { gte: filters.minPrice } }),
    ...(filters?.maxPrice && { price: { lte: filters.maxPrice } }),
    ...(filters?.minRating && { rating: { gte: filters.minRating } }),
  };

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
      { tags: { some: { tag: { contains: query } } } },
    ];
  }

  const services = await prisma.service.findMany({
    where,
    include: {
      options: true,
      tags: true,
      freelancer: { include: { user: true } },
      category: true,
    },
    orderBy: { rating: 'desc' },
    take: 20,
  });

  return services.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    freelancerId: s.freelancerId,
    freelancerName: s.freelancer.user.name,
    price: s.price,
    category: s.category.slug,
    categoryName: s.category.name,
    image: s.image || '',
    rating: s.rating,
    reviewCount: s.reviewCount,
    tags: s.tags.map((t) => t.tag),
    sponsored: s.sponsored,
    description: s.description,
  }));
}
