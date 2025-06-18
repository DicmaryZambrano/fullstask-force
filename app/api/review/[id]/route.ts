import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { auth } from '@/auth';

const sql = neon(process.env.DATABASE_URL!);

export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> } // just an object, no Promise
) {
  const session = await auth();
  const user = session?.user;
  const params = await props.params;
  const review_id = params.id;

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const review = await sql`
      SELECT * FROM reviews WHERE id = ${review_id}
    `;

    if (!review[0] || review[0].customer_id !== user.id) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await sql`DELETE FROM reviews WHERE id = ${review_id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting review:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
