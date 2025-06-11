'use client';

import { Product } from '@/types/types';
import { useMemo } from 'react';
import Link from 'next/link';
import styles from '@/styles/shopping/cartSummary.module.css';

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
          <button
            disabled={products.length === 0}
            className={styles['btn-pay']}
          >
            Proceed to Pay
          </button>
        </Link>
      </div>
    </aside>
  );
}
