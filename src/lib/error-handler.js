import { Boom } from '@hapi/boom';
import pino from 'pino';

const logger = pino({
  prettyPrint: true,
});

export class ErrorHandler {
  // TODO get Logger from container
  static async handleError(err) {
    logger.error(
      err,
      'Error message from the centralized error-handling component'
    );
    //Extends for more behavior like notifications via email, etc...
  }

  static isTrustedError(err) {
    return err instanceof Boom;
  }
}
