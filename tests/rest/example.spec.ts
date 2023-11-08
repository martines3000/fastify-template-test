import Fastify, { FastifyInstance } from 'fastify';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import supertest from 'supertest';
import { setupServer, SetupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { app, options } from '../../src/app.js';

describe('[REST]: example', () => {
  let server: FastifyInstance;
  let mswServer: SetupServer;

  beforeAll(async () => {
    server = Fastify();
    await server.register(app, options);
    await server.listen();

    mswServer = setupServer();
    mswServer.listen({ onUnhandledRequest: 'bypass' });
  });

  afterAll(async () => {
    await server.close();
    mswServer.close();
  });

  it('example 1', async () => {
    const response = await supertest(server.server)
      .get('/rest/example')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toEqual({ result: 'example' });
    expect.assertions(1);
  });

  it('example 2', async () => {
    const response = await supertest(server.server)
      .get('/rest/example/fetch')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toEqual({ alive: true });
    expect.assertions(1);
  });

  it('mock http example', async () => {
    const handler = http.get('https://api.publicapis.org/health', () =>
      HttpResponse.json(
        {
          alive: false,
        },
        { status: 200 } as any, // TODO: Remove this cast when this PR is merged and a new version of @types/node is released: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/67341
      ),
    );

    mswServer.use(handler);

    const response = await supertest(server.server)
      .get('/rest/example/fetch')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(response.body).toEqual({ alive: false });
    expect.assertions(1);
  });
});
