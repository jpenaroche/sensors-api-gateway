import api from '../api';

export default (server) =>
  server.register(api, {
    routes: {
      prefix: '/api',
    },
  });
