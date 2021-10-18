import { Schema, model } from 'mongoose';
import * as uuid from 'uuid';

const TaskSchema = new Schema({
  _id: { type: String, default: uuid.v1 },
  name: String,
  description: String,
  when: Date,
});

export default model('Task', TaskSchema);
