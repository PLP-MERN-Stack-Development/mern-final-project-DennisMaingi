import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import type { Plugin } from 'postcss';

interface PostCSSConfig {
  plugins: Plugin[];
}

const config: PostCSSConfig = {
  plugins: [
    tailwindcss(), // ⚡ Must call as a function
    autoprefixer(),
  ],
};

export default config;
