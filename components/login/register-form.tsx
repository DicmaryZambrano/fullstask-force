import Button from '@/components/actionButton';
import styles from '@/styles/login/register.module.css';
import Image from 'next/image';

export default function RegisterForm() {
  return (
    <>
      <form className={styles.form}>
        <label htmlFor='firstName'>Your First Name</label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          placeholder='Enter your first name'
          required
          className={styles.input}
        />

        <label htmlFor='lastName'>Your Last Name</label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          placeholder='Enter your last name'
          required
          className={styles.input}
        />

        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='example@email.com'
          required
          className={styles.input}
        />

        <div className={styles.warning}>
          <Image
            src={'/icons/BrakeWarning.svg'}
            alt='Break Warning'
            width={30}
            height={30}
          />
          <p>
            Your password needs to be at least 8 character long with an
            uppercase and a special character (!*$%@)
          </p>
        </div>

        <label htmlFor='password'>Create your password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
          className={styles.input}
        />

        <label htmlFor='confirmPassword'>Confirm Your Password:</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          required
          className={styles.input}
        />

        <Button
          buttonText='Register'
          type='submit'
          className={styles.buttonRegister}
        />
      </form>
    </>
  );
}
