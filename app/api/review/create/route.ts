import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/auth';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const productId = formData.get('productId') as string;
  const rating = parseInt(formData.get('rating') as string);
  const comment = formData.get('comment') as string;

  if (!productId || isNaN(rating) || comment == null) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO reviews (product_id, customer_id, rating, comment)
      VALUES (${productId}, ${user.id}, ${rating}, ${comment})
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}