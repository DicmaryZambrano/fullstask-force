import styles from '@/styles/Footer.module.css';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';

export default function FootNav({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  return (
    <div className={styles.column}>
      <h4>Categories</h4>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/products/category/${slugify(category.name)}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
