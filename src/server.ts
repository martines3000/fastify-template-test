import * as dotenv from 'dotenv';

// Import the framework
import Fastify, { FastifyServerOptions } from 'fastify';

// Import library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';
import { AutoloadPluginOptions } from '@fastify/autoload';

// Import the app and options
import { app, options } from './app.js';

// Read the .env file.
dotenv.config();

const opts: FastifyServerOptions & Partial<AutoloadPluginOptions> = {
  logger: {
    level: process.env.FASTIFY_LOG_LEVEL ?? 'info',
    // We want to use pino-pretty only if there is a human watching this,
    // otherwise we log as newline-delimited JSON.
    transport: process.stdout.isTTY ? { target: 'pino-pretty' } : undefined,
  },
};

// Instantiate Fastify with some config
const server = Fastify(opts);

// Register your application as a normal plugin.
await server.register(app, options);

// Exits process gracefully if possible
const closeListeners = closeWithGrace({ delay: 500 }, (async ({ err }) => {
  if (err) {
    server.log.error(err);
  }
  await server.close();
}) as closeWithGrace.CloseWithGraceAsyncCallback);

// On Close, remove all listeners
server.addHook('onClose', (_, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening
// Read the PORT from the .env file. Defaults to 3003.
server.listen(
  { port: parseInt(process.env.PORT ?? '3003', 10) },
  (err: any) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  }
);
