const Joi = require('joi');

const createAgenda = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    project: Joi.string().required(),
    subproject: Joi.string().required(),
  }),
};

const updateAgenda = {
  params: Joi.object().keys({
    agendaId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
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
  updateAgenda,
};
