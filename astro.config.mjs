// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://durrantguitars.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    svelte(),
    react({ include: ['**/keystatic/**'] }),
    markdoc(),
    keystatic(),
  ]
});