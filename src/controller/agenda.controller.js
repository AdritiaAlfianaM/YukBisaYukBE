const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { agendaService } = require('../services');
const pick = require('../utils/pick');

const createAgenda = catchAsync(async (req, res) => {
  const agenda = await agendaService.createAgenda(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(agenda);
});

const getAgendas = catchAsync(async (req, res) => {
  const filter = { user: req.user.id, ...pick(req.query, ['subproject']) };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await agendaService.queryAgenda(filter, options);
  res.send(result);
});

const updateAgenda = catchAsync(async (req, res) => {
  const agenda = await agendaService.updateAgenda(req.params.agendaId, req.body);
  res.send(agenda);
});

const deleteAgenda = catchAsync(async (req, res) => {
  await agendaService.deleteAgenda(req.params.agendaId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAgenda,
  getAgendas,
  updateAgenda,
  deleteAgenda,
};
