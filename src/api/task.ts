import { axiosInstance } from './axiosInstance';

export const getUserTasks = async () => {
	const { data } = await axiosInstance.get('/tasks/me');

	return data;
};
