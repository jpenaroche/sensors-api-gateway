export default class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  async findOne(query) {
    return this.taskRepository.findOne(query);
  }
  async find(query, sort) {
    return this.taskRepository.find(query, sort);
  }
  async findById(id) {
    return this.taskRepository.findById(id);
  }
  async updateOneById(id, data) {
    return this.taskRepository.updateOneById(id, data);
  }
  async count(query) {
    return this.taskRepository.count(query);
  }
  async create(data) {
    return this.taskRepository.create(data);
  }
  async createMany(data) {
    return this.taskRepository.create(data);
  }
  async deleteOneById(id) {
    return this.taskRepository.deleteOneById(id);
  }
}
