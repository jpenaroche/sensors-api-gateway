export default async (request, h) => {
  const service = request.container('TaskService');

  const task = await service.create(request.payload.task);
  return h.response({ task }).code(201);
};
