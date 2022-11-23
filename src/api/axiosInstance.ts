/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { parseCookies } from 'nookies';
import { ILogin } from '../interfaces/ILogin';

const { token } = parseCookies();

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3333',
	headers: {
		authorization: `Bearer ${token}`,
	},
});

export const login = async (credentials: ILogin) => {
	const { data } = await axiosInstance.post('/login', credentials);

	return data;
};

export function setHeadersToken(token: string) {
	// @ts-ignore
	axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
}
