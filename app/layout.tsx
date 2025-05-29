import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Navegation from '@/components/navBar';
import React from 'react';
import { roboto, katibeh } from '@/components/fonts';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Marketplace for handmade treasures',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${roboto.variable} ${katibeh.variable}`}>
      <body>
        <Navegation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
