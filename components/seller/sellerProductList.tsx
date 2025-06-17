import ProductCardCategory from '@/components/products/ProductCardCategory';
import { ProductWithRatingAndSeller } from '@/types/types';
import styles from '@/styles/seller/sellerProductList.module.css';

export default function SellerProductList({ products }: { products: ProductWithRatingAndSeller[] }) {
  return (
    <section className={styles.section}>
      <h2 className="homeTitles">All My Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCardCategory key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
