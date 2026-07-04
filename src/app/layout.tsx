import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const metadata: Metadata = {
  title: 'ThèsePro - Services Académiques Professionnels | Plateforme Freelance',
  description: 'ThèsePro connecte étudiants et professionnels avec des experts académiques vérifiés. Trouvez le freelance idéal pour vos projets de thèse, mémoire, coaching et bien plus.',
  keywords: 'thèse, mémoire, freelance académique, rédaction, tutorat, coaching universitaire, expertise académique',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-dark text-neutral-200 antialiased">
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
