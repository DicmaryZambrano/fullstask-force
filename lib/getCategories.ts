import { cache } from 'react';
import { getCategories as dbGetCategories } from '@/database/database';

export const getCategories = cache(async () => {
  return await dbGetCategories();
});