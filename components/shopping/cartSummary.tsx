'use client';

import { Product } from '@/types/types';
import { useMemo } from 'react';
import Link from 'next/link';
import styles from '@/styles/shopping/cartSummary.module.css';
import Button from '@/components/actionButton'

interface CartSummaryProps {
  products: Product[];
  className?: string;
}

export default function CartSummary({
  products,
  className = '',
}: CartSummaryProps) {
  const total = useMemo(() => {
    return products.reduce((sum, product) => sum + Number(product.price), 0);
  }, [products]);

  return (
    <aside className={className}>
      <div className={styles['summary-box']}>
        <p>
          <strong>Total:</strong> US${total.toFixed(2)}
        </p>
        <Link href='/checkout'>
          <Button
            buttonText="Proceed to Pay"
            disabled={products.length === 0}
          />
        </Link>
      </div>
    </aside>
  );
}
