import { Avatar, Button, Flex, HStack, Input, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { requestsWithSSR } from '../api';
import { Title } from '../components/Title';
import { ITask } from '../interfaces/ITask';
import { AddIcon } from '@chakra-ui/icons';
import { deleteTask } from '../api/task';
import { useRouter } from 'next/router';
import { useToasts } from '../hooks/useToasts';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { useAuth } from '../hooks/useAuth';
import { TaskItem } from '../components/Task/TaskItem';
import { EditTaskModal } from '../components/Modals/EditTaskModal';
import { useReducer, useState } from 'react';
import { editUserProfile } from '../api/user';

interface Props {
	tasks: ITask[];
}

interface State {
	modalAddTask: boolean;
	modalEditTask: boolean;
}

export enum ModalAction {
	ADD = 'add',
	EDIT = 'edit',
	CLOSE = 'close',
}

export interface Action {
	type: ModalAction;
}

export default function Home(props: Props) {
	const router = useRouter();
	const { handleErrorToast } = useToasts();
	const { accountInfo } = useAuth();
	const [taskId, setTaskId] = useState('');

	const handleDeleteTask = async (taskId: string) => {
		try {
			await deleteTask(taskId);
			router.replace(router.asPath);
		} catch (err: any) {
			handleErrorToast({ title: err.message });
		}
	};

	const handleEditTask = (taskId: string) => {
		setTaskId(taskId);
		dispatch({ type: ModalAction.EDIT });
	};

	const handleEditPhoto = async (photo: File[]) => {
		console.log(photo);

		const formData = new FormData();
		formData.append('image', photo[0]);

		editUserProfile(formData);
	};

	const initialState = {
		modalAddTask: false,
		modalEditTask: false,
	};

	const [state, dispatch] = useReducer((state: State, action: Action) => {
		switch (action.type) {
			case ModalAction.ADD:
				return {
					modalAddTask: true,
					modalEditTask: false,
				};
			case ModalAction.EDIT:
				return {
					modalAddTask: false,
					modalEditTask: true,
				};
			case ModalAction.CLOSE:
				return {
					modalAddTask: initialState.modalAddTask,
					modalEditTask: initialState.modalEditTask,
				};

			default:
				return state;
		}
	}, initialState);

	return (
		<Flex direction="column" px={{ base: '8', '3xl': 0 }}>
			<title>Home</title>
			<HStack spacing="4" py="8" justify="center" align="center">
				<Avatar
					name={accountInfo.name}
					size="xl"
					src={`http://localhost:3333/uploads/${accountInfo.avatarUrl}`}
					position="relative"
				>
					<Input
						max="3"
						w="1rem"
						position="absolute"
						type="file"
						accept="image/*"
						onChange={(e: any) => handleEditPhoto(e.target.files)}
					/>
				</Avatar>

				<Flex direction="column">
					<Title>Olá {accountInfo.name},</Title>
					<Title>visualize suas tasks</Title>
				</Flex>
				<Button
					_hover={{ color: 'gray.300' }}
					transition="all 0.6s"
					variant="unstyled"
					onClick={() => dispatch({ type: ModalAction.ADD })}
					color="white"
				>
					<AddIcon fontSize="1.8rem" />
				</Button>
			</HStack>
			<Stack align="center" spacing="4">
				{props.tasks.map((task) => {
					return (
						<TaskItem
							handleDeleteTask={() => handleDeleteTask(task.id)}
							handleEditTask={() => handleEditTask(task.id)}
							task={task}
							key={task.id}
						/>
					);
				})}
			</Stack>
			<AddTaskModal
				isOpen={state.modalAddTask}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
			/>
			<EditTaskModal
				isOpen={state.modalEditTask}
				onClose={() => dispatch({ type: ModalAction.CLOSE })}
				taskId={taskId}
			/>
		</Flex>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { token } = parseCookies(ctx);

	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const axiosInstanceSSR = requestsWithSSR(ctx);
	const { data } = await axiosInstanceSSR.get<ITask[]>('/tasks/me');

	return {
		props: data,
	};
};
