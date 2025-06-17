import '@/styles/globals.css';
import { roboto, katibeh } from '@/components/fonts';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
   
      <div className={`${roboto.variable} ${katibeh.variable}`}>

        {children}
      </div>
    </>
  );
}
