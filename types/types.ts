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
