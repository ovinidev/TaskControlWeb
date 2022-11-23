import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Switcher } from '../components/Switcher';
import { queryClint } from '../services/queryClient';
import { dark } from '../styles/dark';
import { light } from '../styles/light';
import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';
import { AuthProvider } from '../hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
	const { themes } = parseCookies();

	const [theme, setTheme] = useState(() => {
		if (themes) {
			return themes === 'light' ? light : dark;
		}

		return light;
	});

	const handleTheme = () => {
		setTheme(theme === light ? dark : light);
		setCookie(null, 'themes', theme === light ? 'dark' : 'light', {
			maxAge: 60 * 60 * 24 * 30,
			path: '/',
		});
	};

	return (
		<QueryClientProvider client={queryClint}>
			<ChakraProvider theme={theme}>
				<Switcher
					handleTheme={handleTheme}
					onClick={handleTheme}
					size="lg"
					position="absolute"
					right="1"
				/>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}
