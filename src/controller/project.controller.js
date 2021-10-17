const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const pick = require('../utils/pick');

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const { name } = req.query;
  const nameRegex = name ? new RegExp(name, 'i') : undefined;
  const filter = { user: req.user.id, ...(nameRegex && { name: nameRegex }) };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await projectService.queryProjects(filter, options);
  res.send(result);
});

module.exports = {
  createProject,
  getProjects,
};
