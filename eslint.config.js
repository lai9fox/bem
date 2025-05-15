import { defineConfig } from 'eslint/config';
import configs from '@lai9fox/eslint-config';


export default defineConfig([
  {
    files: ['src/**/*.{js,mjs,cjs,ts}'],
    extends: [configs.tsConfig],
  },
]);
