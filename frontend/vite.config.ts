import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import { resolve } from 'path';

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
    plugins: [reactRouter()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        watch: {
            usePolling: true,
            interval: 5000,
        },
    },
});
