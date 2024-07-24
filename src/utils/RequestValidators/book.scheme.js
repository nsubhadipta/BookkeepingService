const Joi = require("joi");

const bookSchema = {
 bookAdd: Joi.object().keys({
    title: Joi.string().max(50).required(),
    author: Joi.string().max(50).required(),
    summary: Joi.string().allow(null, "").optional(),
    library: Joi.string().max(50).required(),
    
  }),

  bookEdit: Joi.object().keys({
    title: Joi.string().max(50).required(),
    author: Joi.string().max(50).required(),
    summary: Joi.string().allow(null, "").optional(),
    library: Joi.string().max(50).required(),
  }),

};
module.exports = bookSchema;