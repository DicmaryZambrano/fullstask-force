import ProductsList from '@/components/dashboard/products/productsList';
import Link from 'next/link';
import Button from '@/components/actionButton';
import styles from '@/styles/dashboard/listings/home.module.css';

export default async function Page() {
  return (
    <div className={styles.listingContainer}>
      <div className={styles.productsMenu}>
        <h1 className={styles.h1}>Products Listed</h1>

        <Link href={'/dashboard/products/create'}>
          <Button buttonText='Create New Product' />
        </Link>
      </div>
      <ProductsList />
    </div>
  );
}
