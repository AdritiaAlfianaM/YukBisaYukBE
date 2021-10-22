const Joi = require('joi');

const createSubproject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    project: Joi.string().required(),
  }),
};

const getSubprojects = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    project: Joi.string(),
  }),
};

const deleteSubproject = {
  params: Joi.object().keys({
    subprojectId: Joi.string(),
  }),
};

module.exports = {
  createSubproject,
  getSubprojects,
  deleteSubproject,
};
