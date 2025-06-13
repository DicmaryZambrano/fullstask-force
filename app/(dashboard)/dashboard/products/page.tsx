import ProductsList from '@/components/dashboard/products/productsList';
import Link from 'next/link';
import Button from '@/components/actionButton';

export default async function Page() {
  return (
    <div>
      <h1>Products Listed</h1>

      <Link href={'/dashboard/products/create'}>
        <Button buttonText='Create New Product' />
      </Link>

      <ProductsList />
    </div>
  );
}
