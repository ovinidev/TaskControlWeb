import { Flex, Stack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import { useAuth } from '../hooks/useAuth';
import { ICreateAccount } from '../interfaces/ILogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonSubmit } from '../components/Form/ButtonSubmit';
import { useToasts } from '../hooks/useToasts';
import { FormContainer } from '../components/Form/FormContainer';
import { Title } from '../components/Title';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import { createAccount } from '../api/user';
import { createAccountSchema } from '../validations/createAccountSchema';

export default function SignIn() {
	const { signIn } = useAuth();

	const { handleErrorToast } = useToasts();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICreateAccount>({ resolver: zodResolver(createAccountSchema) });

	const { isLoading, mutateAsync } = useMutation(
		async (data: ICreateAccount) => {
			try {
				await createAccount(data);
			} catch (err: any) {
				handleErrorToast({
					title: 'Erro ao criar conta',
					description: err.message,
				});
			}
		},
	);

	const onSubmit = async (data: ICreateAccount) => {
		await mutateAsync(data);
		await signIn({ email: data.email, password: data.password });
	};

	return (
		<Flex h="100vh" align="center" justify="center" direction="column">
			<Title mb="3rem">Crie sua conta</Title>
			<FormContainer onSubmit={handleSubmit(onSubmit)}>
				<Stack w="100%" spacing="6">
					<Input
						type="text"
						label="Nome"
						{...register('name')}
						error={errors.name}
						placeholder="Vinicius"
					/>
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

					<ButtonSubmit isLoading={isLoading} title="Criar conta" />
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
