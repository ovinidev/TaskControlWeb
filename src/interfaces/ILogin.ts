export interface ILogin {
	email: string;
	password: string;
}

export interface IUserInfo {
	name: string;
	token: string;
	refreshToken: string;
	isAuthenticated: boolean;
}
