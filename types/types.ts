import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

export interface Product {
  id?: string; // optional, used when updating
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  seller_id?: string; // optional, can default
}

export interface ProductWithRating extends Product {
  average_rating: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductWithRatingAndSeller extends ProductWithRating {
  seller_name: string;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export interface User {
  id: string;
  email: string;
  hashed_password: string;
  profile_picture_url: string;
  role?: 'customer' | 'seller';
  first_name: string;
  last_name: string;
  address?: string;
  phone_number?: string;
}

export type UserProfile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  profile_picture_url: string;
};

export interface ProductsListed {
  id: string;
  name: string;
  price: string;
  image_url: string;
  updated_at: Timestamp;
}

export interface FullProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  seller_id: string;
  created_at: string;
  updated_at: string;
  seller_name: string;
  average_rating: number;
}

export interface CollectionList {
  id: string;
  name: string;
  description: string;
}

export interface ProductFromCollection {
  id: string;
  name: string;
  image_url: string;
}

export interface CollectionDetails {
  id: string;
  name: string;
  description: string;
}

export interface CollectionWithProducts extends CollectionDetails {
  products: ProductWithRatingAndSeller[];
}

export interface Review {
  id: string;
  customer_id: string;
  rating: number;
  comment: string;
  created_at: Timestamp;
  user_name: string;
}

export interface ProductReviewSummary {
  average_rating: number;
  reviews: Review[];
}