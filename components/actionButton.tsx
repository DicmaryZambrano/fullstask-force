import styles from '@/styles/button.module.css';

interface ButtonProps {
  buttonText: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  buttonText,
  type = 'button',
  className = '',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
