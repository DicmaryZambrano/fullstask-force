// app/(site)/layout.tsx
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';
import { getCategories } from '@/database/database';
import { SessionProvider } from 'next-auth/react';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <SessionProvider>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer categories={categories} />
    </SessionProvider>
  );
}
