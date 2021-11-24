import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';

const sign = promisify(jwt.sign);

export class Jwt {
  constructor(config) {
    this.secret = config.auth.provider.jwt.secret;
    this.key = readFileSync(config.auth.provider.jwt.certificates.key);
    this.public = readFileSync(config.auth.provider.jwt.certificates.public);
  }

  #signToken(payload, key, algorithm, expiresIn = null) {
    return sign(
      {
        ...payload,
      },
      key,
      {
        algorithm,
        expiresIn,
      }
    );
  }

  signTokenWithSecret(payload, expires = null) {
    return this.#signToken(payload, this.secret, 'HS256', expires);
  }

  signTokenWithPrivateKey(payload, expires = null) {
    return this.#signToken(payload, this.key, 'RS256', expires);
  }
}
