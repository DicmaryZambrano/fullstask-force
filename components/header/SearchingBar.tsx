import Button from '../actionButton';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/navBar/searching.module.css';
import { auth } from '@/auth';

export default async function SearchingBar() {
  const session = await auth();
  console.log('Session:', session);
  const user = session?.user;
  return (
    <div className={styles.headerNav}>
      <Link href={'/'}>
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
        {user ? (
          <div className={styles.userWelcome}>
            <Image
              src={user.image || '/icons/user.svg'}
              alt='User Profile'
              width={45}
              height={45}
              className={styles.avatar}
            />

            <div>
              <span>Welcome, {user.name?.split(' ')[0]}</span>
              <Link href={'/dashboard'}>Go to Dashboard</Link>
            </div>
          </div>
        ) : (
          <Link href='/login'>
            <Button buttonText='Sign Up' />
          </Link>
        )}

        <Link href={'#'}>
          <Image
            src={'/icons/favorites.svg'}
            alt='Favorite Icon link'
            width={43}
            height={45}
          />
        </Link>

        <Link href={'/cart'}>
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
