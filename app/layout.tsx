import '@/styles/globals.css';
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
    <html lang="en" >
      <body className={`${roboto.variable} ${katibeh.variable}`}>{children}</body>
    </html>
  );
}
