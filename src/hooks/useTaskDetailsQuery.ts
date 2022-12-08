import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface TaskProps {
	task: {
		createdAt: string;
		date: string;
		description: string;
		hours: number;
		id: string;
		name: string;
		updatedAt: string;
		userId: string;
	};
}

export const useTaskDetailsQuery = () => {
	const { query } = useRouter();

	return useQuery<TaskProps>(['task', { id: query.id }], {
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
};
