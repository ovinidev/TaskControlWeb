import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Stack,
	Button,
	Heading,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { createTask } from '../../api/task';
import { useToasts } from '../../hooks/useToasts';
import { ICreateTask } from '../../interfaces/ITask';
import { loginSchema } from '../../validations/loginSchema';
import { taskSchema } from '../../validations/taskSchema';
import { ButtonSubmit } from '../Form/ButtonSubmit';
import { FormContainer } from '../Form/FormContainer';
import { Input } from '../Form/Input';

export interface AddTaskModal {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

export const AddTaskModal = ({ isOpen, onClose, onOpen }: AddTaskModal) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ICreateTask>({ resolver: yupResolver(taskSchema) });

	const router = useRouter();

	const { handleSuccessToast, handleErrorToast } = useToasts();

	const { isLoading, mutateAsync } = useMutation(async (data: ICreateTask) => {
		try {
			await createTask(data);
			handleSuccessToast({ title: 'Tarefa criada com sucesso' });
			reset();
			onClose();
			router.replace(router.asPath);
		} catch (err: any) {
			handleErrorToast({
				title: 'Erro ao criar conta',
				description: err.message,
			});
		}
	});

	const onSubmit = async (data: ICreateTask) => {
		console.log(data);

		await mutateAsync({
			date: data.date,
			description: data.description,
			hours: Number(data.hours),
			name: data.name,
		});
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent bg="white" px="4">
					<ModalHeader>
						<Heading as="h4" variant="h4" color="black" py="2">
							Adicionar task
						</Heading>
					</ModalHeader>
					<ModalCloseButton size="lg" />
					<ModalBody>
						<FormContainer
							onSubmit={handleSubmit(onSubmit)}
							w="100%"
							justify="center"
						>
							<Stack w="100%" spacing="6">
								<Input
									type="text"
									label="Nome"
									{...register('name')}
									error={errors.name}
									placeholder="Minha task"
									_placeholder={{ color: 'gray.300' }}
									color="black"
									labelColor={'black'}
								/>
								<Input
									type="text"
									label="Descrição"
									{...register('description')}
									error={errors.description}
									placeholder="Task feita por mim"
									_placeholder={{ color: 'gray.300' }}
									color="black"
									labelColor={'black'}
								/>
								<Input
									type="number"
									label="Horas"
									{...register('hours')}
									error={errors.hours}
									placeholder="5"
									_placeholder={{ color: 'gray.300' }}
									color="black"
									labelColor={'black'}
								/>
								<Input
									type="date"
									label="Data"
									{...register('date')}
									error={errors.date}
									placeholder="14/04/2002"
									_placeholder={{ color: 'gray.300' }}
									color="black"
									labelColor={'black'}
								/>
								<ButtonSubmit
									title="Criar task"
									_hover={{ filter: 'brightness(0.8)' }}
									h="3rem"
									color="white"
									bg="primary"
									isLoading={isLoading}
								/>
							</Stack>
						</FormContainer>
					</ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};