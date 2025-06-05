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

export interface CategoryWithProducts extends Category {
  products: Product[];
}