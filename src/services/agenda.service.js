const { Agenda } = require('../models');
const subprojectService = require('./subproject.service');

/**
 * Create a project
 * @param {Object} agendaBody
 * @returns {Promise<Agenda>}
 */
const createAgenda = async (agendaBody, user, subproject, feature) => {
  await subprojectService.incrementAgenda(subproject);
  return Agenda.create({ ...agendaBody, user, subproject, feature });
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

module.exports = {
  createAgenda,
  getAgendaById,
  queryAgenda,
};
