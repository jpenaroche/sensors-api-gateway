import JWT2 from 'hapi-auth-jwt2';
import { auth } from '../config';

const validate = async function (decoded, request, h) {
  const { username } = decoded;
  return {
    isValid: username !== null,
    credentials: {
      username,
    },
  };
};

export default async (server) => {
  await server.register(JWT2);
  server.auth.strategy('jwt', 'jwt', {
    key: auth.secret,
    validate,
    verifyOptions: {
      ignoreExpiration: true, // do not reject expired tokens
      algorithms: ['HS256'], // specify your secure algorithm
    },
  });

  server.auth.default('jwt');
};
