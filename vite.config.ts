import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
		  '/api': {
			target: 'http://localhost:3000', // Your Express server's address
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, '/api'), // Optional: Keeps the `/api` prefix
		  },
		},
	  },
});
