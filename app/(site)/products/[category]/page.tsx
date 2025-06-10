'use client';
import { useEffect, useState } from 'react';
import { getCategories, getProductsByCategory } from '@/database/database';
import ProductCardCategory from '@/components/products/ProductCardCategory';
import FiltersSidebar from '@/components/products/FiltersSidebar';
import { ProductWithRating } from '@/objects/types';
import { slugify } from '@/lib/slugify';
import styles from '@/styles/products/CategoryPage.module.css';

function SkeletonLoader() {
  return (
    <div className={styles.skeletonContainer}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={styles.skeletonItem}></div>
      ))}
    </div>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', minRating: '', sortOrder: '' });
  const [products, setProducts] = useState<ProductWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryId = async () => {
      const resolvedParams = await params;
      const categories = await getCategories();
      const currentCategory = categories.find(c => slugify(c.name) === resolvedParams.category);
      setCategoryId(currentCategory ? String(currentCategory.id) : null);
    };
    fetchCategoryId();
  }, [params]);

  useEffect(() => {
    if (!categoryId) return;
    const fetchFilteredProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProductsByCategory(categoryId);
      const filtered = fetchedProducts
        .filter(p => (!filters.minPrice || p.price >= parseFloat(filters.minPrice)))
        .filter(p => (!filters.maxPrice || p.price <= parseFloat(filters.maxPrice)))
        .filter(p => (!filters.minRating || p.average_rating >= parseFloat(filters.minRating)));
      
      switch (filters.sortOrder) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          filtered.sort((a, b) => b.average_rating - a.average_rating);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
      
      setProducts(filtered);
      setLoading(false);
    };
    fetchFilteredProducts();
  }, [categoryId, filters]);

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <FiltersSidebar onFilterChange={setFilters} />
      </aside>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <section className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCardCategory product={product} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
