import { defineConfig } from 'eslint/config';
import configs from '@lai9fox/eslint-config';


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
    extends: [configs.tsConfig],
  },
]);
