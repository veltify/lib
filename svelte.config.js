import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import examples from 'mdsvexamples'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: './src/lib/Layout.svelte'
			},
			smartypants: {
				dashes: 'oldschool'
			},
			remarkPlugins: [[examples, {
				defaults: {
					Wrapper: '/src/lib/Preview.svelte',
				}
			}]],
		})
	],

	extensions: ['.svelte', '.md'],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
