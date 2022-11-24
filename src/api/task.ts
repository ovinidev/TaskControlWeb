import { ICreateTask, ITask } from '../interfaces/ITask';
import { axiosInstance } from './axiosInstance';

export const getUserTasks = async () => {
	const { data } = await axiosInstance.get<ITask[]>('/tasks/me');

	return data;
};

export const createTask = async (task: ICreateTask) => {
	const { data } = await axiosInstance.post(`/tasks`, task);

	return data;
};

export const deleteTask = async (taskId: string) => {
	const { data } = await axiosInstance.delete<ITask[]>(`/tasks/me/${taskId}`);

	return data;
};
