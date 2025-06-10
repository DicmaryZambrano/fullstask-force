/*import FeaturedCard from '@/components/products/featuredProdutcsCard';*/
import FeaturedCardClient from '@/components/products/featuredProdutcsCardClient';
import { getCategories, getHomeProductsByCategory } from '@/database/database';
import HomeCategorySection from '@/components/products/homeCategorySection';
import styles from '@/styles/home/homeCategorySection.module.css';

export default async function Page() {
  const categories = await getCategories();

  const categoriesWithProducts = await Promise.all(
    categories.map(async (category) => {
      const products = await getHomeProductsByCategory(category.id.toString());
      return { ...category, products };
    })
  );

  return (
    <main>
      <h1 className='homeTitles'>Featured Products</h1>
      {/*<FeaturedCard />*/}
      <FeaturedCardClient />
      <hr className={styles.hrHome}></hr>
      {categoriesWithProducts.map((category) => (
        <HomeCategorySection
          key={category.id}
          categoryName={category.name}
          products={category.products}
        />
      ))}
    </main>
  );
}
