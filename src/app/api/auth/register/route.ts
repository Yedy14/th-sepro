import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 },
      );
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: { data: { name } },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'Un compte existe déjà avec cet email' },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 400 },
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Erreur lors de la création du compte" },
        { status: 500 },
      );
    }

    // Sync user to local DB
    const userRole = role === 'freelance' ? 'FREELANCE' : 'CLIENT';
    const user = await prisma.user.create({
      data: {
        id: data.user.id,
        email: email.toLowerCase(),
        name,
        password: '',
        role: userRole,
        emailVerified: false,
      },
    });

    // If freelance, create freelance profile
    if (role === 'freelance') {
      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36);
      await prisma.freelance.create({
        data: {
          userId: user.id,
          slug,
          title: 'Freelance académique',
          speciality: 'À définir',
          bio: '',
          skills: '[]',
          location: 'À définir',
          memberSince: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
          responseTime: '< 2h',
        },
      });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 },
    );
  }
}
