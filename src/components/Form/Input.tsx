import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input as ChakraInput,
	InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
	name: string;
	label?: string;
	error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{ name, label, error, ...rest },
	ref: any,
) => {
	return (
		// !!errors significa que se tiver conteúdo é true, transformando em booleano
		<FormControl isInvalid={!!error}>
			{label && (
				<FormLabel color="white" htmlFor={name}>
					{label}
				</FormLabel>
			)}
			<ChakraInput
				name={name}
				id={name}
				focusBorderColor="secondary"
				bgColor="inputBg"
				variant="filled"
				color="toggleWhite"
				_focus={{
					background: 'inputBg',
				}}
				_hover={{
					filter: 'brightness(0.9)',
				}}
				size="lg"
				ref={ref}
				{...rest}
			/>
			{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
};

export const Input = forwardRef(InputBase);
