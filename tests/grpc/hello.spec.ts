import Fastify, { FastifyInstance } from 'fastify';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { SetupServer, setupServer } from 'msw/node';
import {
  PromiseClient,
  Transport,
  createPromiseClient,
} from '@connectrpc/connect';
import { ExampleService } from '@buf/martines3000_proto-example.connectrpc_es/martines3000/example/v1/example_connect.js';
import { createConnectTransport } from '@connectrpc/connect-node';
import { HttpResponse, http } from 'msw';
import { HelloResponse } from '@buf/martines3000_proto-example.bufbuild_es/martines3000/example/v1/example_pb.js';
import { app, options } from '../../src/app.js';

describe('[gRPC]: hello', () => {
  let server: FastifyInstance;
  let mswServer: SetupServer;
  let transport: Transport;
  let client: PromiseClient<typeof ExampleService>;

  beforeAll(async () => {
    server = Fastify({
      logger: {
        level: 'trace',
        // We want to use pino-pretty only if there is a human watching this,
        // otherwise we log as newline-delimited JSON.
        transport: { target: 'pino-pretty' },
      },
    });
    await server.register(app, options);
    await server.listen({ port: 3003 });

    mswServer = setupServer();
    mswServer.listen({ onUnhandledRequest: 'error' });

    transport = createConnectTransport({
      baseUrl: `http://127.0.0.1:3003/grpc`,
      httpVersion: '1.1',
    });
    client = createPromiseClient(ExampleService, transport);
  });

  afterAll(async () => {
    await server.close();
    mswServer.close();
  });

  it('example 1', async () => {
    const res = await client.hello({ name: 'bob' });
    expect(res.toJson()).toEqual({ message: 'Welcome bob!' });
    expect.assertions(1);
  });

  it('mock http example', async () => {
    const handler = http.get('https://api.publicapis.org/health', () =>
      HttpResponse.json(
        {
          message: 'Welcome alice!',
        },
        { status: 200 },
      ),
    );

    mswServer.use(handler);
    const res = await client.hello({ name: 'remote-http' });

    expect(res.toJson()).toEqual({ message: 'Welcome alice!' });
    expect.assertions(1);
  });

  it.skip('mock grpc example', async () => {
    const handler = http.post(
      'http://127.0.0.1:3003/grpc/martines3000.example.v1.ExampleService/Hello',
      // eslint-disable-next-line @typescript-eslint/require-await
      async (request) => {
        console.log('request', request);
        return HttpResponse.arrayBuffer(
          new HelloResponse({ message: 'Does not work' }).toBinary(),
          { status: 200 },
        );
      },
    );

    mswServer.use(handler);

    const res = await client.hello({ name: 'remote-grpc' });
    expect(res.toJson()).toEqual({ message: 'Welcome alice!' });
    expect.assertions(1);
  });
});
