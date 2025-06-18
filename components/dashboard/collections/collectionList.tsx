import {
  getCollectionsBySellerId,
  deleteCollectionById,
} from '@/database/database';
import { auth } from '@/auth';
import Link from 'next/link';
import Button from '@/components/actionButton';
import { revalidatePath } from 'next/cache';
import styles from '@/styles/dashboard/collections/collections.module.css';

export default async function CollectionList() {
  const session = await auth();
  const user = session!.user;

  const collections = await getCollectionsBySellerId(user!.id as string);

  return (
    <ul className={styles.ulFlex}>
      {collections.map((collection) => (
        <li key={collection.id} className={styles.productList}>
          <div>
            <h3>Collection Name</h3>
            <p>{collection.name}</p>
          </div>

          <div>
            <h3>Collection Description</h3>
            <p>{collection.description}</p>
          </div>

          <div className={styles.collectionBtns}>
            <Link href={`./collections/edit/${collection.id}`}>
              <Button
                buttonText='Edit'
                type='button'
                className={styles.editBtnHome}
              />
            </Link>

            <form
              action={async () => {
                'use server';
                await deleteCollectionById(collection.id);
                revalidatePath('/dashboard/collections');
              }}
            >
              <Button
                buttonText='Delete'
                type='submit'
                className={styles.deleteBtnHome}
              />
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
