import { ConnectRouter } from '@connectrpc/connect';

import { ExampleService } from '@buf/martines3000_proto-example.connectrpc_es/martines3000/example/v1/example_connect.js';
import { hello } from './rpcs/hello.js';

export const routes = (router: ConnectRouter) =>
  router.service(ExampleService, {
    hello,
  });
