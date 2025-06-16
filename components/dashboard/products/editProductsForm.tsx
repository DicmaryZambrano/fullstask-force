'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/types/types';
import { productSchema } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import Button from '@/components/actionButton';
import formStyles from '@/styles/dashboard/profile.module.css';

type Props = {
  productDetails: Product;
  category: Category;
};

async function getAllCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export default function EditProductForm({ productDetails, category }: Props) {
  const [formData, setFormData] = useState({
    name: productDetails.name,
    price: productDetails.price,
    category: category.id,
    description: productDetails.description,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((error) => console.error('Failed to load categories:', error));
  }, []);

  const router = useRouter();

  const handleCancel = () => {
    router.push('/dashboard/products');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      id: productDetails.id,
      ...formData,
    };

    const result = productSchema.safeParse(updatedData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof formData;
        fieldErrors[field] = err.message;
      });

      setFormErrors(fieldErrors);
      return;
    }

    try {
      const res = await fetch('/api/products/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Error updating product');
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles.editForm}>
      <label htmlFor='name'>Product Name</label>
      <input
        type='text'
        id='name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {formErrors.name && <p>{formErrors.name}</p>}

      <label htmlFor='price'>Price</label>
      <input
        type='number'
        step={2}
        id='price'
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: parseFloat(e.target.value) })
        }
      />
      {formErrors.price && <p>{formErrors.price}</p>}

      <label htmlFor='category'>Select Category</label>
      <select
        id='category'
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>
      {formErrors.description && <p>{formErrors.description}</p>}

      <div className={formStyles.buttonGroup}>
        <Button
          buttonText='Cancel'
          type='button'
          onClick={handleCancel}
          className={`${formStyles.editButton} ${formStyles.imageButton} ${formStyles.cancelButton}`}
        />
        <Button
          buttonText='Save Changes'
          type='submit'
          className={`${formStyles.editButton} ${formStyles.imageButton}`}
        />
      </div>
    </form>
  );
}
