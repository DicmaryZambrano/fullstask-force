'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from '@/styles/dashboard/profile.module.css';
import Button from '@/components/actionButton';

type PictureUploaderProps = {
  id: string;
  picture_url: string;
  first_name: string;
};

export default function PictureUploader({
  id,
  picture_url,
  first_name,
}: PictureUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(picture_url);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Esto abre el explorador
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

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
    }
  };

  return (
    <div className={styles.pictureForm}>
      <Image
        src={imageUrl || '/icons/user.svg'}
        alt={`${first_name} photo`}
        width={250}
        height={250}
        className={styles.userPhoto}
      />

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
