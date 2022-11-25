import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { ITask } from '../../interfaces/ITask';

interface TaskItemProps {
	task: ITask;
	handleDeleteTask: (taskId: string) => void;
	handleEditTask: (taskId: string) => void;
}

export const TaskItem = ({
	task,
	handleDeleteTask,
	handleEditTask,
}: TaskItemProps) => {
	return (
		<Flex
			key={task.id}
			bg="tertiary"
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
				<Text>Data: {new Date(task.date).toLocaleDateString('pt-BR')}</Text>
			</Flex>
			<HStack spacing="0">
				<Button
					h="2rem"
					color="black"
					_hover={{ color: 'gray.600' }}
					transition="all 0.6s"
					variant="unstyled"
					onClick={() => handleDeleteTask(task.id)}
				>
					<DeleteIcon fontSize="1.7rem" />
				</Button>
				<Button
					color="black"
					h="2rem"
					_hover={{ color: 'gray.600' }}
					transition="all 0.6s"
					variant="unstyled"
					onClick={() => handleEditTask(task.id)}
				>
					<EditIcon fontSize="1.7rem" />
				</Button>
			</HStack>
		</Flex>
	);
};
