import Link from 'next/link';
import { signOut } from '@/auth';
import Image from 'next/image';
import Button from '../actionButton';
import styles from '@/styles/dashboard/sidenav.module.css';
import { auth } from '@/auth';
import { getUserByEmail } from '@/database/database';

export default async function SideNav() {
  const session = await auth();
  const user = session!.user;
  const userInfo = await getUserByEmail(user!.email as string);
  console.log(userInfo);

  return (
    <aside>
      <div className={styles.navMenu}>
        <Link href={'/'} className={styles.logo}>
          <Image
            src={'/logos/companyLogo.svg'}
            alt='Company Logo, Hancrafted Haven, where creativity finds a home'
            width={250}
            height={68}
          />
        </Link>

        <div className={styles.upperMenu}>
          <Link href={'/dashboard'}>
            <div className={styles.sideButton}>
              <Image
                src={'icons/dashboard-icons/user.svg'}
                alt='user icon'
                width={35}
                height={25}
              />

              <p>My profile</p>
            </div>
          </Link>
          {userInfo!.role === 'seller' ? (
            <>
              <Link href={'.'}>
                <div className={styles.sideButton}>
                  <Image
                    src={'icons/dashboard-icons/clipboard-list.svg'}
                    alt='user icon'
                    width={35}
                    height={25}
                  />
                  <p>Listings</p>
                </div>
              </Link>

              <Link href={'.'}>
                <div className={styles.sideButton}>
                  <Image
                    src={'icons/dashboard-icons/tag.svg'}
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
              <Link href={'.'}>
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

              <Link href={'.'}>
                <div className={styles.sideButton}>
                  <Image
                    src={'icons/dashboard-icons/heart.svg'}
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

        <div className={styles.navSpacing}></div>

        <div className={styles.bottonMenu}>
          <Link href={'.'}>
            {' '}
            <div className={styles.sideButton}>
              <Image
                src={'icons/dashboard-icons/home.svg'}
                alt='user icon'
                width={35}
                height={25}
              />
              <p>Home</p>
            </div>
          </Link>

          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button
              buttonText='Sign Out'
              type='submit'
              className={styles.dashboardButton}
            />
          </form>
        </div>
      </div>
    </aside>
  );
}
