// components/HomeCategorySection.tsx
'use client';

import styles from '@/styles/home/homeCategorySection.module.css';
import ProductCard from './productCard';
import Link from 'next/link';
import { ProductWithRating } from '@/objects/types';

export default function HomeCategorySection({
  categoryName,
  products,
}: {
  categoryName: string;
  products: ProductWithRating[];
}) {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.category}>
        <h2 className={styles.h2}>{categoryName}</h2>
        <Link
          href={`/products?category=${categoryName}`}
          className={styles.seeAllLink}
        >
          See all
        </Link>
      </div>
      <div className={styles.ProductFlex}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
