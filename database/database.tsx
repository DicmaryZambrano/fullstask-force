'use server';

import { neon } from '@neondatabase/serverless';
import {
  Product,
  ProductWithRatingAndSeller,
  ProductWithRating,
  User,
  UserProfile,
  ProductsListed,
  Category,
  FullProduct,
  CollectionList,
  ProductFromCollection,
  CollectionDetails,
} from '../types/types';

const URL = process.env.DATABASE_URL as string;

export async function getCategories() {
  const sql = neon(URL);

  try {
    const result = await sql`SELECT id, name FROM categories`;
    return result as { id: number; name: string }[];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

export async function getFeaturedCategories() {
  const sql = neon(URL);

  const result = await sql`SELECT id, name
      FROM categories
      ORDER BY RANDOM()
      LIMIT 3;`;

  return result as { id: number; name: string }[];
}

export async function getFeaturedProducts(category: string) {
  const sql = neon(URL);
  try {
    const result = await sql`
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.image_url 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE c.name = ${category}
      ORDER BY random()
      LIMIT 4;
    `;

    return result as {
      id: string;
      name: string;
      price: string;
      image_url: string;
    }[];
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    throw error;
  }
}

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductWithRating[]> {
  const sql = neon(URL);

  try {
    const result = await sql`
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.image_url,
        COALESCE(AVG(r.rating), 0) AS average_rating
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE p.category_id = ${categoryId}
      GROUP BY p.id;
    `;

    return result as ProductWithRating[];
  } catch (error) {
    console.error('Failed to fetch products by category with ratings:', error);
    throw error;
  }
}

export async function getHomeProductsByCategory(
  categoryId: string
): Promise<ProductWithRatingAndSeller[]> {
  const sql = neon(URL);

  try {
    const result = await sql`
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.image_url,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        u.first_name || ' ' || u.last_name AS seller_name
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      JOIN users u ON p.seller_id = u.id
      WHERE p.category_id = ${categoryId}
      GROUP BY p.id, u.first_name, u.last_name
      ORDER BY RANDOM()
      LIMIT 4;
    `;

    return result as ProductWithRatingAndSeller[];
  } catch (error) {
    console.error(
      'Failed to fetch featured products with ratings and seller:',
      error
    );
    throw error;
  }
}

export async function getProductById(productId: string) {
  const sql = neon(URL);

  try {
    const result = await sql`
      SELECT 
        id,
        name,
        description,
        price,
        image_url,
        created_at,
        updated_at
      FROM products
      WHERE id = ${productId};
    `;

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Failed to fetch product by ID:', error);
    throw error;
  }
}

export async function getFullProductById(
  productId: string
): Promise<FullProduct> {
  const sql = neon(URL);

  try {
    const result = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        p.category_id,
        p.seller_id,
        p.created_at,
        p.updated_at,
        u.first_name || ' ' || u.last_name AS seller_name,
        COALESCE(AVG(r.rating), 0) AS average_rating
      FROM products p
      JOIN users u ON p.seller_id = u.id
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE p.id = ${productId}
      GROUP BY p.id, u.first_name, u.last_name;
    `;

    return result[0] as FullProduct;
  } catch (error) {
    console.error('Failed to fetch product with seller and rating:', error);
    throw error;
  }
}

export async function getReviewsByProductId(productId: string) {
  const sql = neon(URL);

  try {
    const reviews = await sql`
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.created_at,
        u.first_name || ' ' || u.last_name AS user_name
      FROM reviews r
      JOIN users u ON r.customer_id = u.id
      WHERE r.product_id = ${productId}
      ORDER BY r.created_at DESC;
    `;

    const averageResult = await sql`
      SELECT COALESCE(AVG(rating), 0) AS average_rating
      FROM reviews
      WHERE product_id = ${productId};
    `;

    const average_rating = parseFloat(averageResult[0].average_rating);

    return {
      average_rating,
      reviews,
    };
  } catch (error) {
    console.error('Failed to fetch reviews with reviewer names:', error);
    throw error;
  }
}

export async function getProductsByIds(
  productIds: string[]
): Promise<Product[]> {
  if (productIds.length === 0) return [];

  const sql = neon(URL);

  try {
    const result = await sql`
      SELECT id, name, price, image_url, description, category_id
      FROM products
      WHERE id = ANY(${productIds});
    `;

    return result as Product[];
  } catch (error) {
    console.error('Failed to fetch cart products:', error);
    throw error;
  }
}

export async function createProduct(product: Product) {
  const sql = neon(URL);

  const { name, description, price, image_url, category_id, seller_id } =
    product;

  const id = crypto.randomUUID();
  const timestamp = new Date();

  try {
    await sql`
      INSERT INTO products (
        id,
        seller_id,
        category_id,
        name,
        description,
        price,
        image_url,
        created_at,
        updated_at
      ) VALUES (
        ${id},
        ${seller_id},
        ${category_id},
        ${name},
        ${description},
        ${price},
        ${image_url},
        ${timestamp},
        ${timestamp}
      );
    `;

    return { success: true, id };
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
}

export async function deleteProduct(productId: string) {
  const sql = neon(URL);

  try {
    await sql`
      DELETE FROM products
      WHERE id = ${productId};
    `;

    return { success: true };
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}

// Get a user from the database using the email as a search parameter

export async function getUserByEmail(email: string): Promise<User | null> {
  const sql = neon(URL);

  try {
    const result = await sql`SELECT * FROM public.users WHERE email = ${email}`;
    return (result[0] as User) ?? null;
  } catch (error) {
    console.error('Error looking for the user', error);
    throw error;
  }
}

export async function getUserById(id: string) {
  const sql = neon(URL);

  try {
    const result = await sql`SELECT id,
    email,
    first_name,
    last_name,
    phone_number,
    role,
    address,
    profile_picture_url

    FROM public.users WHERE id = ${id}`;
    return result[0] as UserProfile;
  } catch (error) {
    console.error('Error looking for the user', error);
    throw error;
  }
}

export async function updateUserById(data: {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
}) {
  const sql = neon(URL);
  const { id, first_name, last_name, phone_number, address } = data;

  try {
    const result = await sql`
      UPDATE public.users SET
        first_name = ${first_name},
        last_name = ${last_name},
        phone_number = ${phone_number},
        address = ${address}
      WHERE id = ${id}
      RETURNING id, email, first_name, last_name, phone_number, role, address, profile_picture_url
    `;

    return result[0] as UserProfile;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function updateUserPhoto(id: string, photoUrl: string) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql`
      UPDATE public.users
      SET profile_picture_url = ${photoUrl}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error updating user photo', error);
    throw error;
  }
}

export async function updateProductPhoto(id: string, image_url: string) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql`
      UPDATE public.products
      SET image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error updating product photo', error);
    throw error;
  }
}

export async function getProductsBySellerId(
  id: string
): Promise<ProductsListed[]> {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const result = await sql`
        SELECT p.id, p.name, p.price, p.updated_at, p.image_url
        FROM products p
        JOIN users u ON p.seller_id = u.id
        WHERE u.id = ${id}
        ORDER BY p.updated_at DESC
    `;

    return result as ProductsListed[];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function getCategoryDetailsById(id: string): Promise<Category> {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const result = await sql`
        SELECT id, name FROM categories c
        WHERE id = ${id}
        ORDER BY name ASC
    `;

    return result[0] as Category;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

export async function getCollectionsBySellerId(
  id: string
): Promise<CollectionList[]> {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const result = await sql`
      SELECT * FROM collections WHERE seller_id = ${id}
    `;

    return result as CollectionList[];
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    throw error;
  }
}

export async function getProductsByCollectionId(
  collection_id: string
): Promise<ProductFromCollection[]> {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const result = await sql`SELECT p.id, p.name, p.image_url
      FROM products p
      JOIN collection_products cp ON p.id = cp.product_id
      WHERE cp.collection_id = ${collection_id}
          `;

    return result as ProductFromCollection[];
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    throw error;
  }
}

export async function getCollectionDetailsById(
  collection_id: string
): Promise<CollectionDetails | null> {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const result = await sql`
      SELECT 
        id,
        name,
        description
      FROM collections 
      WHERE id = ${collection_id}
    `;

    return result[0] as CollectionDetails;
  } catch (error) {
    console.error('Failed to fetch collection details:', error);
    throw error;
  }
}

export async function deleteProductFromCollection(
  collection_id: string,
  product_id: string
) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      DELETE FROM collection_products WHERE collection_id = ${collection_id} AND product_id = ${product_id}
    `;
  } catch (error) {
    console.error('Failes to delete the product', error);
    throw error;
  }
}

export async function addProductToCollection(
  collection_id: string,
  product_id: string
) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql`
      INSERT INTO collection_products (collection_id, product_id)
      VALUES (${collection_id}, ${product_id})
      ON CONFLICT DO NOTHING
    `;
  } catch (error) {
    console.error('Failed to add product to collection', error);
    throw error;
  }
}

export async function updateCollection(
  id: string,
  name: string,
  description: string
) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql`
      UPDATE collections
      SET name = ${name}, description = ${description}
      WHERE id = ${id}
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to update collection:', error);
    throw error;
  }
}

export async function createCollectionInDb(
  sellerId: string,
  name: string,
  description: string
) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    await sql`
      INSERT INTO collections (id, seller_id, name, description)
      VALUES (${crypto.randomUUID()}, ${sellerId}, ${name}, ${description});
    `;
  } catch (error) {
    console.error('Failed to insert collection:', error);
    throw error;
  }
}

export async function deleteCollectionById(collectionId: string) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql`DELETE FROM collections WHERE id = ${collectionId}`;
  } catch (error) {
    console.error('Failed to delete collection:', error);
    throw error;
  }
}
