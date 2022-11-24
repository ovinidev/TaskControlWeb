import * as yup from 'yup';

export const taskSchema = yup
	.object({
		name: yup.string().required('Digite um nome para a task'),
		description: yup.string().required('Digite uma descrição'),
		hours: yup.string().required('Digite as horas gastas'),
		date: yup.string().required('Digite uma data'),
	})
	.required();
