import styles from '@/styles/navBar/Navbar.module.css';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';


export default function NavBar({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  return (
    <nav className={styles.links}>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/products/${slugify(category.name)}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
