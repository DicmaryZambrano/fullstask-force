import { NextResponse } from 'next/server';
import { updateCollection } from '@/database/database';
import { collectionSchema } from '@/lib/zod';

export async function PUT(req: Request) {
  const body = await req.json();

  const parsed = collectionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.format() },
      { status: 400 }
    );
  }

  const { id, name, description } = parsed.data;

  try {
    await updateCollection(id, name, description);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to update collection', err },
      { status: 500 }
    );
  }
}
