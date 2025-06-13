'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/dashboard/profile.module.css';
import Button from '@/components/actionButton';
import { useRouter } from 'next/navigation';
import { userUpdateSchema } from '@/lib/zod';
import { useSession } from 'next-auth/react';

type Props = {
  userInfo: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    profile_picture_url: string;
  };
};

export default function ProfileForm({ userInfo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    phone_number: userInfo.phone_number,
    address: userInfo.address,
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  useEffect(() => {
    setFormData({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      phone_number: userInfo.phone_number,
      address: userInfo.address,
    });
  }, [userInfo]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      phone_number: userInfo.phone_number,
      address: userInfo.address,
    });
    setFormErrors({});
    setIsEditing(false);
  };

  const router = useRouter();
  const { update } = useSession();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      id: userInfo.id,
      ...formData,
    };

    const result = userUpdateSchema.safeParse(updatedData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof formData;
        fieldErrors[field] = err.message;
      });
      setFormErrors(fieldErrors);
      return; // Detiene el submit si hay errores
    }

    setFormErrors({}); // Limpia errores si todo es válido

    try {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Error updating user');

      await update();
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <label htmlFor='first_name'>First Name</label>
      <input
        id='first_name'
        type='text'
        disabled={!isEditing}
        value={formData.first_name}
        onChange={handleChange}
      />
      {formErrors.first_name && (
        <p className={styles.error}>{formErrors.first_name}</p>
      )}

      <label htmlFor='last_name'>Last Name</label>
      <input
        id='last_name'
        type='text'
        disabled={!isEditing}
        value={formData.last_name}
        onChange={handleChange}
      />
      {formErrors.last_name && (
        <p className={styles.error}>{formErrors.last_name}</p>
      )}

      <label htmlFor='phone_number'>Phone Number</label>
      <input
        id='phone_number'
        type='tel'
        disabled={!isEditing}
        value={formData.phone_number}
        onChange={handleChange}
      />
      {formErrors.phone_number && (
        <p className={styles.error}>{formErrors.phone_number}</p>
      )}

      <label htmlFor='address'>Current Address</label>
      <textarea
        id='address'
        disabled={!isEditing}
        value={formData.address}
        onChange={handleChange}
      ></textarea>
      {formErrors.address && (
        <p className={styles.error}>{formErrors.address}</p>
      )}

      {!isEditing ? (
        <Button
          buttonText='Edit Profile'
          className={`${styles.editButton} ${styles.imageButton}`}
          type='button'
          onClick={handleEditClick}
        />
      ) : (
        <div className={styles.buttonGroup}>
          <Button
            buttonText='Cancel'
            className={`${styles.editButton} ${styles.imageButton} ${styles.cancelButton}`}
            type='button'
            onClick={handleCancel}
          />
          <Button
            buttonText='Save Changes'
            className={`${styles.editButton} ${styles.imageButton}`}
            type='submit'
          />
        </div>
      )}
    </form>
  );
}
