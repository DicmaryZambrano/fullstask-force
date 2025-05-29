'use server';
import { neon } from '@neondatabase/serverless';

const URL = process.env.DATABASE_URL as string;

export async function getCategories() {
  const sql = neon(URL);
  const result = await sql`SELECT id, name FROM categories`;

  // Explicitly tell TypeScript that result is an array of { id: number; name: string }
  return result as { id: number; name: string }[];
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
