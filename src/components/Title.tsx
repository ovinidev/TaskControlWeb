import { Flex, HeadingProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TitleProps extends HeadingProps {
	children: ReactNode;
}

export const Title = ({ children, ...rest }: TitleProps) => {
	return (
		<Flex
			color="white"
			fontWeight={500}
			as="h1"
			fontSize={{ base: '2rem', md: '2.5rem', '2xl': 'h2' }}
			{...rest}
		>
			{children}
		</Flex>
	);
};
