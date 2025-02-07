import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default ({ mode }) => {

  return defineConfig({
    build: mode === 'lib' ? {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'iamkey',
        fileName: (format) => `components.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // Add external deps here
          globals: {
            vue: 'Vue',
          },
        },
      },
    } : {},
    resolve:{
      alias:{
        '@/' : `${resolve(__dirname, 'src')}/`,
        '~/' : `${resolve(__dirname, 'assets')}/`
      },
    },
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
        template: {
          compilerOptions: {
            isCustomElement: (tag) => {
              return tag.startsWith('iam-') // (return true)
            }
          }
        }
      }),
    ]
  });

};