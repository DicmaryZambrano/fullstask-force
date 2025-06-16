'use client';

import { useState, useEffect, useTransition } from 'react';
import Button from '@/components/actionButton';
import Image from 'next/image';
import modalStyles from '@/styles/dashboard/modal.module.css';

type Product = {
  id: string;
  name: string;
  image_url: string;
};

type Props = {
  collectionId: string;
  sellerId: string;
  action: (formData: FormData) => void;
};

export default function AddProductToCollection({
  collectionId,
  sellerId,
  action,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/products/by-seller?sellerId=${sellerId}`);
      const data = await res.json();
      setProducts(data);
    }
    if (showModal) fetchProducts();
  }, [showModal, sellerId]);

  const handleAdd = (productId: string) => {
    const formData = new FormData();
    formData.append('collectionId', collectionId);
    formData.append('productId', productId);
    startTransition(() => action(formData));
    setShowModal(false);
  };

  return (
    <>
      <Button buttonText='Add Products' onClick={() => setShowModal(true)} />
      {showModal && (
        <div className={modalStyles.modalBackdrop}>
          <div
            className={`${modalStyles.modalContent} ${modalStyles.collectionModal}`}
          >
            <div className={modalStyles.collectionMenu}>
              <h3>Select a product to add:</h3>
              <Button buttonText='Close' onClick={() => setShowModal(false)} />
            </div>

            <ul className={modalStyles.productsGrid}>
              {products.map((p) => (
                <li key={p.id} className={modalStyles.product}>
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    width={100}
                    height={100}
                  />
                  <span>{p.name}</span>
                  <button onClick={() => handleAdd(p.id)} disabled={isPending}>
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
