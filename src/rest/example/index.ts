import { FastifyPluginAsync } from 'fastify';
import { exampleFunction } from './example.js';

// eslint-disable-next-line @typescript-eslint/require-await
const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', () => ({ result: exampleFunction() }));

  fastify.get('/fetch', async () => {
    const result = await fetch('https://api.publicapis.org/health');
    return result.json();
  });
};

export default example;
