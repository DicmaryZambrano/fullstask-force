// app/products/[category]/page.tsx
import { getCategories, getProductsByCategory } from '@/database/database';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/products/productCard';
import FiltersSidebar from '@/components/products/filtersSidebar';
import { ProductWithRating } from '@/objects/types';
import { slugify } from '@/lib/slugify';
import styles from '@/styles/products/CategoryPage.module.css';

interface Props {
  params: Promise<{ category: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CategoryPage(props: Props) {
  const params = await props.params;

  const categories = await getCategories();

  const currentCategory = categories.find(
    (c) => slugify(c.name) === params.category
  );

  if (!currentCategory) return notFound();

  const products = await getProductsByCategory(String(currentCategory.id));

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <FiltersSidebar />
      </aside>
      <section className={styles.grid}>
        {products.map(product => (
          <div key={product.id} className={styles.cardWrapper}>
            <ProductCard product={product} />
          </div>
        ))}
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({
    category: slugify(c.name),
  }));
}
