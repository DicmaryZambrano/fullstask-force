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
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>{categoryName}</h2>
        <Link href={`/products?category=${categoryName}`}>See all</Link>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
