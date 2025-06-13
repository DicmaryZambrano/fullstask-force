import { NextResponse } from 'next/server';
import { slugify } from '@/lib/slugify'; // asegúrate que esto exporte correctamente
import { updateProductPhoto } from '@/database/database'; // asegúrate de tener esta función
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const productId = formData.get('id') as string;
  const category = formData.get('category') as string;
  const name = formData.get('name') as string;

  if (!file || !productId || !category || !name) {
    return NextResponse.json(
      { error: 'Missing file, id, category or name' },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const categorySlug = slugify(category);
    const nameSlug = slugify(name);

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `${nameSlug}-image.jpg`,
      folder: `/products/${categorySlug}/${nameSlug}`,
    });

    await updateProductPhoto(productId, uploadResponse.url);

    return NextResponse.json({ success: true, url: uploadResponse.url });
  } catch (err) {
    console.error('Image upload failed', err);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
