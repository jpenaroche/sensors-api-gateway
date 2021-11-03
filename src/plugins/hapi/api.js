import routes from '../../api/routes';

const filter = (routes) =>
  routes.filter((r) => r.options.tags.indexOf('api') !== -1);

const plugin = {
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
    server.route(filter(routes.tasks));
  },
};

export default (server) =>
  server.register(plugin, {
    routes: {
      prefix: '/api',
    },
  });
