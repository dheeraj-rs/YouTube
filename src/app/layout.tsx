import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { AppProvider } from '@/providers/AppProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YouTube Clone with Dark Theme',
  description: 'A YouTube clone built with Next.js and TailwindCSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen bg-dark text-white">
            <Header />
            <div className="flex h-screen pt-14">
              <Sidebar />
              <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out will-change-auto">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}