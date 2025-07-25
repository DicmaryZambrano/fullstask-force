import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { ProductWithRatingAndSeller } from '@/types/types';
import styles from '@/styles/products/productCardCategory.module.css';

export default function ProductCardCategory({
  product,
}: {
  product: ProductWithRatingAndSeller;
}) {
  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <p className={styles.title}>{product.name}</p>
        <p className={styles.seller}>{product.seller_name}</p>
        <div className={styles.priceRating}>
          <span className={styles.price}>USD {product.price}</span>
          <span className={styles.rating}>
            <div>{Number(product.average_rating).toFixed(1)}</div>
            <FaStar />
          </span>
        </div>
      </div>
    </Link>
  );
}
