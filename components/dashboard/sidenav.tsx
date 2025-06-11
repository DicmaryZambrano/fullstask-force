import Link from 'next/link';
import { signOut } from '@/auth';
import Image from 'next/image';
import Button from '../actionButton';

export default function SideNav() {
  return (
    <aside>
      <div>
        <Link href={'/'}>
          <Image
            src={'/logos/companyLogo.svg'}
            alt='Company Logo, Hancrafted Haven, where creativity finds a home'
            width={320}
            height={68}
          />
        </Link>

        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <Button buttonText='Sign Out' type='submit' />
        </form>
      </div>
    </aside>
  );
}
