const Joi = require('joi')

module.exports = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required()
}
