"use client"

import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return <h1>Showing products for: {category}</h1>;
}
