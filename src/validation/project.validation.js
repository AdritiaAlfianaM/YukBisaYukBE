const Joi = require('joi');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getProjects = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createProject,
  getProjects,
};
