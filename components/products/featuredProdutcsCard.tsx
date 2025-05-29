import {
  getFeaturedCategories,
  getFeaturedProducts,
} from '@/database/database';
import Image from 'next/image';
import styles from '@/styles/products/featuredCard.module.css';
import Link from 'next/link';

export default async function FeaturedCard() {
  const featuredCategories = await getFeaturedCategories();

  const categoriesAndProducts = await Promise.all(
    featuredCategories.map(async (category) => {
      const products = await getFeaturedProducts(category.name);
      return { ...category, products };
    })
  );

  return (
    <div className={`container ${styles.cardContainer}`}>
      {categoriesAndProducts.map((category) => (
        <div key={category.id} className={styles.featuredCard}>
          <h2 className={`homeTitles ${styles.featuredTitle}`}>
            {category.name}
          </h2>
          <div className={styles.productGrid}>
            {/* NOTE - Logic for fetching the database and show 4 random products from the category, it will be implemented once the database is seeded */}

            {/* {category.products.map((product) => (
              <article key={product.id}>
                <Link href={'#'}>
                  <Image
                    src={product.image_url}
                    alt={`Image pf ${product.name}`}
                    width={500}
                    height={300}
                  />
                  <p>{product.name}</p>
                </Link>
              </article>
            ))} */}

            <article>
              <Link href={'#'}>
                <Image
                  src='/placeHolder-Images/plcholder1.png'
                  alt='Place Holder'
                  width={131}
                  height={101}
                />
                <p>PlaceHolder Pro 1</p>
              </Link>
            </article>

            <article>
              <Link href={'#'}>
                <Image
                  src='/placeHolder-Images/plcholder2.png'
                  alt='Place Holder'
                  width={131}
                  height={101}
                />

                <p>PlaceHolder Pro 2</p>
              </Link>
            </article>

            <article>
              <Link href={'#'}>
                <Image
                  src='/placeHolder-Images/plcholder3.png'
                  alt='Place Holder'
                  width={131}
                  height={101}
                />
                <p>PlaceHolder Pro 3</p>
              </Link>
            </article>

            <article>
              <Link href={'#'}>
                <Image
                  src='/placeHolder-Images/plcholder4.png'
                  alt='Place Holder'
                  width={131}
                  height={101}
                />
                <p>PlaceHolder Pro 4</p>
              </Link>
            </article>
          </div>
        </div>
      ))}
    </div>
  );
}
