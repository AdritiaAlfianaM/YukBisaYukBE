const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { subprojectService } = require('../services');
const pick = require('../utils/pick');

const createSubproject = catchAsync(async (req, res) => {
  const subproject = await subprojectService.createSubproject(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(subproject);
});

const getSubprojects = catchAsync(async (req, res) => {
  const filter = { user: req.user.id, ...pick(req.query, ['name', 'project']) };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subprojectService.querySubprojects(filter, options);
  res.send(result);
});

const deleteSubproject = catchAsync(async (req, res) => {
  await subprojectService.deleteProject(req.params.subprojectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSubproject,
  getSubprojects,
  deleteSubproject,
};
