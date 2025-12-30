import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocess supports TypeScript, SCSS, PostCSS, etc.
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
		// optional: change paths if deploying to subdirectory
		// paths: {
		//   base: '/my-base-path'
		// }
	}
};

export default config;
