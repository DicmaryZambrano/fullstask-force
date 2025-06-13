import { NextRequest, NextResponse } from 'next/server';
import { deleteProduct } from '@/database/database';

export async function DELETE(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  const { productId } = context.params;

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
