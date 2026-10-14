import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://pfxamd.github.io', base: '/dar-sera', output: 'static', trailingSlash: 'always', image: { service: { entrypoint: 'astro/assets/services/sharp' } } });
