import { tasks as handlers } from '../handlers';
import { tasks as schemas } from '../schemas';

export default {
  name: 'Tasks',
  endpoints: [
    {
      topic: 'Create Task',
      on: 'createTask',
      handler: handlers.create,
      validator: {
        schema: schemas.create,
      },
    },
  ],
};
