import { NextRequest, NextResponse } from 'next/server';
import { deleteProduct } from '@/database/database';

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  const productId = segments.at(-1);

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    );
  }

  try {
    await deleteProduct(productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
