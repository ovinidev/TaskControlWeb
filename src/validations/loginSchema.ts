import * as yup from 'yup';

export const loginSchema = yup
	.object({
		email: yup
			.string()
			.email('Digite um email válido')
			.required('Digite um email'),
		password: yup.string().required('Digite sua senha'),
	})
	.required();
