import { Flex, Stack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import { useAuth } from '../hooks/useAuth';
import { ILogin } from '../interfaces/ILogin';
import { loginSchema } from '../validations/loginSchema';
import { ButtonSubmit } from '../components/Form/ButtonSubmit';
import { useToasts } from '../hooks/useToasts';
import { useRouter } from 'next/router';
import { FormContainer } from '../components/Form/FormContainer';
import { Title } from '../components/Title';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
	const { signIn } = useAuth();

	const { handleErrorToast } = useToasts();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILogin>({ resolver: zodResolver(loginSchema) });

	const { isLoading, mutateAsync } = useMutation(async (data: ILogin) => {
		try {
			await signIn(data);
		} catch (err: any) {
			handleErrorToast({ title: 'Erro no login', description: err.message });
		}
	});

	const onSubmit = async (data: ILogin) => {
		await mutateAsync(data);
	};

	const route = useRouter();

	return (
		<Flex
			bg="primary"
			h="100vh"
			align="center"
			justify="center"
			direction="column"
		>
			<Title mb="3rem">Olá, seja bem vindo</Title>
			<FormContainer onSubmit={handleSubmit(onSubmit)}>
				<Stack w="100%" spacing="6">
					<Input
						type="email"
						label="Email"
						{...register('email')}
						error={errors.email}
						placeholder="Example@gmail.com"
					/>
					<Input
						type="password"
						label="Senha"
						{...register('password')}
						error={errors.password}
						placeholder="********"
					/>
					<Flex justify="space-between">
						<ButtonSubmit isLoading={isLoading} title="Login" w="49%" />
						<ButtonSubmit
							type="button"
							onClick={() => route.push('signIn')}
							bg="tertiary"
							title="Criar conta"
							w="49%"
						/>
					</Flex>
				</Stack>
			</FormContainer>
		</Flex>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { token, refreshToken } = parseCookies(ctx);

	if (token && refreshToken) {
		return {
			redirect: {
				destination: '/home',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
