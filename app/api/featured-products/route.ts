import { getFeaturedCategories, getFeaturedProducts } from '@/database/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await getFeaturedCategories();

    const categoriesAndProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await getFeaturedProducts(category.name);
        return { ...category, products };
      })
    );

    return NextResponse.json(categoriesAndProducts);
  } catch (error) {
    return NextResponse.json({ error: `Failed to load featured products: ${error}` }, { status: 500 });
  }
}
