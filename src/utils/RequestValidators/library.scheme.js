const Joi = require("joi");

const librarySchema = {
 libraryAdd: Joi.object().keys({
    name: Joi.string().max(50).required(),
    address: Joi.string().allow(null, "").optional(),
  }),

  libraryEdit: Joi.object().keys({
    name: Joi.string().max(50).required(),
    address: Joi.string().allow(null, "").optional(),
  }),

};
module.exports = librarySchema;