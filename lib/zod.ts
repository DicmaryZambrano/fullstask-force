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
