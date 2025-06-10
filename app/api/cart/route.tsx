// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProductsByIds } from '@/database/database';

export async function POST(req: NextRequest) {
  const { ids } = await req.json();

  if (!Array.isArray(ids)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const products = await getProductsByIds(ids);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch products: ${error}` }, { status: 500 });
  }
}
