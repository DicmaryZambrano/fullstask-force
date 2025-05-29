import { Katibeh } from 'next/font/google';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

export const katibeh = Katibeh({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
  variable: '--font-katibeh',
  display: 'swap',
});
