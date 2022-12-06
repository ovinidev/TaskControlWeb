import { z } from 'zod';

export const createAccountSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, { message: 'Name must be at least 3 characters' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Invalid email' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' }),
});
