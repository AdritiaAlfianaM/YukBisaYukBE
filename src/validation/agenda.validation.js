const Joi = require('joi');

const createAgenda = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subprojectId: Joi.string().required(),
  }),
};

const getAgendas = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createAgenda,
  getAgendas,
};
