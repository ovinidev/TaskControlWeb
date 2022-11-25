import { IUpdateUser } from '../interfaces/IUser';
import { axiosInstance } from './axiosInstance';

export const editUserProfile = async (photo: FormData) => {
	const { data } = await axiosInstance.patch('users', photo);

	return data;
};
