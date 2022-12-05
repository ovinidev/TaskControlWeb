import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { AuthTokenError } from '../errors/AuthTokenError';

export function requestsWithSSR(ctx: GetServerSidePropsContext) {
	let isRefreshing = false;
	let failedRequestsQueue: any = [];

	const { token } = parseCookies(ctx);

	const axiosInstanceSSR = axios.create({
		baseURL: 'http://localhost:3333',
		headers: { authorization: `Bearer ${token}` },
	});

	axiosInstanceSSR.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			const { refreshToken } = parseCookies(ctx);

			if (error.response?.status === 401) {
				if (error.response?.data.message === 'jwt expired') {
					const originalConfig = error.config;

					if (!isRefreshing) {
						isRefreshing = true;

						axiosInstanceSSR
							.get('/refresh-token', {
								headers: { authorization: `Bearer ${refreshToken}` },
							})
							.then((response) => {
								const { token, refreshToken } = response.data;
								console.log(token, refreshToken);

								setCookie(ctx, 'token', token, {
									maxAge: 60 * 60 * 24 * 30,
									path: '/',
								});

								setCookie(ctx, 'refreshToken', refreshToken, {
									maxAge: 60 * 60 * 24 * 30,
									path: '/',
								});

								// @ts-ignore
								axiosInstanceSSR.defaults.headers.Authorization = `Bearer ${token}`;

								failedRequestsQueue.forEach((request: any) =>
									request.onSuccess(token),
								);
								failedRequestsQueue = [];
							})
							.catch((err) => {
								failedRequestsQueue.forEach((request: any) =>
									request.onFailed(err),
								);
								failedRequestsQueue = [];
							})
							.finally(() => {
								isRefreshing = false;
							});
					}

					return new Promise((resolve, reject) => {
						failedRequestsQueue.push({
							onSuccess: (token: string) => {
								originalConfig.headers['Authorization'] = `Bearer ${token}`;
								resolve(axiosInstanceSSR(originalConfig));
							},
							onFailed: (err: AxiosError) => {
								reject(err);
							},
						});
					});
				} else {
					return Promise.reject(new AuthTokenError());
				}
			}

			return Promise.reject(error);
		},
	);

	return axiosInstanceSSR;
}
