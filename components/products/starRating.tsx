import styles from '@/styles/products/starRating.module.css';

export default function StarRating({ rating }: { rating: number }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= rating ? styles.filled : styles.empty}
      >
        ★
      </span>
    );
  }

  return <span className={styles.starContainer}>{stars}</span>;
}
