'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/actionButton';

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setIsInCart(cart.includes(productId));
  }, [productId]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (!cart.includes(productId)) {
      const updatedCart = [...cart, productId];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setIsInCart(true);
      console.log(`Product ${productId} added to cart.`);
    }
  };

  return (
    <Button
      buttonText={isInCart ? 'Added' : 'Add to cart'}
      onClick={handleAddToCart}
      disabled={isInCart}
      aria-label={isInCart ? 'Added to cart' : 'Add to cart'}
    />
  );
}
