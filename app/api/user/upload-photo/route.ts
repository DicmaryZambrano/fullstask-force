import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updateUserPhoto } from '@/database/database';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const session = await auth();
  const user = session!.user;

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `${user!.id}-profile.jpg`,
      folder: `/users/${user!.id}`,
    });

    await updateUserPhoto(user!.id as string, uploadResponse.url);

    return NextResponse.json({ success: true, url: uploadResponse.url });
  } catch (err) {
    console.error('Image upload failed', err);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
