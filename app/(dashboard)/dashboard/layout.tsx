import '@/styles/globals.css';
// import Link from 'next/link';
// import Image from 'next/image';
import { roboto, katibeh } from '@/components/fonts';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} ${katibeh.variable}`}>
        <div>
          {/* <SideNav /> */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
