import mqtt from 'mqtt';
import plugins from '../plugins';
import listeners from '../mqtt/listeners';

const handle =
  (container, ...middlewares) =>
  async (topic, payload) => {
    const logger = container.get('Logger');
    try {
      payload = JSON.parse(payload.toString());
    } catch (e) {
      throw new Error(`Invalid payload format for MQTT listener: "${topic}"`);
    }
    for (const middleware of middlewares) {
      try {
        await middleware(container, payload);
      } catch (e) {
        logger.error(
          `Something got wrong for MQTT listener execution: "${topic}"`
        );
        throw e;
      }
    }
  };

const attachListeners = (container) => {
  const client = container.get('MQTT');
  listeners.forEach((listener) => {
    listener.endpoints.forEach((endpoint) => {
      client.subscribe(endpoint.on);
      client.on(
        'message',
        handle(
          container,
          plugins.mqtt.validator({
            schema: endpoint.validator.schema,
            name: endpoint.topic,
            options: endpoint.validator.options,
          }),
          endpoint.handler
        )
      );
    });
  });
};

const init = (container) => {
  const config = container.get('Config');
  const client = mqtt.connect(config.mqtt.host, {
    clientId: config.mqtt.clientId,
    username: config.mqtt.username,
    password: config.mqtt.password,
  });
  container.register('MQTT', client);
};

export const run = ({ container }) => {
  // Initialize MQTT client
  init(container);

  // Attach all listeners
  attachListeners(container);
};
