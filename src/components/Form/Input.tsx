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
	labelColor?: string;
	error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{ name, label, labelColor = 'white', error, ...rest },
	ref: any,
) => {
	return (
		// !!errors significa que se tiver conteúdo é true, transformando em booleano
		<FormControl isInvalid={!!error}>
			{label && (
				<FormLabel color={labelColor} htmlFor={name}>
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
				_placeholder={{
					color: 'gray.300',
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
