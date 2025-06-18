'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/products/featuredCard.module.css';
import { Product, CategoryWithProducts } from '@/types/types';

export default function FeaturedCardClient() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/featured-products');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={`container ${styles.cardContainer}`}>
      {isLoading
        ? [1, 2, 3].map((index) => (
            <div key={index} className={styles.featuredCard}>
              { }
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonProductGrid}>
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={styles.skeletonItem}>
                    <div className={styles.skeletonProduct} />
                    <div className={styles.skeletonText} />
                  </div>
                ))}
              </div>
            </div>
          ))
        : categories.map((category) => (
            <div key={category.id} className={styles.featuredCard}>
              <h2 className={`homeTitles ${styles.featuredTitle}`}>
                {category.name}
              </h2>
              <div className={styles.productGrid}>
                {category.products.map((product: Product) => (
                  <article key={product.id}>
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image_url}
                        alt={`Image of ${product.name}`}
                        width={131}
                        height={101}
                      />
                      <p>{product.name}</p>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
}