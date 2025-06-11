import Link from 'next/link';
import Image from 'next/image';

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
      </div>
    </aside>
  );
}
