import { extendTheme } from '@chakra-ui/react';

export const light = extendTheme({
	title: 'light',
	colors: {
		primary:
			'linear-gradient(41deg, rgba(97,231,206,1) 0%, rgba(6,14,149,1) 76%)',
		secondary: '#61E7CE',
		tertiary: '#8A9FFF ',
		title: '#0C0C0C',
		text: '#0C0C0C',
		gray: {
			500: '#333333',
			400: '#666666',
			300: '#999999',
			200: '#CCCCCC',
			100: ' #FAFAFA',
			0: '#FFFFFF',
		},
		white: '#FFFFFF',
		black: '#000000',
		toggleWhite: '#F0F3F8',
		inputBg: 'rgb(0, 0, 0, 0.1)',
	},
	breakpoints: {
		sm: '18.75rem', // 300px
		md: '25rem', // 400px
		lg: '31.25rem', // 500px
		xl: '37.5rem', // 600px
		'2xl': '43.75rem', // 700px
	},
	fonts: {
		body: 'Roboto, system-ui, sans-serif',
		heading: 'Roboto , system-ui, sans-serif',
	},
	fontSizes: {
		small: '0.625rem', // 10px
		medium: '0.75rem', // 12px
		large: '0.875rem', // 14px
	},

	fontWeights: {
		hairline: 100,
		thin: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},
	radii: {
		none: '0',
		sm: '0.125rem',
		base: '0.25rem',
		md: '0.375rem',
		lg: '0.5rem',
		xl: '0.75rem',
		'2xl': '1rem',
		'3xl': '1.5rem',
		full: '9999px',
	},

	components: {
		Heading: {
			variants: {
				h1: {
					fontSize: '3rem', //48px
					fontWeight: 600,
				},
				h2: {
					fontSize: '2.5rem', //40px
					fontWeight: 600,
				},
				h3: {
					fontSize: '2rem', //32px
					fontWeight: 600,
				},
				h4: {
					fontSize: '1.5rem', //24px
					fontWeight: 600,
				},
				h5: {
					fontSize: '1.25rem', //20px
					fontWeight: 600,
				},
				h6: {
					fontSize: '1rem', //16px
					fontWeight: 600,
				},
			},
		},
	},

	styles: {
		global: {
			body: {
				bg: 'primary',
			},
		},
	},
});
