import axios from 'axios';
import { parseCookies } from 'nookies';

const { token } = parseCookies();

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3333',
	headers: {
		authorization: `Bearer ${token}`,
	},
});
