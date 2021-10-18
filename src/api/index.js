import routes from './routes';

export default {
  name: 'api',
  version: '1.0.0',
  register: async function (server) {
    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.response('Hello from Tasks API');
      },
    });
    server.route(routes.tasks);
  },
};
