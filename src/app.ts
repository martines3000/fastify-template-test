import * as path from 'path';
import { fileURLToPath } from 'url';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  _opts
): Promise<void> => {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // await fastify.register(AutoLoad, {
  //   dir: path.join(dirname, 'plugins'),
  //   forceESM: true,
  // });

  // This loads all plugins defined in routes
  // define your routes in one of these
  await fastify.register(AutoLoad, {
    dir: path.join(dirname, 'routes'),
    forceESM: true,
  });
};

export default app;
export { app, options };
