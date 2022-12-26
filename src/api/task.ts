import { ICreateTask, ITask, IUpdateTask } from '../interfaces/ITask';
import { axiosInstance } from './axiosInstance';

// QUERY PARAMS
export const getUserTasks = async (params = {}) => {
	const { data } = await axiosInstance.get<ITask[]>('/tasks/me', { params });

	return data;
};

// BODY PARAMS
export const createTask = async (task: ICreateTask) => {
	const { data } = await axiosInstance.post(`/tasks`, task);

	return data;
};

// ROUTE PARAMS
export const deleteTask = async (taskId: string) => {
	const { data } = await axiosInstance.delete<ITask[]>(`/tasks/me/${taskId}`);

	return data;
};

export const getTaskById = async (id: string) => {
	const { data } = await axiosInstance.get<ITask[]>(`/tasks/me/${id}`);

	return data;
};

export const editTask = async (task: IUpdateTask, taskId: string) => {
	const { data } = await axiosInstance.patch(`/tasks/me/${taskId}`, task);

	return data;
};
