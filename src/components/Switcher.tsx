import { Switch, SwitchProps } from '@chakra-ui/react';

interface SwitcherProps extends SwitchProps {
	handleTheme: () => void;
}

export const Switcher = ({ handleTheme, ...rest }: SwitcherProps) => {
	return <Switch onChange={handleTheme} {...rest} />;
};
