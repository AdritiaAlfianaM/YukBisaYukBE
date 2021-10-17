const Joi = require('joi');

const createSubproject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    projectId: Joi.string().required(),
  }),
};

const getSubprojects = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createSubproject,
  getSubprojects,
};
