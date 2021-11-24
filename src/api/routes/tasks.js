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
  {
    method: 'get',
    path: '/tasks',
    handler: (req, h) => {
      console.log(req.auth.credentials);
      return h.response('Hello from Tasks API');
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required',
        strategy: 'session',
      },
    },
  },
  {
    method: 'get',
    path: '/tasks/jwt',
    handler: (req, h) => {
      console.log(req.auth.credentials);
      return h.response('Hello from Tasks API with JWT');
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required',
        strategy: 'jwt',
      },
    },
  },
];
