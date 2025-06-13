import { auth } from '@/auth';
import { getProductsBySellerId } from '@/database/database';
import ProductsListClient from './productListClient';

export default async function ProductsList() {
  const session = await auth();
  const products = await getProductsBySellerId(session!.user!.id as string);
  return <ProductsListClient products={products} />;
}
