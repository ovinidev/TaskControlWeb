import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTaskDetailsQuery } from '../hooks/useTaskDetailsQuery';

export default function TaskDetails() {
	useEffect(() => {
		if (!data) {
			push('/');
		}
	}, []);

	const { push } = useRouter();

	const { data } = useTaskDetailsQuery();

	return (
		<Flex align="center" justify="center" h="100vh">
			<Flex direction="column">
				<Heading color="toggleWhite">{data?.task.name}</Heading>
				<Heading color="toggleWhite">{data?.task.description}</Heading>
			</Flex>
		</Flex>
	);
}
