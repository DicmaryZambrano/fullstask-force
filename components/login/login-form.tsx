import Link from 'next/link';
import Image from 'next/image';
// import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import styles from '@/styles/login/login.module.css';
import { SignIn } from './singIn';

export default function LoginForm() {
  return (
    <div className={`container ${styles.loginContainer}`}>
      <div>
        <Image
          className={styles.image}
          src={'/images/loginImage.webp'}
          alt='Handcrafting image'
          width={384}
          height={533}
        />
      </div>
      <div className={styles.formContainer}>
        <h2 className={styles.h2}>Hellou Again!</h2>
        <SignIn />

        <div className={styles.divider}>
          <hr className={styles.hr} />
          <span className={styles.span}>OR</span>
          <hr className={styles.hr} />
        </div>
        <Link href={'#'} className={styles.googleButton}>
          <Image
            src={'/icons/google.svg'}
            alt='Google Logo'
            width={43}
            height={45}
          />
          Sing in with Google
        </Link>
        <p className={styles.p}>
          Don&apos;t You Have An Account?{' '}
          <Link href={'/login/register'} className={styles.pLink}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
