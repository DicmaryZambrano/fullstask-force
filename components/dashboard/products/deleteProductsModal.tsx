'use client';
import Button from '@/components/actionButton';
import { ProductsListed } from '@/types/types';
import styles from '@/styles/dashboard/modal.module.css';

type DeleteProductModalProps = {
  product: ProductsListed;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteProductModal({
  product,
  onConfirm,
  onCancel,
}: DeleteProductModalProps) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Are you sure?</h2>
        <p>
          You are about to delete <strong>{product.name}</strong>.
        </p>
        <p>This action cannot be undone.</p>
        <div>
          <Button buttonText='Cancel' onClick={onCancel} type='button' />
          <Button buttonText='Delete' onClick={onConfirm} type='button' />
        </div>
      </div>
    </div>
  );
}
