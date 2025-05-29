"use server";
import { neon } from "@neondatabase/serverless";

export async function getCategories() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const result = await sql`SELECT id, name FROM categories`;

  // Explicitly tell TypeScript that result is an array of { id: number; name: string }
  return result as { id: number; name: string }[];
}
