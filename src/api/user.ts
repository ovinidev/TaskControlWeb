import { IUpdateUser } from '../interfaces/IUser';
import { axiosInstance } from './axiosInstance';

export const editUserProfile = async (photo: FormData) => {
	const { data } = await axiosInstance.patch('users', photo);

	return data;
};

export const getUserData = async () => {
	const { data } = await axiosInstance.get('users/me');

	return data;
};
