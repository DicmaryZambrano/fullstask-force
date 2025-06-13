'use server';
import { neon } from '@neondatabase/serverless';
import {
  Product,
  ProductWithRatingAndSeller,
  ProductWithRating,
  User,
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
/* Get all products by category with their average ratings */
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

/* Gets a set of 4 products with the average reviews of that product and the name of the seller*/
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

/* Gets basic product information by id*/
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

/* Get full product details */
export async function getFullProductById(productId: string) {
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

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Failed to fetch product with seller and rating:', error);
    throw error;
  }
}

/* Get Reviews by Product Id */
export async function getReviewsByProductId(productId: string) {
  const sql = neon(URL);

  try {
    // Fetch all reviews + reviewer name
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

    // Calculate the average rating
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

/* Get a series of products */
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

    return result as Product[]; // <--- type assertion
  } catch (error) {
    console.error('Failed to fetch cart products:', error);
    throw error;
  }
}

/* CRUD for Products */
export async function createProduct(product: Product) {
  const sql = neon(URL);

  const {
    name,
    description,
    price,
    image_url,
    category_id,
    seller_id = '42c43983-618a-4ceb-a423-aa570ff756ea', // default placeholder
  } = product;

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

/* Delete Product */
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

export async function getUserById(id: string): Promise<User> {
  const sql = neon(URL);

  try {
    const result = await sql`SELECT * FROM public.users WHERE id = ${id}`;
    return result[0] as User;
  } catch (error) {
    console.error('Error looking for the user', error);
    throw error;
  }
}
