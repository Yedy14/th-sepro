import { NextResponse } from 'next/server';

// ============================================
// ERROR CLASS
// ============================================

export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}

// ============================================
// ERROR RESPONSES
// ============================================

export function errorResponse(message: string, statusCode: number = 500, code?: string) {
  return NextResponse.json(
    {
      error: message,
      ...(code && { code }),
    },
    { status: statusCode }
  );
}

export function successResponse(data: Record<string, unknown>, statusCode: number = 200) {
  return NextResponse.json(data, { status: statusCode });
}

// ============================================
// ERROR HANDLER
// ============================================

export function handleApiError(error: unknown, context: string) {
  console.error(`[API Error] ${context}:`, error);

  if (error instanceof AppError) {
    return errorResponse(error.message, error.statusCode, error.code);
  }

  if (error instanceof Error) {
    // Prisma errors
    if (error.message.includes('Unique constraint')) {
      return errorResponse('Cette entrée existe déjà', 409, 'DUPLICATE_ENTRY');
    }
    if (error.message.includes('Record not found')) {
      return errorResponse('Ressource non trouvée', 404, 'NOT_FOUND');
    }

    // Validation errors
    if (error.message.includes('Invalid') && error.message.includes('input')) {
      return errorResponse('Données invalides', 400, 'VALIDATION_ERROR');
    }
  }

  return errorResponse('Une erreur interne est survenue', 500, 'INTERNAL_ERROR');
}

// ============================================
// COMMON ERRORS
// ============================================

export const Errors = {
  UNAUTHORIZED: () => new AppError('Non authentifié', 401, 'UNAUTHORIZED'),
  FORBIDDEN: () => new AppError('Accès refusé', 403, 'FORBIDDEN'),
  NOT_FOUND: (entity: string = 'Ressource') => new AppError(`${entity} non trouvé(e)`, 404, 'NOT_FOUND'),
  BAD_REQUEST: (message: string) => new AppError(message, 400, 'BAD_REQUEST'),
  CONFLICT: (message: string) => new AppError(message, 409, 'CONFLICT'),
  VALIDATION: (message: string) => new AppError(message, 422, 'VALIDATION_ERROR'),
  RATE_LIMITED: () => new AppError('Trop de requêtes, réessayez plus tard', 429, 'RATE_LIMITED'),
};
