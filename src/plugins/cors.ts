import cors, { FastifyCorsOptions } from '@fastify/cors';
import fp from 'fastify-plugin';

/**
 * This plugins adds CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (fastify) => {
  await fastify.register(cors, {
    origin: '*',
  });
});
