import { auth } from '@/auth';
import { getProductsBySellerId } from '@/database/database';
import Image from 'next/image';
import Button from '@/components/actionButton';
import Link from 'next/link';

export default async function ProductsList() {
  const session = await auth();
  const products = await getProductsBySellerId(session!.user!.id as string);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <div>
            <Image
              src={product.image_url}
              alt={`${product.name}'s photo`}
              width={100}
              height={80}
            />
            <div>
              <h3>Name</h3>
              <p>{product.name}</p>
            </div>

            <div>
              <h3>Last Updated</h3>
              <p>{new Date(product.updated_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <Link href={`/products/${product.id}`}>
              <Button buttonText='See Product' type='button' />
            </Link>
            <Link href={`./products/edit/${product.id}`}>
              <Button buttonText='Edit' type='button' />
            </Link>

            <Button buttonText='Delete' type='button' />
          </div>
        </li>
      ))}
    </ul>
  );
}
