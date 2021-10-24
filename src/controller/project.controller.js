const httpStatus = require('http-status');
const safe = require('safe-regex');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const pick = require('../utils/pick');
const escape = require('../utils/escapeRegExp');
const ApiError = require('../utils/ApiError');

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const { name } = req.query;

  // Escaping RegExp https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping

  const escapedName = name ? escape(name) : '';
  if (escapedName && !safe(escapedName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Input!');
  }

  const nameRegex = name ? new RegExp(escapedName, 'i') : undefined;
  const filter = { user: req.user.id, ...(nameRegex && { name: nameRegex }) };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await projectService.queryProjects(filter, options);
  res.send(result);
});

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProject(req.params.projectId, req.body);
  res.send(project);
});

module.exports = {
  createProject,
  getProjects,
  deleteProject,
  updateProject,
};
