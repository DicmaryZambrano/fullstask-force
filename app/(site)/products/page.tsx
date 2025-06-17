'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ProductsClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return <h1>Showing products for: {category}</h1>;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
