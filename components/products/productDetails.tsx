import { getFullProductById, getReviewsByProductId } from '@/database/database';
import StarRating from './starRating';
import Link from 'next/link';
import AddToCartButton from './addToCartButton';
import AddToFavoritesButton from './addToFavoritesButton';
import ReviewForm from './reviewForm';
import DeleteReviewButton from './deleteReviewButton';
import Image from 'next/image';
import styles from '@/styles/products/productDetails.module.css';

type ProductDetailsProps = {
  productId: string;
  currentUserId: string | null;
};

export default async function ProductDetails({ productId, currentUserId }: ProductDetailsProps) {
  const product = await getFullProductById(productId);
  const { reviews, average_rating } = await getReviewsByProductId(productId);
  const userReview = currentUserId
  ? reviews.find((review) => review.customer_id === currentUserId)
  : null;

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className={styles.productGrid}>
      <section className={styles.imageSection}>
        <div className={styles['product-image']}>
          <Image src={product.image_url} alt={product.name} width={150} height={150} />
          <AddToFavoritesButton productId={product.id} />
        </div>
      </section>

      <section className={styles.details}>
        <div className={styles['product-summary']}>
          <p className={styles.price}>{Number(product.price).toFixed(2)} USD</p>
          <h2>{product.name}</h2>
          <AddToCartButton productId={product.id} />
        </div>

        <details className={styles['product-details']}>
          <summary>Item Details</summary>
          <p>{product.description}</p>
        </details>

        <details className={styles['product-details']}>
          <summary>Meet your seller</summary>
          <p>{product.seller_name} — <Link href={`/seller/${product.seller_id}`}>View profile</Link></p>
        </details>
      </section>

      <section className={styles.reviews}>
        <div className={styles['reviews-title']}>
          <p>Seller has {reviews.length} reviews <StarRating rating={average_rating} /></p>
        </div>
        {currentUserId && !userReview && (
          <section>
            <h3>Leave a Review</h3>
            <ReviewForm productId={product.id} />
          </section>
        )}
        {reviews.map((review) => (
          <div key={review.id} className={styles['review-box']}>
            <StarRating rating={review.rating} />
            <p>{review.comment}</p>
            <small>{review.user_name} — {new Date(review.created_at).toLocaleDateString()}</small>

            {currentUserId && review.customer_id === currentUserId && (
              <DeleteReviewButton reviewId={review.id} />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
