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
    subproject: Joi.string(), // ID Subproject
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const deleteAgenda = {
  params: Joi.object().keys({
    agendaId: Joi.string(),
  }),
};

module.exports = {
  createAgenda,
  getAgendas,
  updateAgenda,
  deleteAgenda,
};
