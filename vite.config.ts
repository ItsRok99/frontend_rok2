import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',  // To bind to all available network interfaces.
		port: 7000,       // Adjust accordingly if you want a different port.
	}
});
