import Button from './actionButton';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/navBar/searching.module.css';

export default function SearchingBar() {
  return (
    <div className={styles.headerNav}>
      <Link href={'./'}>
        <Image
          src={'/logos/companyLogo.svg'}
          alt='Company Logo, Hancrafted Haven, where creativity finds a home'
          width={320}
          height={68}
        />
      </Link>

      <input
        type='text'
        placeholder='Search Hancrafted Items'
        className={styles.searchBar}
      />

      <div className={styles.headerButtons}>
        <Link href={'#'}>
          <Button buttonText='Sing Up' />
        </Link>

        <Link href={'#'}>
          <Image
            src={'/icons/favorites.svg'}
            alt='Favorite Icon link'
            width={43}
            height={45}
          />
        </Link>

        <Link href={'#'}>
          <Image
            src={'/icons/cart.svg'}
            alt='Cart Icon link'
            width={43}
            height={45}
          />
        </Link>
      </div>
    </div>
  );
}
