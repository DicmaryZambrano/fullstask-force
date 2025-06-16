'use client';

import { useState } from 'react';
import Button from '@/components/actionButton';
import { collectionSchema } from '@/lib/zod';
import formStyles from '@/styles/dashboard/profile.module.css';
import { useRouter } from 'next/navigation';

type collectionDetails = {
  id: string;
  name: string;
  description: string;
};

export default function EditCollectionForm({
  id,
  name,
  description,
}: collectionDetails) {
  const [formData, setFormData] = useState({
    name: name,
    description: description,
  });

  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullData = {
      id,
      ...formData,
    };
    const result = collectionSchema.safeParse(fullData);
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
      const res = await fetch(`/api/collections/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
      });

      const data = await res.json();
      console.log('Server response:', data);

      if (!res.ok) throw new Error('Failed to update collection');
      router.push('/dashboard/collections');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles.editForm}>
      <label htmlFor='name'>Collection Name</label>
      <input
        id='name'
        type='text'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      {errors.description && (
        <p style={{ color: 'red' }}>{errors.description}</p>
      )}

      <Button
        buttonText='Save Changes'
        type='submit'
        className={`${formStyles.editButton} ${formStyles.imageButton} `}
      />
    </form>
  );
}
