'use client';

import Image from 'next/image';
import { Product } from '@/types/types';
import styles from '@/styles/shopping/cartItem.module.css';
import Button from '@/components/actionButton'

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
      <Image
        src={product.image_url}
        alt={product.name}
        width={100}
        height={100}
      />
      <div>
        <h3>{product.name}</h3>
        <p>${Number(product.price).toFixed(2)}</p>
        <Button
          buttonText="Remove"
          onClick={handleRemove}
          variant="danger"
        />
      </div>
    </div>
  );
}
