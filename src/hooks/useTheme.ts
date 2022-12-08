import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';
import { dark } from '../styles/dark';
import { light } from '../styles/light';

interface UseThemeProps {
	theme: typeof light | typeof dark;
	handleTheme: () => void;
}

export const useTheme = (): UseThemeProps => {
	const { themes } = parseCookies();

	const [theme, setTheme] = useState(() => {
		if (themes) {
			return themes === 'light' ? light : dark;
		}

		return light;
	});

	const handleTheme = () => {
		setTheme(theme === light ? dark : light);
		setCookie(undefined, 'themes', theme === light ? 'dark' : 'light', {
			maxAge: 60 * 60 * 24 * 30,
			path: '/',
		});
	};

	return { theme, handleTheme };
};
