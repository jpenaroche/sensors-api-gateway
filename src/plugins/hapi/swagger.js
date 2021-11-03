import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Swagger from 'hapi-swagger';
import { version } from '../../../package.json';

export default (server) =>
  server.register([
    Inert,
    Vision,
    {
      plugin: Swagger,
      options: {
        info: {
          title: 'API Documentation',
          version,
        },
        securityDefinitions: {
          jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
        security: [{ jwt: [] }],
      },
    },
  ]);
