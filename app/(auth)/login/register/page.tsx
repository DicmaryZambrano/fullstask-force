import RegisterForm from '@/components/register-form';
import styles from '@/styles/login/register.module.css';

export default function RegisterPage() {
  return (
    <main className={`container ${styles.containerRegister}`}>
      <h2 className={styles.h2}>Join Us!</h2>
      <hr className={styles.hr} />
      <RegisterForm />
    </main>
  );
}
