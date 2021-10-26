const httpStatus = require('http-status');
const safe = require('safe-regex');
const catchAsync = require('../utils/catchAsync');
const { subprojectService } = require('../services');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const createSubproject = catchAsync(async (req, res) => {
  const subproject = await subprojectService.createSubproject(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(subproject);
});

const getSubprojects = catchAsync(async (req, res) => {
  const { name, project } = req.query;

  // Escaping RegExp https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping

  const escapedName = name ? escape(name) : '';
  if (escapedName && !safe(escapedName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Input!');
  }

  const nameRegex = name ? new RegExp(escapedName, 'i') : undefined;
  const filter = { user: req.user.id, ...(nameRegex && { name: nameRegex }), ...(project && { project }) };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subprojectService.querySubprojects(filter, options);
  res.send(result);
});

const deleteSubproject = catchAsync(async (req, res) => {
  await subprojectService.deleteSubproject(req.params.subprojectId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateSubproject = catchAsync(async (req, res) => {
  const subproject = await subprojectService.updateSubproject(req.params.subprojectId, req.body);
  res.send(subproject);
});

module.exports = {
  createSubproject,
  getSubprojects,
  deleteSubproject,
  updateSubproject,
};
