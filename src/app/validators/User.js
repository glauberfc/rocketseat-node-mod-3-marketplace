const Joi = require('joi')

module.exports = {
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
}
