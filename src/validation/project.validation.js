const Joi = require('joi');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  createProject,
};
