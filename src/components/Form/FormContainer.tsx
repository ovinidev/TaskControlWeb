import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FormContainerProps extends FlexProps {
	children: ReactNode;
}

export const FormContainer = ({ children, ...rest }: FormContainerProps) => {
	return (
		<Flex w={{ base: '85%', '3xl': 350 }} as="form" {...rest}>
			{children}
		</Flex>
	);
};
