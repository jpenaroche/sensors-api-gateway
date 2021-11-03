import * as Boom from '@hapi/boom';

export default ({ schema, name, options = {} }) =>
  (_, payload) => {
    const result = schema.validate(payload, {
      ...(options || {}),
      ...{
        allowUnknown: true,
      },
    });
    if (result.error) {
      throw Boom.badRequest(
        `Validation for ${name.toUpperCase()} Schema. Error details:  ${result.error.details
          .map(({ message }) => message)
          .toString()}`
      );
    }

    return payload;
  };
