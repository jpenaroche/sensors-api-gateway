import handlers from '../handlers';
import { Task } from '../schemas/requests';

export default [
  {
    method: 'post',
    path: '/tasks',
    handler: handlers.tasks.create,
    options: {
      tags: ['api'],
      payload: {
        parse: true,
      },
      auth: {
        mode: 'required',
        strategy: 'session',
      },
      validate: Task.rules.create,
    },
  },
];
