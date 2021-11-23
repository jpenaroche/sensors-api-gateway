import Bell from '@hapi/bell';
import Cookie from '@hapi/cookie';
import { auth } from '../../config';

const plugin = {
  name: 'auth0',
  version: '1.0.0',
  register: async function (server) {
    await server.register(Bell);
    await server.register(Cookie);

    server.auth.strategy('session', 'cookie', {
      cookie: {
        password: auth.password,
        isSecure: false,
      },
      redirectTo: '/login',
    });

    //Set default session strategy to persist session obtainer from auth0
    server.auth.strategy('auth0', 'bell', {
      provider: 'auth0',
      config: {
        domain: auth.provider.auth0.domain,
      },
      password: auth.password,
      clientId: auth.provider.auth0.clientId,
      clientSecret: auth.provider.auth0.secret,
      isSecure: false, // Terrible idea but required if not using HTTPS especially if developing locally
    });

    //Set auth0 strategy to fetch user credentials an authenticate over Auth0
    server.route({
      method: ['GET', 'POST'], // Must handle both GET and POST
      path: '/login', // The callback endpoint registered with the provider
      options: {
        auth: {
          mode: 'try',
          strategy: 'auth0',
        },
        handler: function (request, h) {
          if (!request.auth.isAuthenticated) {
            return `Authentication failed due to: ${request.auth.error.message}`;
          }

          // Perform any account lookup or registration, setup local session,
          // and redirect to the application. The third-party credentials are
          // stored in request.auth.credentials. Any query parameters from
          // the initial request are passed back via request.auth.credentials.query.

          const { profile, token } = request.auth.credentials;
          request.cookieAuth.set({
            token: token,
            userId: profile.id,
          });

          return h.redirect('/api');
        },
      },
    });
    server.auth.default('session');
  },
};

export default (server) => server.register(plugin);
