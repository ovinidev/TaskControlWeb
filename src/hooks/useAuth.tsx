import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { login, setHeadersToken } from '../api/axiosInstance';
import { ILogin, IUserInfo } from '../interfaces/ILogin';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

type AuthContextProps = {
	children: ReactNode;
};

type AuthContextData = {
	signIn(credentials: ILogin): Promise<void>;
	singOut(): void;
	accountInfo: IUserInfo;
};

const AuthContext = createContext({} as AuthContextData);

// let authChannel: BroadcastChannel;

export const AuthProvider = ({ children }: AuthContextProps) => {
	const [accountInfo, setAccountInfo] = useState({} as IUserInfo);
	const { push } = useRouter();

	async function signIn({ email, password }: ILogin) {
		try {
			const { refreshToken, user, token } = await login({
				email,
				password,
			});

			setAccountInfo({
				refreshToken,
				token,
				isAuthenticated: true,
				name: user.name,
			});

			localStorage.setItem(
				'accountInfo',
				JSON.stringify({
					refreshToken,
					token,
					isAuthenticated: true,
					name: user.name,
				}),
			);

			setCookie(undefined, 'token', token, {
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/', // Quais caminhos da aplicação tem acesso ao cookie, / = tudo
			});

			setCookie(undefined, 'refreshToken', refreshToken, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/',
			});

			setHeadersToken(token);

			push('/home');
		} catch (err: any) {
			throw new Error(err.response.data.message);
		}
	}

	function singOut() {
		setAccountInfo({
			refreshToken: '',
			token: '',
			name: '',
			isAuthenticated: false,
		});

		destroyCookie(undefined, 'token');
		destroyCookie(undefined, 'refreshToken');

		// authChannel.postMessage('logout');

		push('/');
	}

	useEffect(() => {
		const { token, refreshToken } = parseCookies();

		if (token && refreshToken) {
			const storage = localStorage.getItem('accountInfo');
			if (storage) {
				setAccountInfo(JSON.parse(storage));
			}
			setCookie(undefined, 'token', token, {
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/', // Quais caminhos da aplicação tem acesso ao cookie, / = tudo
			});

			setCookie(undefined, 'refreshToken', refreshToken, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/',
			});
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				signIn,
				singOut,
				accountInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
