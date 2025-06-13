import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, name, price, description, category } = body;

    if (!id || !name || !price || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await sql`
      UPDATE products
      SET
        name = ${name},
        price = ${price},
        description = ${description},
        category_id = ${category},
        updated_at = NOW()
      WHERE id = ${id};
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
