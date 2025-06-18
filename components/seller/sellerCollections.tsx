import { ProductWithRatingAndSeller } from '@/types/types';
import styles from '@/styles/seller/sellerCollections.module.css';
import ProductCardCategory from '@/components/products/ProductCardCategory';

interface CollectionWithProducts {
  id: string;
  name: string;
  description: string;
  products: ProductWithRatingAndSeller[];
}

export default function SellerCollections({ collections }: { collections: CollectionWithProducts[] }) {
  return (
    <section className={styles.section}>
      <h2 className="homeTitles">Collections</h2>
      {collections.map((collection) => (
        <div key={collection.id} className={styles.collection}>
          <h3 className={styles.title}>{collection.name}</h3>
          <p className={styles.description}>{collection.description}</p>
          <div className={styles.grid}>
            {collection.products.map((product) => (
              <ProductCardCategory
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}