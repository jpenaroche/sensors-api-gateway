export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async findOne(query) {
    return this.model.findOne(query).exec();
  }
  async find(query, sort) {
    return this.model.find(query).exec();
  }
  async findById(id) {
    return this.model.findById(id);
  }
  async count(query) {
    return this.model.count(query).exec();
  }
  async create(data) {
    return this.model.create(data);
  }
  async createMany(data) {
    return this.model.create(data);
  }
  async deleteOneById(id) {
    return this.model.findByIdAndDelete(id);
  }
  async updateOneById(id, data) {
    return this.model.findByIdAndUpdate(id, data);
  }
}
