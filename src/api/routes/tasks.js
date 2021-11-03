import handlers from '../handlers';
import { Task } from '../schemas/requests';

export default [
  {
    method: 'get',
    path: '/tasks',
    options: {
      tags: ['api'],
    },
    handler: handlers.tasks.list,
  },
  {
    method: 'get',
    path: '/tasks/{id}',
    handler: handlers.tasks.get,
    options: {
      tags: ['api'],
      validate: Task.rules.get,
    },
  },
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
  {
    method: 'delete',
    path: '/tasks/{id}',
    handler: handlers.tasks.remove,
    options: {
      tags: ['api'],
      validate: Task.rules.get,
    },
  },
  {
    method: 'put',
    path: '/tasks/{id}',
    handler: handlers.tasks.update,
    options: {
      tags: ['api'],
      payload: {
        parse: true,
      },
      validate: Task.rules.update,
    },
  },
];
