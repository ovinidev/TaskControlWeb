import { EditIcon } from '@chakra-ui/icons';
import {
	FormControl,
	FormLabel,
	Input,
	Avatar as ChakraAvatar,
} from '@chakra-ui/react';
import { IUser } from '../../interfaces/IUser';

interface AvatarProps {
	userData: IUser;
	handleEditPhoto: (value: any) => void;
}

export const Avatar = ({ userData, handleEditPhoto }: AvatarProps) => {
	return (
		<ChakraAvatar
			name={userData.name}
			size="xl"
			src={`http://localhost:3333/uploads/${userData.avatarUrl}`}
			position="relative"
			cursor="pointer"
		>
			<FormControl
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<FormLabel
					opacity={0}
					_hover={{
						opacity: 1,
					}}
					cursor="pointer"
					ml="0.7rem"
					mt="0.5rem"
				>
					<EditIcon color="white" fontSize="2rem" alignSelf="center" />
				</FormLabel>

				<Input
					max="3"
					name="avatar"
					display="none"
					w="1rem"
					type="file"
					accept="image/*"
					onChange={(e: any) => handleEditPhoto(e.target.files)}
				/>
			</FormControl>
		</ChakraAvatar>
	);
};
