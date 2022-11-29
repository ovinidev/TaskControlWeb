import { ILogin } from '../interfaces/ILogin';
import { axiosInstance } from './axiosInstance';

export const createAccount = async (credentials: ILogin) => {
	const { data } = await axiosInstance.post('/users', credentials);

	return data;
};

export const editUserProfile = async (photo: FormData) => {
	const { data } = await axiosInstance.patch('users', photo);

	return data;
};

export const getUserData = async () => {
	const { data } = await axiosInstance.get('users/me');

	return data;
};
