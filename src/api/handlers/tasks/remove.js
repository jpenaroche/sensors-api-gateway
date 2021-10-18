export default async (request) => {
  const service = request.container('TaskService');

  return service.findByIdAndDelete(request.params.id);
};
