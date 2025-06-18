'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/dashboard/sidenav.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  role: 'seller' | 'customer' | 'admin';
};

export default function DynamicLinks({ role }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const isActive = (href: string, exact = false) =>
    mounted && (exact ? pathname === href : pathname.startsWith(href));

  return (
    <div className={styles.upperMenu}>
      <Link href={'/dashboard'}>
        <div
          className={`${styles.sideButton} ${
            isActive('/dashboard', true) ? styles.active : ''
          }`}
        >
          <Image
            src={'/icons/dashboard-icons/user.svg'}
            alt='user icon'
            width={35}
            height={25}
          />

          <p>My profile</p>
        </div>
      </Link>
      {role === 'seller' ? (
        <>
          <Link href={'/dashboard/products'}>
            <div
              className={`${styles.sideButton} ${
                isActive('/dashboard/products') ? styles.active : ''
              }`}
            >
              <Image
                src={'/icons/dashboard-icons/clipboard-list.svg'}
                alt='user icon'
                width={35}
                height={25}
              />
              <p>Listings</p>
            </div>
          </Link>

          <Link href={'/dashboard/collections'}>
            <div
              className={`${styles.sideButton} ${
                isActive('/dashboard/collections') ? styles.active : ''
              }`}
            >
              <Image
                src={'/icons/dashboard-icons/tag.svg'}
                alt='user icon'
                width={35}
                height={25}
              />
              <p>Collections</p>
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link href={'/cart'}>
            <div className={styles.sideButton}>
              <Image
                src={'icons/dashboard-icons/shopping-cart.svg'}
                alt='user icon'
                width={35}
                height={25}
              />
              <p>Cart</p>
            </div>
          </Link>

          <Link href={'/favorites'}>
            <div className={styles.sideButton}>
              <Image
                src={'/icons/dashboard-icons/heart.svg'}
                alt='user icon'
                width={35}
                height={25}
              />
              <p>Favorites</p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
