import { DeleteIcon, EditIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { ITask } from '../../interfaces/ITask';

interface TaskItemProps {
	task: ITask;
	handleDeleteTask: () => void;
	handleEditTask: () => void;
	onHover: () => void;
	onClick: () => void;
}

export const TaskItem = ({
	task,
	handleDeleteTask,
	handleEditTask,
	onHover,
	onClick,
}: TaskItemProps) => {
	return (
		<Flex
			css={{
				'&:last-child': {
					marginBottom: '4rem',
				},
			}}
			w="100%"
			color="black"
			justify="center"
		>
			<Flex
				onMouseEnter={onHover}
				key={task.id}
				bg="tertiary"
				py="4"
				px="6"
				w={{ base: '80%', '3xl': 450 }}
				borderLeftRadius="5px"
				fontSize="1.2rem"
				align="center"
				justify="space-between"
			>
				<Flex w="70%" direction="column">
					<Text>Task: {task.name}</Text>
					<Text>Detalhes: {task.description}</Text>
					<Text>Horas: {task.hours}</Text>
					<Text>Data: {new Date(task.date).toLocaleDateString('pt-BR')}</Text>
				</Flex>
				<HStack spacing="0">
					<Button
						h="2rem"
						_hover={{ color: 'gray.600' }}
						transition="all 0.6s"
						variant="unstyled"
						onClick={handleDeleteTask}
					>
						<DeleteIcon fontSize="1.7rem" />
					</Button>
					<Button
						h="2rem"
						_hover={{ color: 'gray.600' }}
						transition="all 0.6s"
						variant="unstyled"
						onClick={handleEditTask}
					>
						<EditIcon fontSize="1.7rem" />
					</Button>
				</HStack>
			</Flex>
			<Flex
				onClick={onClick}
				cursor="pointer"
				_hover={{
					filter: 'brightness(0.9)',
				}}
				px="4"
				bg="#7a93b3"
				align="center"
				borderRightRadius="5px"
			>
				<ArrowRightIcon />
			</Flex>
		</Flex>
	);
};
