import Joi from 'joi';

export const payloadTaskSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

export default {
  create: Joi.object({
    task: payloadTaskSchema.required(),
  }),
};
