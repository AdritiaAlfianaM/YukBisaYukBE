const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Subproject } = require('../models');

/**
 * Create a project
 * @param {Object} subprojectBody
 * @returns {Promise<Subproject>}
 */
const createSubproject = async (subprojectBody, user) => {
  return Subproject.create({ ...subprojectBody, user });
};

/**
 * Get project by id
 * @param {string} id
 * @returns {Promise<Subproject>}
 */
const getSubprojectById = async (id) => {
  return Subproject.findById(id);
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
const querySubprojects = async (filter, options) => {
  const subprojects = await Subproject.paginate(filter, options);
  return subprojects;
};

const deleteSubproject = async (subprojectId) => {
  const subproject = await Subproject.findById(subprojectId);
  if (!subproject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subroject not found');
  }
  return subproject.remove();
};

const deleteSubprojects = async (project) => {
  return Subproject.deleteMany({ project });
};

const updateSubproject = async (id, updateBody) => {
  const subproject = await getSubprojectById(id);
  if (!subproject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subproject not found');
  }
  Object.assign(subproject, updateBody);
  await subproject.save();
  return subproject;
};

const changeAgendaCount = async (id, amount = 1) => {
  const subproject = await getSubprojectById(id);
  if (!subproject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subproject not found');
  }
  subproject.agendaCount += amount;
  return subproject.save();
};

const updateAgendaStatus = async (id, prevStatus, nextStatus) => {
  const subproject = await getSubprojectById(id);
  if (!subproject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subproject not found');
  }
  switch (prevStatus) {
    case 'In Progress':
      subproject.agendaProgress -= 1;
      break;
    case 'Done':
      subproject.agendaDone -= 1;
      break;
    case 'Stuck':
      subproject.agendaStuck -= 1;
      break;
    default:
      break;
  }
  switch (nextStatus) {
    case 'In Progress':
      subproject.agendaProgress += 1;
      break;
    case 'Done':
      subproject.agendaDone += 1;
      break;
    case 'Stuck':
      subproject.agendaStuck += 1;
      break;
    default:
      break;
  }
  return subproject.save();
};

module.exports = {
  createSubproject,
  getSubprojectById,
  querySubprojects,
  deleteSubproject,
  deleteSubprojects,
  updateSubproject,
  changeAgendaCount,
  updateAgendaStatus,
};
