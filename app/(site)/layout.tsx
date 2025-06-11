import '@/styles/globals.css';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import { roboto, katibeh } from '@/components/fonts';
import { getCategories } from '@/database/database';

export const metadata = {
  title: 'Handcrafted Haven',
  description: 'Marketplace for handmade treasures',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${katibeh.variable}`}>
        <Header categories={categories} />
        <main>
          {children}
        </main>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
