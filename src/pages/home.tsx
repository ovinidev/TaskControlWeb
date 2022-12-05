import { Button, Flex, HStack, Stack } from '@chakra-ui/react';
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
import { TaskItem } from '../components/Task/TaskItem';
import { EditTaskModal } from '../components/Modals/EditTaskModal';
import { useReducer, useState } from 'react';
import { editUserProfile } from '../api/user';
import { IUser } from '../interfaces/IUser';
import { Avatar } from '../components/User/Avatar';

interface Props {
	data: {
		tasks: ITask[];
	};
	user: IUser;
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
		const formData = new FormData();
		formData.append('image', photo[0]);

		await editUserProfile(formData);
		router.replace(router.asPath);
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
				<Avatar handleEditPhoto={handleEditPhoto} userData={props.user} />

				<Flex direction="column">
					<Title>Olá {props.user.name},</Title>
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
				{props.data.tasks.map((task) => {
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
	const { token, refreshToken } = parseCookies(ctx);

	if (!token || !refreshToken) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const axiosInstanceSSR = requestsWithSSR(ctx);
	const { data } = await axiosInstanceSSR.get<ITask[]>('/tasks/me');
	const { data: user } = await axiosInstanceSSR.get<ITask>('/users/me');

	return {
		props: { data, user },
	};
};
