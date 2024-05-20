import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fg from 'fast-glob';
import path from 'path';

const inputFiles = fg.sync('vue/Components/**/*.vue').reduce((entries, file) => {
    const name = path.basename(file, path.extname(file));
    entries[name] = path.resolve(__dirname, file);
    return entries;
}, {});


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
    alias: {
      '@': fileURLToPath(new URL('./vue', import.meta.url)),
    }
    },
    build: {
        lib: {
            entry: inputFiles,
            formats: ['es']
        },
        rollupOptions: {
            input: inputFiles,
            external: ['vue', 'axios'],
            output: {
                dir: 'dist',
                format: 'es',
                globals: {
                    vue: 'Vue',
                    axios: 'axios',
                },
                entryFileNames: '[name].js' // Uložení každé komponenty jako samostatného souboru s původním názvem
            }
        }
    },
})
