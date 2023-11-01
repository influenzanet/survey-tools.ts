// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { VitePluginNode } from 'vite-plugin-node';
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    outDir: 'dist-cli/',
    lib: {
      entry: resolve(__dirname, 'src/cli.ts'),
      name: 'study-tools',
      fileName: 'cli'
    },
  },
  plugins: [dts(), VitePluginNode({appPath: 'src/cli.ts', adapter: 'koa'})],
});