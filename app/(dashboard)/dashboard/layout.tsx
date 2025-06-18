import '@/styles/globals.css';
import SideNav from '@/components/dashboard/sidenav';
import styles from '@/styles/dashboard/sidenav.module.css';
import { SessionProvider } from 'next-auth/react';

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
