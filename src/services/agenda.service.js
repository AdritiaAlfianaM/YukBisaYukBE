const httpStatus = require('http-status');
const { Agenda } = require('../models');
const subprojectService = require('./subproject.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a project
 * @param {Object} agendaBody
 * @returns {Promise<Agenda>}
 */
const createAgenda = async (agendaBody, user) => {
  await subprojectService.changeAgendaCount(agendaBody.subproject);
  return Agenda.create({ ...agendaBody, user });
};

/**
 * Get project by id
 * @param {string} id
 * @returns {Promise<Agenda>}
 */
const getAgendaById = async (id) => {
  return Agenda.findById(id);
};

/**
 * Query for projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAgenda = async (filter, options) => {
  const agenda = await Agenda.paginate(filter, options);
  return agenda;
};

const updateAgenda = async (id, updateBody) => {
  const agenda = await getAgendaById(id);
  if (!agenda) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agenda not found');
  }
  if (updateBody.status) {
    await subprojectService.updateAgendaStatus(agenda.subproject, agenda.status, updateBody.status);
  }
  Object.assign(agenda, updateBody);
  await agenda.save();
  return agenda;
};

const deleteAgenda = async (agendaId) => {
  const agenda = await Agenda.findById(agendaId);
  if (!agenda) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agenda not found');
  }
  await subprojectService.changeAgendaCount(agenda.subproject, -1);
  return agenda.remove();
};

module.exports = {
  createAgenda,
  getAgendaById,
  queryAgenda,
  updateAgenda,
  deleteAgenda,
};
