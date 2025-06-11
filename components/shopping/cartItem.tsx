'use client';

import Image from 'next/image';
import { Product } from '@/objects/types';
import styles from '@/styles/shopping/cartItem.module.css';

interface CartItemProps {
  product: Product;
  onRemove: (id: string) => void;
}

export default function CartItem({ product, onRemove }: CartItemProps) {
  const handleRemove = () => {
    onRemove(product.id!);
  };

  return (
    <div className={styles['cart-product']}>
      <Image src={product.image_url} alt={product.name} width={100} height={100} />
      <div>
        <h3>{product.name}</h3>
        <p>${Number(product.price).toFixed(2)}</p>
        <button className={styles['remove-btn']} onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
