import transports from './transports';
import { Container, ErrorHandler, Logger } from './lib';
import * as config from './config';

const initContainer = () => {
  const container = new Container();
  container.singleton('Config', config);
  container.singleton('Logger', Logger);
  return container;
};

const bootstrap = async () => {
  const container = initContainer();
  return {
    container,
  };
};

// Bootstrap all connections and send it to server using context definition
bootstrap().then(async (ctx) => {
  const logger = ctx.container.get('Logger');
  await Promise.all([transports.http.run(ctx), transports.mqtt.run(ctx)]);
  logger.info('Gateway running on all protocols.');
});

// get the unhandled rejection and throw it to another fallback handler we already have.
process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (err) => {
  ErrorHandler.handleError(err);
  if (!ErrorHandler.isTrustedError(err)) {
    process.exit(1);
  }
});
