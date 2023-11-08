import { FastifyPluginAsync } from 'fastify';

// eslint-disable-next-line @typescript-eslint/require-await
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    const response = { root: true };

    return response;
  });
};

export default root;
