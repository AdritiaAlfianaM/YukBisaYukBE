const { Subproject } = require('../models');

/**
 * Create a project
 * @param {Object} subprojectBody
 * @returns {Promise<Subproject>}
 */
const createSubproject = async (subprojectBody, user, project) => {
  return Subproject.create({ ...subprojectBody, user, project });
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
const queryProjects = async (filter, options) => {
  const subprojects = await Subproject.paginate(filter, options);
  return subprojects;
};

module.exports = {
  createSubproject,
  getSubprojectById,
  queryProjects,
};
