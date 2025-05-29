import styles from "../styles/Footer.module.css";

export default function FootNav({ categories }: { categories: { id: number; name: string }[] }) {
  return (
    <div className={styles.column}>
      <h4>Categories</h4>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a href={`/products?category=${category.name}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
