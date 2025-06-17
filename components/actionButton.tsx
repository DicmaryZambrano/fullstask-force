import styles from '@/styles/button.module.css';

interface ButtonProps {
  buttonText: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: 'danger';
}

export default function Button({
  buttonText,
  type = 'button',
  className = '',
  onClick,
  disabled = false, 
  variant,
}: ButtonProps) {
  const variantClass = variant ? styles[variant] : '';
  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}
