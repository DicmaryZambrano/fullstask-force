import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createProduct } from '@/database/database';
import ImageKit from 'imagekit';
import { slugify } from '@/lib/slugify';
import { getCategoryDetailsById } from '@/database/database';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const priceRaw = formData.get('price') as string;
  const categoryId = formData.get('category') as string;
  const file = formData.get('file') as File;

  const categoryDetails = await getCategoryDetailsById(categoryId);

  if (!name || !description || !priceRaw || !categoryId || !file) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const price = parseFloat(priceRaw);
  if (isNaN(price) || price <= 0) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const nameSlug = slugify(name);
    const categorySlug = slugify(categoryDetails.name);

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `${nameSlug}-image.jpg`,
      folder: `/products/${categorySlug}/${nameSlug}`,
    });

    const product = {
      id: '',
      seller_id: session.user.id,
      category_id: categoryId,
      name,
      description,
      price,
      image_url: uploadResponse.url,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await createProduct(product);

    return NextResponse.json({ success: true, productId: result.id });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
