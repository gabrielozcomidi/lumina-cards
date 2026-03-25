import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';

const dev = process.env.ROLLUP_WATCH;
const serveEnabled = process.env.SERVE;

const plugins = [
  resolve(),
  commonjs(),
  typescript(),
  json(),
  !dev && terser({
    output: {
      comments: false,
    },
  }),
  serveEnabled && serve({
    contentBase: './dist',
    host: '0.0.0.0',
    port: 5000,
    allowCrossOrigin: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
].filter(Boolean);

export default {
  input: 'src/lumina-cards.ts',
  output: {
    file: 'dist/lumina-cards.js',
    format: 'es',
    inlineDynamicImports: true,
    sourcemap: dev ? true : false,
  },
  plugins,
};
