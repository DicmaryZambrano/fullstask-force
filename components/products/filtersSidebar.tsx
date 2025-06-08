'use client';
import { useState } from 'react';
import styles from '@/styles/products/FiltersSidebar.module.css';

export default function FiltersSidebar({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const applyFilters = () => {
    onFilterChange({ minPrice, maxPrice, minRating, sortOrder });
  };

  return (
    <aside className={styles.wrapper}>
      <h2 className={styles.title}>Filters</h2>

      <div className={styles.field}>
        <label htmlFor="minPrice" className={styles.label}>Price Range</label>
        <div className={styles.flexRow}>
          <input
            id="minPrice"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={styles.input}
          />
          <input
            id="maxPrice"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="minRating" className={styles.label}>Minimum Rating</label>
        <select
          id="minRating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className={styles.select}
        >
          <option value="">Any rating</option>
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>
              {rating}★+
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="sortOrder" className={styles.label}>Sort By</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.select}
        >
          <option value="">Default order</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="name-asc">Name: A→Z</option>
          <option value="name-desc">Name: Z→A</option>
        </select>
      </div>

      <button onClick={applyFilters} className={styles.button}>
        Apply Filters
      </button>
    </aside>
  );
}
