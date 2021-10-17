const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { agendaService } = require('../services');
const pick = require('../utils/pick');

const createAgenda = catchAsync(async (req, res) => {
  const agenda = await agendaService.createAgenda(req.body, req.user.id, req.subproject.id);
  res.status(httpStatus.CREATED).send(agenda);
});

const getAgendas = catchAsync(async (req, res) => {
  const filter = { user: req.user.id };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await agendaService.querySubprojects(filter, options);
  res.send(result);
});

module.exports = {
  createAgenda,
  getAgendas,
};
