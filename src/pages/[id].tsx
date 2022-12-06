import { Flex, Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface TaskProps {
	task: {
		createdAt: string;
		date: string;
		description: string;
		hours: number;
		id: string;
		name: string;
		updatedAt: string;
		userId: string;
	};
}

export default function TaskDetails() {
	const { query, push } = useRouter();

	const { data } = useQuery<TaskProps>(['task', { id: query.id }], {
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (!data) {
			push('/');
		}
	}, []);

	return (
		<Flex align="center" justify="center" h="100vh">
			<Flex direction="column">
				<Heading color="white">{data?.task.name}</Heading>
				<Heading color="white">{data?.task.description}</Heading>
			</Flex>
		</Flex>
	);
}
