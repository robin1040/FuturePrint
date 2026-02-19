import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FuturePrinter | Impresión 3D Industrial & Anime',
  description: 'Tienda especializada en impresión 3D: Figuras de Anime, Llaveros, Repuestos Industriales y Proyectos Personalizados.',
  keywords: ['impresión 3d', 'anime figures', 'llaveros 3d', 'repuestos 3d', 'futureprinter'],
  openGraph: {
    title: 'FuturePrinter - Tu idea en 3D',
    description: 'Calidad industrial para tus proyectos y colecciones.',
    url: 'https://futureprinter.com',
    siteName: 'FuturePrinter',
    locale: 'es_ES',
    type: 'website',
  },
};

import { Providers } from '../providers/Providers';
import Header from '../components/Header';
import SidebarCart from '../components/SidebarCart';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${robotoMono.variable} antialiased overflow-x-hidden`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans selection:bg-[var(--neon-cyan)] selection:text-black">
        <Providers>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <SidebarCart />
        </Providers>
      </body>
    </html>
  );
}
