import '@/styles/globals.css';
import { roboto, katibeh } from '@/components/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${katibeh.variable}`}>
        {children}
      </body>
    </html>
  );
}
