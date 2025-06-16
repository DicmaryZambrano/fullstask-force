import { NextResponse } from 'next/server';
import { getProductsBySellerId } from '@/database/database';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sellerId = searchParams.get('sellerId');

  if (!sellerId) {
    return NextResponse.json({ error: 'Missing sellerId' }, { status: 400 });
  }

  const products = await getProductsBySellerId(sellerId);
  return NextResponse.json(products);
}
