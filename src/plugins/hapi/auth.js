import Bell from '@hapi/bell';
import Cookie from '@hapi/cookie';
import JWT2 from 'hapi-auth-jwt2';
import { auth } from '../../config';

const strategies = {
  cookie: async (server) => {
    await server.register(Cookie);

    server.auth.strategy('session', 'cookie', {
      cookie: {
        password: auth.password,
        isSecure: false,
      },
      redirectTo: '/login',
    });

    server.auth.default('session');
  },
  auth0: async (server) => {
    await server.register(Bell);
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
        handler: async function (request, h) {
          if (!request.auth.isAuthenticated) {
            return `Authentication failed due to: ${request.auth.error.message}`;
          }

          // Perform any account lookup or registration, setup local session,
          // and redirect to the application. The third-party credentials are
          // stored in request.auth.credentials. Any query parameters from
          // the initial request are passed back via request.auth.credentials.query.

          const { profile, token } = request.auth.credentials;

          const Jwt = request.container('Jwt');

          const jwt = await Jwt.signTokenWithPrivateKey({ ...profile }, 36000);

          request.cookieAuth.set({
            userId: profile.id,
            token,
            jwt,
          });

          return h.redirect('/api');
        },
      },
    });
  },
  jwt: async (server) => {
    await server.register(JWT2);
    server.auth.strategy('jwt', 'jwt', {
      key: auth.provider.jwt.secret,
      validate: (decoded) => {
        const { sensorId } = decoded;
        return {
          isValid: sensorId !== null,
          credentials: {
            sensorId,
          },
        };
      },
      verifyOptions: {
        ignoreExpiration: true, // do not reject expired tokens
        algorithms: ['HS256'], // specify your secure algorithm
      },
    });
  },
};

const plugin = {
  name: 'auth',
  version: '1.0.0',
  register: function (server) {
    return Promise.all(
      Object.keys(strategies).map((strategy) => strategies[strategy](server))
    );
  },
};

export default (server) => server.register(plugin);
