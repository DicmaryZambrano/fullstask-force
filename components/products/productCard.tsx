import styles from '@/styles/home/productCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { ProductWithRatingAndSeller } from '@/types/types';

export default function ProductCard({
  product,
}: {
  product: ProductWithRatingAndSeller;
}) {
  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <Image
        src={product.image_url}
        alt={product.name}
        width={295}
        height={199}
      />
      <div className={styles.productInfo}>
        <div className={styles.ratingAndProName}>
          <p className={styles.title}>{product.name}</p>
          <span className={styles.rating}>
            {Number(product.average_rating).toFixed(1)} <FaStar />
          </span>
        </div>

        <p className={styles.seller}>{product.seller_name}</p>
        <div className={styles.priceRating}>
          <span className={styles.price}>USD {product.price}</span>
        </div>
      </div>
    </Link>
  );
}
