import ProductDetails from '@/components/products/productDetails';
import { auth } from '@/auth';

export const metadata = {
  title: 'Product Details - Handcrafted Haven',
  description: 'Marketplace for handmade treasures, Explore product details',
};

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const session = await auth();
  const userId = session?.user?.id ?? null;

  return (
    <div className="container">
      <h1 className="homeTitles">Product Details</h1>
      <ProductDetails productId={id} currentUserId={userId} />
    </div>
  );
}