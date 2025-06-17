'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/actionButton';

export default function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');
      router.refresh();
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Button
      buttonText={deleting ? 'Deleting...' : 'Delete Review'}
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      variant="danger"
    />
  );
}
