# Example template

## Scripts

- `pnpm build` - Build the API
- `pnpm dev` - Start the API in development mode (runs `tsc` and `fastify start` concurrently)
- `pnpm start` - Start the API in production mode
- `pnpm lint` - Lint the API
- `pnpm lint:fix` - Fix linting errors
- `pnpm test` - Run all tests

## Build information

- [esbuild](https://esbuild.github.io/) - Used for building the API
- [tsc](https://www.typescriptlang.org/) - Used in parallel with esbuild for type checking

## CI information

- ci.yml - Main GitHub Actions workflow for building, linting and testing

## Testing information

- Integration tests go in either `tests/grpc` or `tests/rest`
  - External dependencies should be mocked using MSW
  - For HTTP tests, use Supertest
  - For gRPC tests, use the generated clients
- Unit tests should go into the same file as the code they are testing
  - Use `if (import.meta.vitest) { ... }` to separate unit tests from the rest of the code

## General package information

### Rest specific packages

- [@fastify/sensible](https://github.com/fastify/fastify-sensible) - Usefull utilities for the Fastify instance (http errors, etc.)
- [@fastify/cors](https://github.com/fastify/fastify-cors) - CORS support
- [@fastify/under-pressure](https://github.com/fastify/under-pressure) - Measures system load and gracefully responds with 503 if the server is under too much pressure

### gRPC specific packages

- [connect-es](https://github.com/connectrpc/connect-es) - Monorepo for conectrpc packages
- @connectrpc/connect-fastify - Fastify plugin for gRPC
  - @connectrpc/connect - Peer dependency (gRPC)
  - @connectrpc/connect-node - Peer dependency

### Testing specific packages

- [Vitest](https://github.com/vitest-dev/vitest) - Test runner for Vite
- [Supertest](https://github.com/ladjs/supertest) - Superagent driven library for testing HTTP servers
- [MSW](https://github.com/mswjs/msw) - Mock Service Worker is an API mocking library for browser and Node

### Protobuf specific information

- Buf remote packages [docs](https://buf.build/docs/bsr/remote-packages/npm)
- A token is needed for private packages, see [docs](https://buf.build/docs/bsr/remote-packages/npm#private-packages)
- Syntax for installing packages, see [docs](https://buf.build/docs/bsr/remote-packages/npm#using-the-npm-registry):
  - `npm install @buf/{moduleOwner}_{moduleName}.{pluginOwner}_{pluginName}`
- Installing a specific commit append `@commit-{commit_hash}`, see [docs](https://buf.build/docs/bsr/remote-packages/npm#commit)

### Development specific pacakges

- [Prettier](https://prettier.io/) - Code formatter (no formatting should be done by ESLint)
- [ESLint](https://eslint.org/) - Linter
- [Husky](https://github.com/typicode/husky) - Git hooks made easy
- [Lint Staged](https://github.com/lint-staged/lint-staged) - Runs linters against staged git files
- [Commitlint](https://github.com/conventional-changelog/commitlint) - Lints commit messages against conventional commit format
