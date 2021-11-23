import { Server } from '@hapi/hapi';
import plugins from '../plugins';

const registerAllPlugins = async ({ server, plugins }) => {
  //Register all configured plugins
  for (const exec of plugins) {
    await exec(server);
  }
};

export const init = async ({ plugins, config: { common } }) => {
  const server = new Server({
    port: common.port,
    host: common.host,
    router: {
      stripTrailingSlash: true,
      isCaseSensitive: true,
    },
  });
  await registerAllPlugins({
    server,
    plugins,
  });
  await server.initialize();
  return server;
};

export const run = async ({ container }) => {
  const config = container.get('Config');
  const server = await init({
    config,
    plugins: plugins.hapi,
  });

  server.decorate('request', 'container', (name) => container.get(name));

  await server.start();
};
