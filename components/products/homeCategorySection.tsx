// components/HomeCategorySection.tsx
'use client';

import styles from '@/styles/home/homeCategorySection.module.css';
import cardStyles from '@/styles/products/CategoryPage.module.css';
// import ProductCard from './productCard';
import ProductCardCategory from './ProductCardCategory';
import Link from 'next/link';
import { ProductWithRatingAndSeller } from '@/types/types';
import { slugify } from '@/lib/slugify';

export default function HomeCategorySection({
  categoryName,
  products,
}: {
  categoryName: string;
  products: ProductWithRatingAndSeller[];
}) {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.category}>
        <h2 className={styles.h2}>{categoryName}</h2>
        <Link
          href={`/products/category/${slugify(categoryName)}`}
          className={styles.seeAllLink}
        >
          See all
        </Link>
      </div>
      <div className={styles.ProductFlex}>
        {products.map((product) => (
          <div key={product.id} className={cardStyles.cardWrapper}>
            <ProductCardCategory product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
