import '@/styles/globals.css';
import SideNav from '@/components/dashboard/sidenav';
import styles from '@/styles/dashboard/sidenav.module.css';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Profile Dashboard',
  description:
    'In this dashboard you will find all the options to manage your seller and user profile',
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className={styles.dashboardLayout}>
        <SideNav />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </SessionProvider>
  );
}
