import { z } from 'zod';

export const taskSchema = z.object({
	name: z.string().min(1, { message: 'Digite o nome da Task' }),
	description: z.string().min(1, { message: 'Digite uma descrição' }),
	hours: z.string().min(1, { message: 'Digite a quantidade de horas' }),
	date: z.string().min(1, { message: 'Digite a data' }),
});
