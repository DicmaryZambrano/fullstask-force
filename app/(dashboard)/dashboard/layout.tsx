import '@/styles/globals.css';
import SideNav from '@/components/dashboard/sidenav';
import { roboto, katibeh } from '@/components/fonts';
import styles from '@/styles/dashboard/sidenav.module.css';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${katibeh.variable}`}>
        <div className={styles.dashboardLayout}>
          <SideNav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
