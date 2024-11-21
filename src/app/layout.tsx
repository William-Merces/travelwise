import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Providers from '@/components/providers/Providers';
import './globals.css';
import '@/styles/mapbox.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TravelWise - Sua agência de viagens online',
  description: 'Encontre as melhores ofertas em voos, hotéis e pacotes de viagem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  headers(); // Força o componente a ser dinâmico
  
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 pt-16 bg-gray-50 dark:bg-gray-900">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}