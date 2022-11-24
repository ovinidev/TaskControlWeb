import { useToast } from '@chakra-ui/react';

interface UseToastProps {
	handleSuccessToast: ({ title, description }: ToastProps) => void;
	handleErrorToast: ({ title, description }: ToastProps) => void;
}

interface ToastProps {
	title: string;
	description?: string;
}

export const useToasts = (): UseToastProps => {
	const toast = useToast();

	const handleSuccessToast = ({ title, description }: ToastProps) => {
		toast({
			title,
			description,
			status: 'success',
			duration: 2000,
			isClosable: true,
			position: 'top-right',
		});
	};

	const handleErrorToast = ({ title, description }: ToastProps) => {
		toast({
			title,
			description,
			status: 'error',
			duration: 2000,
			isClosable: true,
			position: 'top-right',
		});
	};

	return { handleSuccessToast, handleErrorToast };
};
