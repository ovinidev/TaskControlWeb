import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import { useAuth } from '../hooks/useAuth';
import { ILogin } from '../interfaces/ILogin';
import { parseCookies } from 'nookies';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/loginSchema';

export default function SignIn() {
	const { signIn } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILogin>({ resolver: yupResolver(loginSchema) });

	const { error, isLoading, isSuccess, mutateAsync } = useMutation(
		async (data: ILogin) => {
			await signIn(data);
		},
	);

	const onSubmit = async (data: ILogin) => {
		await mutateAsync(data);
	};

	const { refreshToken } = parseCookies();

	return (
		<Flex h="100vh" align="center" justify="center" direction="column">
			<Heading color="white" as="h1" variant="h1" mb="3rem">
				Olá, seja bem vindo
			</Heading>
			<Flex w={350} as="form" onSubmit={handleSubmit(onSubmit)}>
				<Stack w="100%" spacing="6">
					<Input
						type="email"
						label="Email"
						{...register('email')}
						error={errors.email}
					/>
					<Input
						type="password"
						label="Senha"
						{...register('password')}
						error={errors.password}
					/>
					<Button
						color="black"
						fontSize="1.3rem"
						bg="secondary"
						h="3rem"
						type="submit"
						isLoading={isLoading}
						_hover={{ filter: 'brightness(0.9)' }}
					>
						Login
					</Button>
				</Stack>
			</Flex>
		</Flex>
	);
}
