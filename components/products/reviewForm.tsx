'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/products/reviewForm.module.css';
import Button from '@/components/actionButton';

type Props = {
  productId: string;
};

export default function ReviewForm({ productId }: Props) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('rating', rating.toString());
    formData.append('comment', comment);

    try {
      const res = await fetch('/api/review/create', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Review creation failed');
      setComment('');
      setRating(5);
      router.refresh();
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="rating">Rating</label>
      <select
        id="rating"
        name="rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
      >
        {[5, 4, 3, 2, 1, 0].map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={4}
      />

      <Button
        type="submit"
        buttonText={submitting ? 'Submitting...' : 'Post Review'}
        disabled={submitting}
      />
    </form>
  );
}
