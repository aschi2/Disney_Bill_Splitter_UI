import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [sveltekit(),
	Icons({compiler: 'svelte', autoInstall: true}),
	VitePWA({ registerType: 'autoUpdate'})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}

});
