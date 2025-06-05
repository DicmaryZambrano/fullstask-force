import '@/styles/globals.css';
import styles from '@/styles/login/loginLayout.module.css';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { roboto, katibeh } from '@/components/fonts';
import { getCategories } from '@/database/database';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  return (
    <html lang='en' className={`${roboto.variable} ${katibeh.variable}`}>
      <body>
        <header className={styles.header}>
          <Link href={'./'}>
            <Image
              src={'/logos/companyLogo.svg'}
              alt='Company Logo, Hancrafted Haven, where creativity finds a home'
              width={320}
              height={68}
            />
          </Link>
        </header>
        {children}
        <Footer categories={categories} />
      </body>
    </html>
  );
}
