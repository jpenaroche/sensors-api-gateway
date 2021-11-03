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
      validate: Task.rules.create,
    },
  },
];
