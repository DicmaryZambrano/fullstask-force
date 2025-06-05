import styles from '@/styles/button.module.css';

interface ButtonProps {
  buttonText: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ buttonText, type = 'button' }: ButtonProps) {
  return (
    <button className={styles.button} type={type}>
      {buttonText}
    </button>
  );
}
