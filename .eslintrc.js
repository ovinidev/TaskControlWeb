module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-filename-extension': 'off',
		'react/react-in-jsx-scope': 'off',
		'import/prefer-default-export': 'off',
		'react/function-component-definition': 'off',
		'linebreak-style': 0,
		'react/no-array-index-key': 'off',
		'arrow-body-style': 'off',
		'react/jsx-no-constructed-context-values': 'off',
		'import/no-extraneous-dependencies': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
	},
};
