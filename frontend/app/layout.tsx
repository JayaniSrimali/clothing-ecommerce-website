import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Luxe Clothing',
  description: 'Premium clothing for the modern individual.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <footer className="bg-gray-900 border-t border-gray-800 py-12">
              <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
                &copy; {new Date().getFullYear()} Luxe Clothing. All rights reserved.
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
