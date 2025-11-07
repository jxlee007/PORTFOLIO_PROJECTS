import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jxlee007.github.io',
  integrations: [tailwind()],
//   site: 'https://your-domain.com',
  // base: '',
});