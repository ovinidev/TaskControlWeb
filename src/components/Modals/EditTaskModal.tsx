import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Stack,
	Heading,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { editTask } from '../../api/task';
import { getActualDate } from '../../utils/getActualDate';
import { useToasts } from '../../hooks/useToasts';
import { IUpdateTask } from '../../interfaces/ITask';
import { ButtonSubmit } from '../Form/ButtonSubmit';
import { FormContainer } from '../Form/FormContainer';
import { Input } from '../Form/Input';

export interface AddTaskModal {
	isOpen: boolean;
	onClose: () => void;
	taskId: string;
}

export const EditTaskModal = ({ isOpen, onClose, taskId }: AddTaskModal) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IUpdateTask>();

	const router = useRouter();

	const { handleSuccessToast, handleErrorToast } = useToasts();

	const placeValuesToEdit = (data: IUpdateTask) => {
		const valuesToEdit = {
			date:
				data.date !== undefined && data.date.toString() !== ''
					? new Date(data.date)
					: undefined,
			description:
				data.description !== undefined && data.description.length > 0
					? data.description
					: undefined,
			hours:
				data.hours !== undefined && data.hours > 0 ? data.hours : undefined,
			name:
				data.name !== undefined && data.name.length > 0 ? data.name : undefined,
		};

		return valuesToEdit;
	};

	const clearAllFieldsWhenFinishRequest = () => {
		reset();
		onClose();
		router.replace(router.asPath);
	};

	const { isLoading, mutateAsync } = useMutation(async (data: IUpdateTask) => {
		try {
			const taskToEdit = placeValuesToEdit(data);

			await editTask(taskToEdit, taskId);

			handleSuccessToast({ title: 'Tarefa editada com sucesso' });
			clearAllFieldsWhenFinishRequest();
		} catch (err: any) {
			handleErrorToast({
				title: 'Erro ao editar task',
				description: err.message,
			});
		}
	});

	const { actualDate } = getActualDate();

	const onSubmit = async (data: IUpdateTask) => {
		const date = data?.date?.toString();
		const [year, month, day] = date!.split('-');

		await mutateAsync({
			date: data.date && new Date(`${month}/${day}/${year}`),
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
							Editar task
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
									max={actualDate}
								/>
								<ButtonSubmit
									title="Editar"
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
