import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import { useAuth } from '../hooks/useAuth';
import { ICreateAccount, ILogin } from '../interfaces/ILogin';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/loginSchema';
import { ButtonSubmit } from '../components/Form/ButtonSubmit';
import { useToasts } from '../hooks/useToasts';
import { createAccount } from '../api/axiosInstance';
import { FormContainer } from '../components/Form/FormContainer';
import { Title } from '../components/Title';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

export default function SignIn() {
	const { signIn } = useAuth();

	const { handleErrorToast } = useToasts();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICreateAccount>({ resolver: yupResolver(loginSchema) });

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
						error={errors.email}
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
	const { token } = parseCookies(ctx);

	if (token) {
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
