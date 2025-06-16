import CreateCollectionForm from '@/components/dashboard/collections/createCollection';
import styles from '@/styles/dashboard/collections/collections.module.css';

export default function CreateCollection() {
  return (
    <div className={styles.editContainer}>
      <h1 className={styles.h1}>Create a New Collection</h1>
      <CreateCollectionForm />
    </div>
  );
}
