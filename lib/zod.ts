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
