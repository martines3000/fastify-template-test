import { build } from 'esbuild';

console.log('Building service...');

await build({
  entryPoints: ['src/**/*.ts'],
  outdir: 'dist',
  bundle: false,
  treeShaking: true,
  minify: true,
  platform: 'node',
  format: 'esm',
  target: 'es2022',
  tsconfig: 'tsconfig.build.json',
  define: {
    'import.meta.vitest': 'undefined',
  },
});

console.log('Finished building service...');
