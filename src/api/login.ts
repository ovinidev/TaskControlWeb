import { ILogin } from '../interfaces/ILogin';
import { axiosInstance } from './axiosInstance';

export const login = async (credentials: ILogin) => {
	const { data } = await axiosInstance.post('/login', credentials);

	return data;
};
export function setHeadersToken(token: string) {
	// @ts-ignore
	axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
}
