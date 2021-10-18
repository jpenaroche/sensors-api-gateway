import * as Boom from '@hapi/boom';

export default async (request) => {
  const service = request.container('TaskService');
  const task = await service.findById(request.params.id);
  if (!task)
    throw Boom.notFound(`Not found task with id: ${request.params.id}`);

  return task;
};
