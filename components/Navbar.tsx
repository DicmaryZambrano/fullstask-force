import styles from "../styles/Navbar.module.css";

export default function NavBar({ categories }: { categories: { id: number; name: string }[] }) {
  return (
    <div>
      <hr className={styles.gray}/>
      <nav className={styles.links}>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <a href={`/products?category=${category.name}`}>{category.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <hr className={styles.gray}/>
    </div>
  );
}
