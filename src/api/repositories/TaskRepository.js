import BaseRepository from './BaseRepository';
import { TaskModel } from '../models';

export default class TaskRepository extends BaseRepository {
  constructor() {
    super(TaskModel);
  }
}
