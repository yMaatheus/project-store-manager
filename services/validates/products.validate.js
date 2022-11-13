const Joi = require('joi');
const errorUtil = require('../../utils/error.util');

module.exports = {
  validateUpdateBody: (body) => {
    const nameSchema = Joi.object({
      name: Joi.string().min(5).required(),
    });

    const { error } = nameSchema.validate(body);

    if (error) {
      const { type } = error.details[0];
      let code = 400;
      if (type === 'string.min') code = 422;

      throw errorUtil(code, error.message);
    }
  },
};