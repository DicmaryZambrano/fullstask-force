'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/products/addToFavorites.module.css';

export default function AddToFavoritesButton({ productId }: { productId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(productId));
  }, [productId]);

  const handleToggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(productId)) {
      favorites = favorites.filter((id: string) => id !== productId);
      setIsFavorite(false);
    } else {
      favorites.push(productId);
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log(`Favorites updated: ${favorites}`);
  };

  return (
    <button
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      ♥
    </button>
  );
}
