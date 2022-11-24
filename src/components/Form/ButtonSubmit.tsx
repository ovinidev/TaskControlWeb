import { Button, ButtonProps } from '@chakra-ui/react';

interface ButtonSubmitProps extends ButtonProps {
	isLoading?: boolean;
	title: string;
}

export const ButtonSubmit = ({
	isLoading,
	title,
	...rest
}: ButtonSubmitProps) => {
	return (
		<Button
			color="black"
			fontSize="1.3rem"
			bg="secondary"
			h="3.5rem"
			type="submit"
			isLoading={isLoading}
			_hover={{ filter: 'brightness(0.9)' }}
			fontWeight={500}
			{...rest}
		>
			{title}
		</Button>
	);
};
