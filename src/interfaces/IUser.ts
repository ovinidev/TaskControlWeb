export interface IUpdateUser {
	name?: string;
	email?: string;
	password?: string;
	avatarUrl?: string;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	avatarUrl: string;
}
