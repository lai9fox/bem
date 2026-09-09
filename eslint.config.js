import { defineConfig } from 'eslint/config';
import eslintConfig from '@lai9fox/eslint-config';


export default defineConfig([
  {
    ignores: [
      'coverage/**',
      'dist/**',
      'site/**',
      '**/.astro/**',
    ],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts}'],
    extends: [eslintConfig({ typescript: true })],
  },
]);
