const Joi = require('joi');

const biddingValidation = Joi.object().keys({
  vehicleID: Joi.string().required(),
  user: Joi.string().required(),
  amount: Joi.number().required(),
});

module.exports = { biddingValidation };