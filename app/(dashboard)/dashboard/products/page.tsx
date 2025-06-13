import ProductsList from '@/components/dashboard/products/productsList';

export default async function Page() {
  return (
    <div>
      <h1>Products Listed</h1>

      <ProductsList />
    </div>
  );
}
