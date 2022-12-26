import { useRouter } from 'next/router';
import { Dispatch, useCallback, useReducer, useState } from 'react';
import { deleteTask, getTaskById } from '../api/task';
import { editUserProfile } from '../api/user';
import { queryClient } from '../services/queryClient';
import { useToasts } from './useToasts';

interface State {
	modalAddTask: boolean;
	modalEditTask: boolean;
}

export enum ModalAction {
	ADD = 'add',
	EDIT = 'edit',
	CLOSE = 'close',
}

export interface Action {
	type: ModalAction;
}

interface UseHomeProps {
	handleEditPhoto: (photo: File[]) => Promise<void>;
	dispatch: Dispatch<Action>;
	handlePrefetchTask: (taskId: string) => Promise<void>;
	handleDeleteTask: (taskId: string) => Promise<void>;
	handleEditTask: (taskId: string) => void;
	state: State;
	currentTaskIdToEdit: string;
}

export const useHome = (): UseHomeProps => {
	const router = useRouter();
	const { handleErrorToast } = useToasts();
	const [currentTaskIdToEdit, setCurrentTaskIdToEdit] = useState('');

	const handleDeleteTask = useCallback(async (taskId: string) => {
		try {
			await deleteTask(taskId);
			router.replace(router.asPath);
		} catch (err: any) {
			handleErrorToast({ title: err.message });
		}
	}, []);

	const handleEditTask = useCallback((taskId: string) => {
		setCurrentTaskIdToEdit(taskId);
		dispatch({ type: ModalAction.EDIT });
	}, []);

	const handleEditPhoto = useCallback(async (photo: File[]) => {
		const formData = new FormData();
		formData.append('image', photo[0]);

		await editUserProfile(formData);
		router.replace(router.asPath);
	}, []);

	const handlePrefetchTask = async (taskId: string) => {
		return await queryClient.prefetchQuery(
			['task', { id: taskId }],
			async () => {
				const response = await getTaskById(taskId);

				return response;
			},
			{
				staleTime: 1000 * 60 * 10, // 10 minutos
			},
		);
	};

	const initialState = {
		modalAddTask: false,
		modalEditTask: false,
	};

	const [state, dispatch] = useReducer((state: State, action: Action) => {
		switch (action.type) {
			case ModalAction.ADD:
				return {
					modalAddTask: true,
					modalEditTask: false,
				};
			case ModalAction.EDIT:
				return {
					modalAddTask: false,
					modalEditTask: true,
				};
			case ModalAction.CLOSE:
				return {
					modalAddTask: initialState.modalAddTask,
					modalEditTask: initialState.modalEditTask,
				};

			default:
				return state;
		}
	}, initialState);

	return {
		handleEditPhoto,
		dispatch,
		handlePrefetchTask,
		handleDeleteTask,
		handleEditTask,
		state,
		currentTaskIdToEdit,
	};
};
