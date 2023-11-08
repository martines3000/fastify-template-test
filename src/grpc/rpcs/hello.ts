import {
  HelloRequest,
  HelloResponse,
} from '@buf/martines3000_proto-example.bufbuild_es/martines3000/example/v1/example_pb.js';
import { ExampleService } from '@buf/martines3000_proto-example.connectrpc_es/martines3000/example/v1/example_connect.js';
import { createPromiseClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-node';

export const hello = async (req: HelloRequest): Promise<HelloResponse> => {
  let message = `Welcome ${req.name}!`;
  console.log('req.name', req.name);
  if (req.name === 'remote-http') {
    const result = await fetch('https://api.publicapis.org/health');
    message = ((await result.json()) as any).message;
  } else if (req.name === 'remote-grpc') {
    const transport = createConnectTransport({
      baseUrl: `http://127.0.0.1:3003/grpc`,
      httpVersion: '1.1',
    });
    const client = createPromiseClient(ExampleService, transport);
    return client.hello({ name: 'bob' });
  }

  return new HelloResponse({
    message,
  });
};
