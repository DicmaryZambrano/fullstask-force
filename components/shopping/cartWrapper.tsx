'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/types/types';
import CartItem from './cartItem';
import CartSummary from './cartSummary';
import styles from '@/styles/shopping/cartLayout.module.css';

export default function CartWrapper() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart.length > 0) {
      fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: cart }),
      })
        .then((res) => res.json())
        .then(setCartProducts)
        .catch(console.error);
    } else {
      setCartProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = (id: string) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter((itemId: string) => itemId !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    fetchProducts();
  };

  return (
    <div className={styles.cartGrid}>
      <section className={styles['cart-items']}>
        <h2>Your Items</h2>
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>

      <CartSummary products={cartProducts} className={styles['cart-summary']} />
    </div>
  );
}
