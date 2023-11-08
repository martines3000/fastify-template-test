# Example template

## General package information

## Rest specific packages

- [@fastify/sensible](https://github.com/fastify/fastify-sensible) - Usefull utilities for the Fastify instance (http errors, etc.)
- [@fastify/cors](https://github.com/fastify/fastify-cors) - CORS support
- [@fastify/under-pressure](https://github.com/fastify/under-pressure) - Measures system load and gracefully responds with 503 if the server is under too much pressure

## gRPC specific packages

- [connect-es](https://github.com/connectrpc/connect-es) - Monorepo for conectrpc packages
- @connectrpc/connect-fastify - Fastify plugin for gRPC
  - @connectrpc/connect - Peer dependency (gRPC)
  - @connectrpc/connect-node - Peer dependency

## Testing specific packages

- [Vitest](https://github.com/vitest-dev/vitest) - Test runner for Vite
- [Supertest](https://github.com/ladjs/supertest) - Superagent driven library for testing HTTP servers
- [MSW](https://github.com/mswjs/msw) - Mock Service Worker is an API mocking library for browser and Node

## Protobuf specific information

- Buf remote packages [docs](https://buf.build/docs/bsr/remote-packages/npm)
- A token is needed for private packages, see [docs](https://buf.build/docs/bsr/remote-packages/npm#private-packages)
- Syntax for installing packages, see [docs](https://buf.build/docs/bsr/remote-packages/npm#using-the-npm-registry):
  - `npm install @buf/{moduleOwner}_{moduleName}.{pluginOwner}_{pluginName}`
- Installing a specific commit append `@commit-{commit_hash}`, see [docs](https://buf.build/docs/bsr/remote-packages/npm#commit)
