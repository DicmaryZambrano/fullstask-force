import { getFullProductById } from '@/database/database';
import { getCategoryDetailsById } from '@/database/database';
import EditProductForm from '@/components/dashboard/products/editProductsForm';
import PictureUploader from '@/components/dashboard/pictureUploader';

import styles from '@/styles/dashboard/profile.module.css';

export default async function EditProduct(props: {
  params: Promise<{ product_id: string }>;
}) {
  const id = (await props.params).product_id;
  const productDetails = await getFullProductById(id);

  const category = await getCategoryDetailsById(productDetails!.category_id);

  console.log(productDetails);
  console.log(category);

  return (
    <div className={styles.profile}>
      <h1 className={styles.title}>Edit Product Details</h1>

      <div className={styles.profileDisplay}>
        <PictureUploader
          id={id}
          picture_url={productDetails.image_url}
          name={productDetails.name}
          type='product'
          category={category.name}
        />

        <div className={styles.profileSettings}>
          <EditProductForm
            productDetails={productDetails}
            category={category}
          />
        </div>
      </div>
    </div>
  );
}
