import {
  getProductsByCollectionId,
  deleteProductFromCollection,
  addProductToCollection,
} from '@/database/database';
import Image from 'next/image';
import Button from '@/components/actionButton';
import { revalidatePath } from 'next/cache';
import AddProductToCollection from './addProductButton';

import btnStyles from '@/styles/dashboard/profile.module.css';
import styles from '@/styles/dashboard/collections/editCollections.module.css';

export default async function ProductsFromCollection({
  collectionId,
  sellerId,
}: {
  collectionId: string;
  sellerId: string;
}) {
  const products = await getProductsByCollectionId(collectionId);

  async function formAction(formData: FormData) {
    'use server';
    const productId = formData.get('productId') as string;

    if (!productId) return;

    await addProductToCollection(collectionId, productId);
    revalidatePath(`/dashboard/collections/edit/${collectionId}`);
  }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsMenu}>
        <h2>Products that belongs to this collection:</h2>
        <AddProductToCollection
          collectionId={collectionId}
          sellerId={sellerId}
          action={formAction}
        />
      </div>

      {products.length === 0 ? (
        <h3>This collection does not have products yet</h3>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} className={styles.productList}>
              <Image
                src={product.image_url}
                alt={`Image for ${product.name}`}
                width={80}
                height={65}
              />
              <div>
                <h3>Product Name</h3>
                <p>{product.name}</p>
              </div>
              <form
                action={async () => {
                  'use server';
                  await deleteProductFromCollection(collectionId, product.id);
                  revalidatePath(`/dashboard/collections/edit/${collectionId}`);
                }}
              >
                <Button
                  buttonText='Delete From Collection'
                  type='submit'
                  className={`${btnStyles.editButton} ${btnStyles.imageButton} ${styles.deleteButton}`}
                />
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
