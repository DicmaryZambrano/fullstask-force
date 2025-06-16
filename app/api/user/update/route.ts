import { NextRequest, NextResponse } from 'next/server';
import { updateUserById } from '@/database/database';
import { userUpdateSchema } from '@/lib/zod';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = userUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          issues: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const updatedUser = await updateUserById(parseResult.data);

    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user in API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
