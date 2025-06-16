'use client';

import { useState } from 'react';
import { collectionSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import Button from '@/components/actionButton';
import styles from '@/styles/dashboard/collections/collections.module.css';
import formStyles from '@/styles/dashboard/profile.module.css';

export default function CreateCollectionForm() {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 HandleSubmit called');

    const result = collectionSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof formData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await fetch('/api/collections/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Server error');
      router.push('/dashboard/collections');
    } catch (err) {
      console.error('Failed to create collection', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='off'
      className={formStyles.editForm}
    >
      <label htmlFor='name'>Collection Name</label>
      <input
        id='name'
        name='name'
        type='text'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        name='description'
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      {errors.description && (
        <p style={{ color: 'red' }}>{errors.description}</p>
      )}

      <Button
        buttonText='Create Collection'
        type='submit'
        className={`${styles.createCollectBtn} ${formStyles.editButton} ${formStyles.imageButton}  `}
      />
    </form>
  );
}
