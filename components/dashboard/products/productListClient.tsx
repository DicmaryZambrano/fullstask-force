'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/actionButton';
import DeleteProductModal from './deleteProductsModal';
import { ProductsListed } from '@/types/types';
import { useRouter } from 'next/navigation';

type Props = {
  products: ProductsListed[];
};

export default function ProductsListClient({ products }: Props) {
  const [productToDelete, setProductToDelete] = useState<ProductsListed | null>(
    null
  );
  const router = useRouter();

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      });
      router.refresh(); // Refresca la lista
    } catch (err) {
      console.error('Failed to delete product', err);
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <Image
                src={product.image_url}
                alt={`${product.name}'s photo`}
                width={100}
                height={80}
              />
              <div>
                <h3>Name</h3>
                <p>{product.name}</p>
              </div>

              <div>
                <h3>Price Listed</h3>
                <p>{product.price}</p>
              </div>

              <div>
                <h3>Last Updated</h3>
                <p>{new Date(product.updated_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <Link href={`/products/${product.id}`}>
                <Button buttonText='See Product' type='button' />
              </Link>
              <Link href={`./products/edit/${product.id}`}>
                <Button buttonText='Edit' type='button' />
              </Link>

              <Button
                buttonText='Delete'
                type='button'
                onClick={() => setProductToDelete(product)}
              />
            </div>
          </li>
        ))}
      </ul>

      {productToDelete && (
        <DeleteProductModal
          product={productToDelete}
          onConfirm={handleDelete}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </>
  );
}
