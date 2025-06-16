'use client';

import styles from '@/styles/navBar/Navbar.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { slugify } from '@/lib/slugify';
import { usePathname } from 'next/navigation';

export default function NavBar({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={styles.navWrapper}>
      <button className={styles.hamburger} onClick={() => setOpen(!open)}>
        {open ? 'X' : '☰ See all Categories'}
      </button>
      <nav className={`${styles.links} ${open ? styles.open : ''}`}>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/products/category/${slugify(category.name)}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
