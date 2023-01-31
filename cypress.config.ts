import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'fnmwmk',
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		viewportHeight: 768,
		viewportWidth: 1366,
		env: {
			email: 'viniapnm@gmail.com',
			password: '123456',
		},
	},
});
