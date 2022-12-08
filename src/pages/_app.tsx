import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Switcher } from '../components/Switcher';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../hooks/useAuth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTheme } from '../hooks/useTheme';

export default function App({ Component, pageProps }: AppProps) {
	const { theme, handleTheme } = useTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<ChakraProvider theme={theme}>
				<Switcher
					handleTheme={handleTheme}
					onClick={handleTheme}
					size="lg"
					position="absolute"
					right="2rem"
					top="2rem"
				/>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}
