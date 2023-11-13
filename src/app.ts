import * as path from 'path';
import { fileURLToPath } from 'url';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
import { fastifyConnectPlugin } from '@connectrpc/connect-fastify';
import { fastifyUnderPressure } from '@fastify/under-pressure';
import { routes } from './grpc/router.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  _opts,
): Promise<void> => {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  await fastify.register(AutoLoad, {
    dir: path.join(dirname, 'plugins'),
    forceESM: true,
  });

  // This loads all rest routes defined in rest
  await fastify.register(AutoLoad, {
    dir: path.join(dirname, 'rest'),
    forceESM: true,
    options: { prefix: '/rest' },
  });

  // Load gRPC routes
  await fastify.register(fastifyConnectPlugin, {
    routes,
    grpc: true,
    prefix: '/grpc',
  });

  // Load Under-Pressure plugin
  await fastify.register(fastifyUnderPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98,
    message: 'Under pressure!',
    retryAfter: 50,
  });
};

export default app;
export { app, options };
