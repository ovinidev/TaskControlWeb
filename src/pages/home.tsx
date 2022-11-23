import { Button, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { requestsWithSSR } from '../api';
import { useAuth } from '../hooks/useAuth';

export default function Home(props: any) {
	const { singOut } = useAuth();

	return (
		<Flex>
			<Button onClick={singOut} />
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
	const { data } = await axiosInstanceSSR.get('/tasks/me');

	return {
		props: data,
	};
};
