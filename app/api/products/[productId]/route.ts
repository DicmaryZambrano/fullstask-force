import { NextRequest, NextResponse } from 'next/server';
import { deleteProduct } from '@/database/database';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = await params;

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
    console.error('API delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
