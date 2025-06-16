import CreateProductForm from '@/components/dashboard/products/createProductForm';
import styles from '@/styles/dashboard/listings/createProduct.module.css';

export default function CreateProduct() {
  return (
    <div className={styles.createContainer}>
      <h1 className={styles.h1}>Create a new Product</h1>
      <CreateProductForm />;
    </div>
  );
}
