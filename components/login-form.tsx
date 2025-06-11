'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import Button from '@/components/actionButton';
import Link from 'next/link';
import Image from 'next/image';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import styles from '@/styles/login/login.module.css';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

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
        <form action={formAction} className={styles.form}>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            required
            className={styles.input}
          />
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            required
            className={styles.input}
          />
          <input type='hidden' name='redirectTo' value={callbackUrl} />
          <Button
            buttonText='Sing in'
            type='submit'
            arial-disabled={isPending}
          />
          <div>
            {errorMessage && (
              <>
                <ExclamationCircleIcon />
                <p>{errorMessage}</p>
              </>
            )}
          </div>
        </form>
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
