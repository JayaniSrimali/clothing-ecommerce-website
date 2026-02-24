import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Luxe Clothing',
  description: 'Premium clothing for the modern individual.',
};

import { WishlistProvider } from '../context/WishlistContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Toaster
                  position="top-right"
                  toastOptions={{
                    className: '',
                    style: {
                      border: '1px solid #EBEBEB',
                      padding: '16px',
                      color: '#2d2420',
                      fontFamily: 'var(--font-family-sans)',
                      background: '#ffffff',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    },
                    success: {
                      iconTheme: {
                        primary: '#5D4037',
                        secondary: '#FFFAEE',
                      },
                      style: {
                        borderLeft: '4px solid #5D4037',
                      }
                    },
                    error: {
                      iconTheme: {
                        primary: '#D32F2F',
                        secondary: '#FFFAEE',
                      },
                      style: {
                        borderLeft: '4px solid #D32F2F',
                      }
                    },
                    duration: 4000,
                  }}
                />
                <Navbar />
                <main className="flex-1 ">
                  {children}
                </main>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
