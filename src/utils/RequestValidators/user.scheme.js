const Joi = require("joi");

const userSchema = {
  register: Joi.object().keys({
    name: Joi.string().max(50).required(),
    email: Joi.string().max(150).required(),
    role: Joi.string().valid("Author", "Borrower").required(),
    password: Joi.string().max(50).required(),
    description: Joi.string().allow(null, "").optional(),
    // profilePic: Joi.string().allow(null, "").optional(),
  }),

  login: Joi.object().keys({
    email: Joi.string().max(150).required(),
    password: Joi.string().max(50).required(),
  }),

};
module.exports = userSchema;