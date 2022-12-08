import { Button, Flex, HStack, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { requestsWithSSR } from '../api';
import { Title } from '../components/Title';
import { ITask } from '../interfaces/ITask';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { TaskItem } from '../components/Task/TaskItem';
import { EditTaskModal } from '../components/Modals/EditTaskModal';

import { IUser } from '../interfaces/IUser';
import { Avatar } from '../components/User/Avatar';
import { useAuth } from '../hooks/useAuth';
import { ModalAction, useHome } from '../hooks/useHome';

interface Props {
	data: {
		tasks: ITask[];
	};
	user: IUser;
}

export default function Home(props: Props) {
	const { singOut } = useAuth();
	const router = useRouter();

	const {
		handleEditPhoto,
		dispatch,
		handlePrefetchTask,
		handleDeleteTask,
		handleEditTask,
		state,
		taskId,
	} = useHome();

	return (
		<Flex direction="column" px={{ base: '8', '3xl': 0 }}>
			<title>Home</title>
			<Button w="2rem" onClick={singOut}>
				Logout
			</Button>
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
					color="secondary"
				>
					<AddIcon fontSize="1.8rem" />
				</Button>
			</HStack>
			<Stack align="center" spacing="4">
				{props.data.tasks.map((task) => {
					return (
						<TaskItem
							onClick={() => router.push(task.id)}
							onHover={() => handlePrefetchTask(task.id)}
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
