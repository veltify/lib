import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '1rem'
		},
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"--tw-prose-bold": "inherit",
						"--tw-prose-headings": "hsl(var(--content))",
						"--tw-prose-body": "hsl(var(--muted))",
					},
				},
			},
			colors: {
				base: {
					100: 'hsl(var(--base-100))',
					200: 'hsl(var(--base-200))',
					300: 'hsl(var(--base-300))',
					400: 'hsl(var(--base-400))'
				},
				content: {
					DEFAULT: 'hsl(var(--content))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					base: 'hsl(var(--primary-base))',
					content: 'hsl(var(--primary-content))',
					hover: 'hsl(var(--primary-hover))'
				}
			},
			spacing: {
				'xs': 'var(--space-1)',
				'sm': 'var(--space-2)',
				'md': 'var(--space-3)',
				'lg': 'var(--space-4)',
				'xl': 'var(--space-5)',
				'2xl': 'var(--space-6)',
				'3xl': 'var(--space-7)',
				'4xl': 'var(--space-8)',
				'5xl': 'var(--space-9)',
				'6xl': 'var(--space-10)',
			}
		}
	},
	plugins: []
} satisfies Config;
