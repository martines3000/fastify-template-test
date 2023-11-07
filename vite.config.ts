import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    watch: false,
    pool: 'forks',
    include: ['tests/**/*.spec.ts'],
    includeSource: ['src/**/*.ts'],
    silent: true,
    cache: false,
    environment: 'node',
    poolOptions: {
      forks: {
        minForks: 1,
        maxForks: 8,
      },
    },
    logHeapUsage: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      clean: true,
      reporter: ['lcov'],
      include: ['src/**/*.ts'],
    },
    server: {
      deps: {
        inline: ['@fastify/autoload'],
      },
    },
  },
});
