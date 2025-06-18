import {
  getUserById,
  getFullSellerProductData,
  getSellerCollectionsWithProducts,
} from '@/database/database';

import SellerInfo from '@/components/seller/sellerInfo';
import SellerProductList from '@/components/seller/sellerProductList';
import SellerCollections from '@/components/seller/sellerCollections';

export default async function SellerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [seller, products, collectionsWithProducts] = await Promise.all([
    getUserById(id),
    getFullSellerProductData(id),
    getSellerCollectionsWithProducts(id),
  ]);

  if (!seller) return <h2>Seller not found</h2>;

  return (
    <div>
      <SellerInfo {...seller} />

      <hr />

      {collectionsWithProducts.length > 0 && (
        <>
          <hr />
          <SellerCollections collections={collectionsWithProducts} />
        </>
      )}

      <SellerProductList products={products} />

    </div>
  );
}