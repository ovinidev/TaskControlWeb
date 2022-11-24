import {
	Button,
	Flex,
	HStack,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { requestsWithSSR } from '../api';
import { Title } from '../components/Title';
import { ITask } from '../interfaces/ITask';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { deleteTask } from '../api/task';
import { useRouter } from 'next/router';
import { useToasts } from '../hooks/useToasts';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { useAuth } from '../hooks/useAuth';

interface Props {
	tasks: ITask[];
}

export default function Home(props: Props) {
	const router = useRouter();
	const { handleErrorToast } = useToasts();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { accountInfo } = useAuth();

	const handleDeleteTask = async (taskId: string) => {
		try {
			await deleteTask(taskId);
			router.replace(router.asPath);
		} catch (err: any) {
			handleErrorToast({ title: err.message });
		}
	};

	return (
		<Flex direction="column" px={{ base: '8', '3xl': 0 }}>
			<title>Home</title>
			<HStack spacing="4" py="8" justify="center" align="center">
				<Title>Olá {accountInfo.name}, Visualize suas tasks</Title>
				<Button variant="unstyled" onClick={onOpen}>
					<AddIcon color="white" fontSize="1.8rem" />
				</Button>
			</HStack>
			<Stack align="center" spacing="4">
				{props.tasks.map((task) => {
					return (
						<Flex
							key={task.id}
							bg="secondary"
							py="4"
							px="6"
							w={{ base: '100%', '3xl': 450 }}
							borderRadius="5px"
							fontSize="1.2rem"
							align="center"
							justify="space-between"
							css={{
								'&:last-child': {
									marginBottom: '4rem',
								},
							}}
							color="black"
						>
							<Flex direction="column">
								<Text>Task: {task.name}</Text>
								<Text>Detalhes: {task.description}</Text>
								<Text>Horas: {task.hours}</Text>
								<Text>
									Data: {new Date(task.date).toLocaleDateString('pt-BR')}
								</Text>
							</Flex>
							<Button
								variant="unstyled"
								onClick={() => handleDeleteTask(task.id)}
							>
								<DeleteIcon fontSize="1.5rem" />
							</Button>
						</Flex>
					);
				})}
			</Stack>
			<AddTaskModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
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
