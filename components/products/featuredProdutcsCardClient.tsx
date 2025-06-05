'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/products/featuredCard.module.css';
import {Product, CategoryWithProducts} from '@/objects/types'

export default function FeaturedCardClient() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/featured-products');
      const data = await res.json();
      setCategories(data);
    }

    fetchData();
  }, []);

  return (
    <div className={`container ${styles.cardContainer}`}>
      {categories.map((category) => (
        <div key={category.id} className={styles.featuredCard}>
          <h2 className={`homeTitles ${styles.featuredTitle}`}>{category.name}</h2>
          <div className={styles.productGrid}>
            {category.products.map((product: Product) => (
              <article key={product.id}>
                <Link href="#">
                  <Image
                    src={product.image_url}
                    alt={`Image of ${product.name}`}
                    width={150}
                    height={150}
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
