import ProductsFromCollection from '@/components/dashboard/collections/productsFromCollection';
import EditCollectionForm from '@/components/dashboard/collections/editForm';
import { getCollectionDetailsById } from '@/database/database';
import { auth } from '@/auth';
import styles from '@/styles/dashboard/collections/collections.module.css';

export default async function EditCollections({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const user = session!.user;

  const collection_id = (await params).id;
  const collectionDetails = await getCollectionDetailsById(collection_id);

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.h1}>Edit the Collection</h1>
      <EditCollectionForm
        id={collectionDetails!.id as string}
        name={collectionDetails!.name as string}
        description={collectionDetails!.description as string}
      />
      <ProductsFromCollection
        collectionId={collection_id}
        sellerId={user!.id as string}
      />
    </div>
  );
}
