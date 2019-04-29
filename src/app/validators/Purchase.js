const Joi = require('joi')

module.exports = {
  ad: Joi.string().required(),
  content: Joi.string().required()
}
