import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { collectionSchemaCreate } from '@/lib/zod';
import { createCollectionInDb } from '@/database/database';

export async function POST(req: Request) {
  const session = await auth();
  const user = session?.user;
  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const result = collectionSchemaCreate.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation error', details: result.error },
      { status: 400 }
    );
  }

  try {
    await createCollectionInDb(
      user!.id as string,
      result.data.name,
      result.data.description
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB Error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
