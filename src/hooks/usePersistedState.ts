import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { parseCookies, setCookie } from 'nookies';

export function usePersistedState(initialState: any) {
	const [state, setState] = useState(() => {
		const { theme } = parseCookies();

		if (theme) {
			return theme;
		}

		return initialState;
	});

	useEffect(() => {
		setCookie(null, 'theme', state, {
			maxAge: 60 * 60 * 24 * 30,
			path: '/',
		});
	}, [state]);

	return [state, setState];
}
