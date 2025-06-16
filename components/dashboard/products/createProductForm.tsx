'use client';

import { useEffect, useState, useRef } from 'react';
import Button from '@/components/actionButton';
import { Category } from '@/types/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import formStyles from '@/styles/dashboard/profile.module.css';
import styles from '@/styles/dashboard/listings/createProduct.module.css';

type ProductFormData = {
  name: string;
  price: number;
  category: string;
  description: string;
  image: File | null;
};

export default function CreateProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    }

    loadCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please select an image');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', String(formData.price));
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('file', formData.image);

    try {
      const res = await fetch('/api/products/create', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error('Product creation failed');
      const data = await res.json();
      console.log('Created:', data);
      router.push('/dashboard/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 600 }}
      className={`${styles.form} ${formStyles.editForm}`}
    >
      <label>Product Name</label>
      <input
        type='text'
        name='name'
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Price</label>
      <input
        type='number'
        name='price'
        value={formData.price}
        onChange={handleChange}
        step='0.01'
        required
      />

      <label>Category</label>
      <select
        name='category'
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value=''>-- Select a category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label>Description</label>
      <textarea
        name='description'
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Upload Image</label>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        ref={fileInputRef}
      />

      {previewUrl && (
        <div style={{ marginTop: '1rem' }}>
          <Image src={previewUrl} alt='Preview' width={200} height={200} />
        </div>
      )}

      <Button
        buttonText='Create Product'
        type='submit'
        className={`${styles.createBtn} ${formStyles.imageButton}`}
      />
    </form>
  );
}
