import z from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email('Invalid email'),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const userUpdateSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone_number: z
    .string()
    .regex(
      /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/,
      'Invalid phone number format'
    ),
  address: z.string().min(1, 'Address is required'),
});

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),

  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .gt(0, { message: 'Price must be greater than 0' })
    .lte(50000, { message: 'Price cannot exceed 50,000' }),

  description: z.string().refine((val) => val.trim().split(/\s+/).length >= 6, {
    message: 'Description must have at least 10 words',
  }),
});

export const collectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});
