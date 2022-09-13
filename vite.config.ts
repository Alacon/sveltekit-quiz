import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { resolve } from 'path';

const config: UserConfig = {
	resolve: {
		alias: {
		  $src: resolve("./src"),
		  $models: resolve("./src/models"),
		  $components: resolve("./src/components"),
		},
	  },
	plugins: [sveltekit()]
};

export default config;
