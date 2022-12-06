import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string().min(1, { message: 'Password is required' }),
});
