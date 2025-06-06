import styles from '@/styles/button.module.css';

interface ButtonProps {
  buttonText: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  buttonText,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} type={type}>
      {buttonText}
    </button>
  );
}
