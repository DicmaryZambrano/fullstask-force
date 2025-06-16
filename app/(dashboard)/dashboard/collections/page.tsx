import CollectionList from '@/components/dashboard/collections/collectionList';
import Button from '@/components/actionButton';
import Link from 'next/link';
import styles from '@/styles/dashboard/collections/collections.module.css';

export default function Page() {
  return (
    <div className={` ${styles.editContainer}`}>
      <div className={`${styles.collectionContainer} ${styles.productsMenu}`}>
        <h1 className={styles.h1}>Seller Collections</h1>
        <Link href={'/dashboard/collections/create'}>
          <Button buttonText='Add new' />
        </Link>
      </div>
      <CollectionList />
    </div>
  );
}
