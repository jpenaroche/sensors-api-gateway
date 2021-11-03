import Bull from 'bull';

export class Queue {
  constructor(logger, { redis: { name, host, password, port } }) {
    this.name = name;
    this.logger = logger;
    this.config = {
      redis: {
        host,
        password,
        port,
      },
    };
    this.queue = new Bull(this.name, this.config);
  }

  initListeners = () => {
    this.queue.on('error', (error) => {
      this.logger.error(error);
    });
  };

  async add(data) {
    await this.queue.add(data);
    this.logger.info(
      `Data added in queue: "${this.name}", payload: ${JSON.stringify(data)}`
    );
    return data;
  }

  async process(handler) {
    this.queue.process(handler);
  }
}
