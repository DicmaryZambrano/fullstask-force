'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from '@/styles/dashboard/profile.module.css';
import Button from '@/components/actionButton';

type PictureUploaderProps = {
  id: string;
  picture_url: string;
  name: string;
  category?: string;
  type: 'profile' | 'product';
};

export default function PictureUploader({
  id,
  picture_url,
  name,
  type,
  category,
}: PictureUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(picture_url);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    setIsUploading(true);

    if (type === 'profile') {
      try {
        const res = await fetch('/api/user/upload-photo', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          setImageUrl(data.url);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Upload failed', err);
      } finally {
        setIsUploading(false);
      }
    } else if (type === 'product') {
      if (!category) {
        console.error('Category is required for product photo upload');
        setIsUploading(false);
        return;
      }

      formData.append('name', name);
      formData.append('category', category);
      try {
        const res = await fetch('/api/products/upload-photo', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          setImageUrl(data.url);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Upload failed', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={styles.pictureForm}>
      {isUploading ? (
        <div className={styles.uploadingPhoto}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <Image
          src={imageUrl || '/icons/user.svg'}
          alt={`${name} photo`}
          width={250}
          height={250}
          className={styles.userPhoto}
        />
      )}

      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <Button
        buttonText='Change Photo'
        type='button'
        className={styles.imageButton}
        onClick={handleButtonClick}
      />
    </div>
  );
}
