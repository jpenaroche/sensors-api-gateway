export default async (request, h) => {
  const bull = request.container('Queue');
  const task = await bull.add(request.payload.task);

  return h.response({ task }).code(201);
};
