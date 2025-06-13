import { getFullProductById } from '@/database/database';
import { getCategoryDetailsById } from '@/database/database';
import EditProductForm from '@/components/dashboard/products/editProductsForm';
import PictureUploader from '@/components/dashboard/pictureUploader';

export default async function EditProduct(props: {
  params: Promise<{ product_id: string }>;
}) {
  const id = (await props.params).product_id;
  const productDetails = await getFullProductById(id);

  const category = await getCategoryDetailsById(productDetails!.category_id);

  console.log(productDetails);
  console.log(category);

  return (
    <>
      <div>
        <h1>Edit Product Details</h1>
        <PictureUploader
          id={id}
          picture_url={productDetails.image_url}
          name={productDetails.name}
          type='product'
          category={category.name}
        />
        <EditProductForm productDetails={productDetails} category={category} />
      </div>
    </>
  );
}
