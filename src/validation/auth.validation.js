const Joi = require('joi');

const googleLogin = {
  body: Joi.object().keys({
    idToken: Joi.string().required(),
  }),
};

module.exports = {
  googleLogin,
};
