'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../actionButton';
import styles from '@/styles/login/login.module.css';

export function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid credentials, Try again!');
    } else {
      // Forzamos que se revaliden los datos de la sesión antes de redirigir:
      router.refresh();
      router.push('/');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        required
        className={styles.input}
      />

      {error && <p className={styles.error}>{error}</p>}

      <Button buttonText="Sign in" type="submit" />
    </form>
  );
}
