import Joi from 'joi';

export const payloadTaskSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  when: Joi.date().iso().required(),
});

export const rules = {
  get: {
    params: Joi.object({
      id: Joi.string().uuid({
        version: 'uuidv1',
      }),
    }),
  },
  create: {
    payload: Joi.object({
      task: payloadTaskSchema.optional(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().uuid({
        version: 'uuidv1',
      }),
    }),
    payload: Joi.object({
      task: payloadTaskSchema.optional(),
    }),
  },
};
