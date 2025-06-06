import styles from '@/styles/navBar/Navbar.module.css';
import Link from 'next/link';

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
              href={`/products?category=${encodeURIComponent(category.name)}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
